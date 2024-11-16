import express from 'express';
import { verifyNewUser, verifyUser } from '../middlewares/auth.middlewares.js';
import { createUser, createSession } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/sign-in', verifyUser, createSession);
router.post('/sign-up', verifyNewUser, createUser);

export default router;