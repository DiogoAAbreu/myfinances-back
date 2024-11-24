import express from 'express';
import { getUserById } from '../controllers/users.controllers.js';
import { verifyToken } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.use(verifyToken);

router.get('/user', getUserById);

export default router;