
import express from "express";
import { createReview, getReviews } from "../controllers/reviewController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.post("/createreview", isAuth, createReview);
router.get("/getreviews/:courseId", getReviews); // public — no auth needed to read reviews

export default router;
