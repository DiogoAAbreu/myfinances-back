import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { verifyDeposit } from "../middlewares/transactions.middlewares.js";
import { createNewDeposit } from "../controllers/transactions.controllers.js";

const router = express.Router();

router.use(verifyToken);

router.post('/deposit', verifyDeposit, createNewDeposit);
router.post('/withdraw',);

export default router;