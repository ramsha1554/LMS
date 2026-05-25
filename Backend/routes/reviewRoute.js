import express from "express";
import { getReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.get("/getreview", getReview);

export default reviewRouter;
