import express from "express";
import {
  SignUp,
  Login,
  Logout,
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", SignUp);
authRouter.post("/login", Login);
authRouter.get("/logout", Logout);
authRouter.post("/sendotp", sendOtp);
authRouter.post("/verifyotp", verifyOtp);
authRouter.post("/resetpassword", resetPassword);

export default authRouter;