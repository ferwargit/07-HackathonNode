import express from 'express';
import userRoute from './user.routes.js';
import productRoute from './product.routes.js';

const router = express.Router();
router.use(userRoute);
router.use(productRoute);

export default router;
