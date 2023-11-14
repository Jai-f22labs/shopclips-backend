import Queries from '../queries/queries.js'

const restructureStory = async (story) => {
    try {
        const { story_id } = story

        const medias = await Queries.getMedias(story_id)

        const mediasWithProducts = await Promise.all(
            medias.map(async (media) => {
                const { media_id } = media
                const products = await Queries.getProducts(media_id)
                return {
                    ...media,
                    products,
                }
            })
        )
        return {
            ...story,
            files: mediasWithProducts,
        }
    } catch (error) {
        console.error('Error in restructureStory fn:', error)
        throw error 
    }
}

export const injectChildStoriesAndProducts = async (stories) => {
    try {
        return await Promise.all(stories.map(async story => await restructureStory(story)))
    } catch (error) {
        console.error('Error in injectChildStoriesAndProducts fn:', error)
        throw error 
    }
}
