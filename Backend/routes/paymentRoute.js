import express from "express";
import { verifyPayment } from "../controllers/paymentController.js";
import isAuth from "../middleware/isAuth.js";

const paymentRouter = express.Router();

// Frontend currently calls:
// POST /api/payment/order
paymentRouter.post("/order", isAuth, verifyPayment);

export default paymentRouter;
