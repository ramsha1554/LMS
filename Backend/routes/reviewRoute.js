import express from "express";
import { createReview, getReviews, getAllReviews } from "../controllers/reviewController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.post("/createreview", isAuth, createReview);
router.get("/getreviews", getAllReviews);
router.get("/getreviews/:courseId", getReviews);

export default router;
