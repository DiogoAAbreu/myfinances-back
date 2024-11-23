import express from 'express';
import { verifyNewUser, verifyToken, verifyUser } from '../middlewares/auth.middlewares.js';
import { createUser, createSession, disableSession } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/sign-in', verifyUser, createSession);
router.post('/sign-up', verifyNewUser, createUser);
router.post('/sign-out', verifyToken, disableSession);

export default router;