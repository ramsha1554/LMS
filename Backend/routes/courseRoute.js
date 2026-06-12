
import express from "express";
import {
  createCourse,
  createLecture,
  editCourse,
  editLecture,
  getCourseById,
  getCourseLecture,
  getCreatorById,
  getCreatorCourses,
  getPublishedCourses,
  removeCourse,
  removeLecture,
  togglePublish,
} from "../controllers/courseController.js";

import isAuth, { isEducator } from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";

const courseRouter = express.Router();
//Public Routes//


courseRouter.get("/getpublished", getPublishedCourses);

// Authenticated Routes//
courseRouter.get("/getcourse/:courseId", isAuth, getCourseById);
courseRouter.get("/courselecture/:courseId", isAuth, getCourseLecture);
courseRouter.post("/creator", isAuth, getCreatorById);
// Educator Routes//
courseRouter.get(
  "/getcreator",
  isAuth,
  isEducator,
  getCreatorCourses
);

courseRouter.post(
  "/create",
  isAuth,
  isEducator,
  upload.single("image"),
  createCourse
);

courseRouter.post(
  "/editcourse/:courseId",
  isAuth,
  isEducator,
  upload.single("image"),
  editCourse
);

courseRouter.delete(
  "/remove/:courseId",
  isAuth,
  isEducator,
  removeCourse
);

courseRouter.patch(
  "/togglepublish/:courseId",
  isAuth,
  isEducator,
  togglePublish
);

courseRouter.post(
  "/createlecture/:courseId",
  isAuth,
  isEducator,
  upload.single("video"),
  createLecture
);

courseRouter.post(
  "/editlecture/:lectureId",
  isAuth,
  isEducator,
  upload.single("video"),
  editLecture
);

courseRouter.delete(
  "/removelecture/:lectureId",
  isAuth,
  isEducator,
  removeLecture
);

export default courseRouter;

