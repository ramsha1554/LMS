import "./config/env.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./config/connectDB.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import certificateRouter from "./routes/certificateRoute.js";
import courseProgressRouter from "./routes/courseProgressRoute.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many requests, please try again later." },
});
app.use("/api/auth", limiter);

app.use(cors({
  origin: process.env.CORS_ORIGIN || [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/review", reviewRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/certificate", certificateRouter);
app.use("/api/progress", courseProgressRouter);

app.get("/", (req, res) => {
  res.send("LMS Backend Running Successfully");
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log("Server startup failed:", error);
    process.exit(1);
  }
};
startServer();


