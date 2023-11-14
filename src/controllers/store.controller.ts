import express, { type Response, type Request } from 'express'
import Queries from '../queries/queries.js'

const getAllStores = async (req: Request, res: Response) => {
    const stores = await Queries.getAllStores()
    res.status(200).send(stores)
}

const createStore = async (req: Request, res: Response) => {
    const { store_id, shop_name, access_token } = req.body
    await Queries.createStore(store_id, shop_name, access_token, true, 'out')
    res.status(200).send('store added successfully')
}

export { getAllStores, createStore }
