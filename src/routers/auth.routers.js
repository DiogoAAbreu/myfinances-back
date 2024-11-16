import express from 'express';
import { verifyNewUser } from '../middlewares/auth.middlewares.js';
import { createUser } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/sign-in',);
router.post('/sign-up', verifyNewUser, createUser);

export default router;