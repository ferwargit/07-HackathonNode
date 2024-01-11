import express from 'express';
import entryController from '../controllers/entry/index.controller.js';
import { authUser } from '../middlewares/security/index.middleware.js';
import { userExists } from '../middlewares/user/index.middleware.js';

const router = express.Router();

router.post('/entries', authUser, userExists, entryController.insert);


export default router;
