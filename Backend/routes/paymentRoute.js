import express from "express";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";
import isAuth from "../middleware/isAuth.js";

const paymentRouter = express.Router();

paymentRouter.post("/order", isAuth, createOrder);
paymentRouter.post("/verifypayment", isAuth, verifyPayment);

export default paymentRouter;