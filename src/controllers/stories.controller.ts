import express, { type Response, type Request } from 'express'
import { v4 as uuid } from 'uuid'
import Queries from '../queries/queries.js'
import { injectChildStoriesAndProducts } from '../helpers/helper.js'

// Fetch Stories API
const getAllStories = async (req: Request, res: Response) => {
    try {
        const { store_id, access_token, path } = req.query;
        if (!store_id || !access_token) {
            // If any required field is missing, throw an error
            throw new Error('Invalid request: Required fields are missing.')
        }
        let defaultPath = '/*'

        const store = await Queries.getStore({ store_id, access_token })

        if (!store) {
            return res.status(401).send('Invalid access token or store ID.')
        }

        const stories = await Queries.getStories(store_id, path || defaultPath)

        const response = await injectChildStoriesAndProducts(stories)

        res.status(200).send(response)
    } catch (e) {
        res.status(400).send(e.message || 'Bad request')
    }
};

// Add Story API
const createStory = async (req: Request, res: Response) => {
    try {
        const story_id = uuid()
        const { store_id, story_name, thumbnail, path, files, access_token } =
            req.body

        // Basic input validation
        if (
            !store_id ||
            !story_name ||
            !thumbnail ||
            !access_token ||
            !Array.isArray(files)
        ) {
            // If any required field is missing, throw an error
            throw new Error('Invalid request: Required fields are missing.')
        }

        // store validation
        const store = await Queries.getStore({ store_id, access_token })

        if (!store) {
            return res.status(401).send('Invalid access token or store ID.')
        }

        // Inserting story in the table
        await Queries.createStory({ story_id, store_id, story_name, thumbnail, path })

        if (files.length) {
            files.forEach(async ({ media_order, media_url, products }) => {
                const media_id = uuid()

                // Basic input validation for media
                if (
                    typeof media_order !== 'number' ||
                    !media_url ||
                    !Array.isArray(products)
                ) {
                    throw new Error(
                        'Invalid request: Media object is missing required fields.'
                    )
                }

                // Inserting child stories in the table
                await Queries.createMedia(media_id, story_id, media_order, media_url)

                if (products.length) {
                    products.forEach(
                        async ({ product_handle, product_order }) => {
                            const product_id = uuid()
                            // Basic input validation for products
                            if (
                                !product_handle ||
                                typeof product_order !== 'number'
                            ) {
                                throw new Error(
                                    'Invalid request: Product object is missing required fields.'
                                )
                            }

                            // Inserting products in the table
                            await Queries.createProduct({
                                product_id,
                                product_handle,
                                media_id,
                                product_order,
                            })
                        }
                    )
                }
            })
        } else {
            throw new Error('Atleast one media is required')
        }

        res.status(200).send('Story added successfully')
    } catch (error) {
        console.error(error)
        res.status(400).send(error.message || 'Bad Request')
    }
}

// Delete a Story API
const deleteStory = async (req: Request, res: Response) => {
    try {
        const { story_id } = req.body;

        if (!story_id) {
            throw new Error('Invalid story Id')
        }

        // get all medias linked to storyId
        const medias = await Queries.getMedias(story_id)

        if (medias.length) {
            const mediaIds = medias.map(({ media_id }) => media_id)
            // delete products linked to mediaId
            await Promise.all(
                mediaIds.map(async (mediaId) => await Queries.deleteProducts(mediaId))
            )
        }

        await Queries.deleteMedias(story_id)
        await Queries.deleteStory(story_id)

        res.status(200).send(
            'Story and associated media/products deleted successfully'
        )
    } catch (e) {
        console.error(e)
        res.status(400).send(e.message || 'Bad request')
    }
};

// Edit a story
const editStory = async (req: Request, res: Response) => {
    try {
        const {story_id, store_id, story_name, thumbnail, path, files, access_token } =
            req.body

        // Basic input validation
        if (
            !store_id ||
            !story_name ||
            !thumbnail ||
            !access_token ||
            !Array.isArray(files)
        ) {
            throw new Error('Invalid request: Required fields are missing.')
        }

        // Store validation
        const store = await Queries.getStore({ store_id, access_token })

        if (!store) {
            return res.status(401).send('Invalid access token or store ID.')
        }

        // Check if the story with the given ID exists
        const existingStory = await Queries.getStoryById(story_id)

        if (!existingStory) {
            return res.status(404).send('Story not found.')
        }

        // Update the story in the table
        await Queries.updateStory(story_id, { store_id, story_name, thumbnail, path })
        const uniqueMediaIds = []
        if (files.length) {
            for (const {
                media_id,
                media_order,
                media_url,
                products,
            } of files) {
                // Basic input validation for media
                if (
                    !media_id ||
                    typeof media_order !== 'number' ||
                    !media_url
                ) {
                    throw new Error(
                        'Invalid request: Media object is missing required fields.'
                    )
                }

                const media = await Queries.getMediaById(media_id)

                // Update or create child stories in the table
                if (!!media) {
                    await Queries.updateMedia(media_id, { media_order, media_url })
                } else {
                    await Queries.createMedia(
                        media_id,
                        story_id,
                        media_order,
                        media_url
                    )
                }

                uniqueMediaIds.push(media_id)
                const uniqueProductIds = []
                if (products.length) {
                    for (const {
                        product_id,
                        product_handle,
                        product_order,
                    } of products) {
                        // Basic input validation for products
                        if (
                            !product_handle ||
                            typeof product_order !== 'number'
                        ) {
                            throw new Error(
                                'Invalid request: Product object is missing required fields.'
                            )
                        }
                        uniqueProductIds.push(product_id)
                        // Update or create products in the table
                        const product = await Queries.getProductById(product_id)

                        if (!!product) {
                            await Queries.updateProduct(product_id, {
                                product_handle,
                                product_order,
                                media_id,
                            })
                        } else {
                            await Queries.createProduct({
                                product_id,
                                product_handle,
                                media_id,
                                product_order,
                            })
                        }
                    }
                }
                if (uniqueProductIds.length) {
                    Queries.deleteProductExceptMatching(media_id, uniqueProductIds)
                }
            }
        }
        await Queries.deleteMediaExceptMatching(store_id, uniqueMediaIds)

        res.status(200).send('Story updated successfully')
    } catch (error) {
        console.error(error)
        res.status(400).send(error.message || 'Bad Request')
    }
}

export {getAllStories, createStory, editStory, deleteStory}
