import express from "express";
import { markLectureComplete, getCourseProgress } from "../controllers/courseProgressController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.post("/complete", isAuth, markLectureComplete);
router.get("/:courseId", isAuth, getCourseProgress);

export default router;
