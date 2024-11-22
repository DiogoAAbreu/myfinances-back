import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { verifyTransaction } from "../middlewares/transactions.middlewares.js";
import { createNewTransaction, getTransactions } from "../controllers/transactions.controllers.js";

const router = express.Router();

router.use(verifyToken);

router.post('/transaction', verifyTransaction, createNewTransaction);
router.get('/transaction', getTransactions)

export default router;