import express, { type Response, type Request } from 'express'
import { PrismaClient } from '@prisma/client'
import cors from "cors"
import handleFileUpload from './uploadFiles.js'
const app = express()
const prisma = new PrismaClient()
app.use(cors("*"))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello')
})

app.post('/story/add', (req: Request, res: Response) => {
    // const data = {
    //     store_id: req.body.store_id,
    //     order: req.body.order,
    //     story_name: req.body.story_name,
    //     thumbnail: 'need to get the url',
    //     path: req.body.path,
    //     status: req.body.status,
    //     files: req.body.files,
    // }
    console.log(req.body)

    
    // handleFileUpload(file)
    

    res.sendStatus(200)
})

const PORT = 3000

app.listen(PORT, () => console.log('server is running at :', PORT))
