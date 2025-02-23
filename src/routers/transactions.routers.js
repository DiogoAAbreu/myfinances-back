import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import {
    verifyTransaction,
    verifyTransactionOwer
} from "../middlewares/transactions.middlewares.js";
import {
    createNewTransaction,
    deleteTransaction,
    getTransactions,
    getTransactionsBalance,
    updateTransaction
} from "../controllers/transactions.controllers.js";

const router = express.Router();

router.use(verifyToken);

router.post('/transaction', verifyTransaction, createNewTransaction);
router.get('/transaction', getTransactions);
router.get('/transaction/balance', getTransactionsBalance);
router.delete('/transaction/:id', verifyTransactionOwer, deleteTransaction);
router.put('/transaction/:id', verifyTransactionOwer, verifyTransaction, updateTransaction);

export default router;