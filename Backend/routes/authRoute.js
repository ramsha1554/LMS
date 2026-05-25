import express from "express";
import { SignUp, Login, Logout } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", SignUp);
authRouter.post("/login", Login);
authRouter.get("/logout", Logout);

export default authRouter;
