import express from 'express';
import {getAllStories, createStory, editStory, deleteStory} from '../controllers/stories.controller.js';

const router = express.Router();

router.route("/").get(getAllStories).post(createStory).put(editStory).delete(deleteStory);

export default router;