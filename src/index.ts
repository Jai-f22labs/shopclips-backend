import express, { type Response, type Request } from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import {v4 as uuid} from 'uuid'

const app = express()

const prisma = new PrismaClient()

app.use(cors('*'))
app.use(express.json())

app.get('/stories', (req: Request, res: Response) => {
    res.send('Hello')
})

const createProduct = async (product_handle, media_id) =>
    await prisma.product.create({
        data: {
            product_handle,
            media_id,
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

const createStory = async (story_id, store_id, story_name, thumbnail, path) =>
    await prisma.story.create({
        data: {
            story_id,
            store_id,
            story_name,
            thumbnail,
            path,
        },
    })

app.post('/story/add', async (req: Request, res: Response) => {
    try {
        const story_id = uuid()
        const { store_id, story_name, thumbnail, path, files } = req.body

        // Inserting story in table
        createStory(story_id, store_id, story_name, thumbnail, path)

        // files.length &&
        //     files.forEach(({ media_order, media_url, products }) => {
        //         const media_id = uuid()
        //         // Inserting child stories in table
        //         createMedia(media_id, story_id, media_order, media_url)
        //         // products.length &&
        //         //     products.forEach(({ product_handle }) => {
        //         //         // Inserting products in table
        //         //         createProduct(product_handle, media_id)
        //         //     })
        //     })
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
    }
})

const PORT = 3000

app.listen(PORT, () => console.log('server is running at :', PORT))



// requestBody: {
//     store_id : string
//     story_name: string
//     thumbnail: string
//     path: string
//     files : [
//                { order: number,
//                   media_url: string,
//                   products: [ 'product-handle-name' , ....]
//                }
//                .....
//                ]
//      }