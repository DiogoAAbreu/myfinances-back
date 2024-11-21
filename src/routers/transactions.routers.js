import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { verifyTransaction } from "../middlewares/transactions.middlewares.js";
import { createNewTransaction } from "../controllers/transactions.controllers.js";

const router = express.Router();

router.use(verifyToken);

router.post('/deposit', verifyTransaction, createNewTransaction);

export default router;