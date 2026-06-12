import express from "express";
import { createOrder, verifyPayment, webhookPayment } from "../controllers/paymentController.js";
import isAuth from "../middleware/isAuth.js";

const paymentRouter = express.Router();

paymentRouter.post("/order", isAuth, createOrder);
paymentRouter.post("/verifypayment", isAuth, verifyPayment);
paymentRouter.post("/webhook", express.raw({ type: "application/json" }), webhookPayment);

export default paymentRouter;