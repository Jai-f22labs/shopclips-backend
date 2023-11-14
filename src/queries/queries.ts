import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createProduct = async ({
    product_id,
    product_handle,
    media_id,
    product_order,
}) =>
    await prisma.product.create({
        data: {
            product_id,
            product_handle,
            media_id,
            product_order,
        },
    })

const createMedia = async (media_id, story_id, media_order, media_url) =>
    await prisma.media.create({
        data: {
            media_id,
            story_id,
            media_order,
            media_url,
        },
    })

const createStory = async ({
    story_id,
    store_id,
    story_name,
    thumbnail,
    path,
}) =>
    await prisma.story.create({
        data: {
            story_id,
            store_id,
            story_name,
            thumbnail,
            path,
        },
    })

const getStore = async ({ store_id, access_token }) =>
    await prisma.store.findUnique({
        where: {
            access_token,
            store_id,
        },
    })

const getStories = async (store_id, path) =>
    await prisma.story.findMany({
        where: {
            store_id,
            path,
        },
    })

const getStoryById = async (story_id) =>
    await prisma.story.findUnique({ where: { story_id } })

const getMedias = async (story_id) =>
    await prisma.media.findMany({ where: { story_id } })

const deleteStory = async (story_id) =>
    await prisma.story.delete({
        where: {
            story_id,
        },
    })

const getMediaById = async (media_id) =>
    await prisma.media.findUnique({
        where: { media_id },
    })

// deleting all media/child-stories entries related to a story
const deleteMedias = async (story_id) =>
    await prisma.media.deleteMany({ where: { story_id } })

// deleting all products related to a media/child-story
const deleteProducts = async (media_id) =>
    await prisma.product.deleteMany({ where: { media_id } })

const updateStory = async (story_id, data) =>
    await prisma.story.update({
        where: { story_id },
        data: data,
    })

const updateMedia = async (media_id, data) =>
    await prisma.media.update({
        where: {
            media_id,
        },
        data: data,
    })

const getProductById = async (product_id) =>
    await prisma.product.findUnique({ where: { product_id } })

const updateProduct = async (product_id, data) =>
    await prisma.product.update({
        where: {
            product_id,
        },
        data: data,
    })

const getProducts = async (media_id) =>
    await prisma.product.findMany({
        where: { media_id },
    })

const createStore = async (
    store_id,
    shop_name,
    access_token,
    is_online,
    scope
) =>
    await prisma.store.create({
        data: {
            store_id,
            shop_name,
            access_token,
            is_online,
            scope,
        },
    })

const getAllStores = async () => await prisma.store.findMany()

// Delete all medias entries that don't match the specified story_id and media_ids
const deleteMediaExceptMatching = async (story_id, media_ids) =>
    await prisma.media.deleteMany({
        where: {
            AND: [
                { story_id: story_id },
                { NOT: { media_id: { in: media_ids } } },
            ],
        },
    })

// Delete all products entries that don't match the specified media_id and product_ids
const deleteProductExceptMatching = async (media_id, product_ids) =>
    await prisma.product.deleteMany({
        where: {
            AND: [
                { media_id: media_id },
                { NOT: { product_id: { in: product_ids } } },
            ],
        },
    })

export default {
    createProduct,
    createMedia,
    createStory,
    getStore,
    getStories,
    getStoryById,
    getMedias,
    deleteStory,
    getMediaById,
    deleteMedias,
    deleteProducts,
    updateStory,
    updateMedia,
    getProductById,
    updateProduct,
    getProducts,
    createStore,
    getAllStores,
    deleteMediaExceptMatching,
    deleteProductExceptMatching,
}
