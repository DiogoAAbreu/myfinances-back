import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares";

const router = express.Router();

router.use(verifyToken);

router.post('/deposit',);
router.post('/withdraw',);

export default router;