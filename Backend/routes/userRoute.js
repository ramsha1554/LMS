import express from "express";
import isAuth from "../middleware/isAuth.js";
import getCurrentUser, { updateProfile } from "../controllers/userController.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.get("/getcurrentuser", isAuth, getCurrentUser);
userRouter.put("/updateprofile", isAuth, upload.single("photo"), updateProfile);

export default userRouter;
