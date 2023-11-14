import express from 'express';
import { getAllStores, createStore } from '../controllers/store.controller.js';

const router = express.Router();

router.route("/").get(getAllStores).post(createStore);

export default router;