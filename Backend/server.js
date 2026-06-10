import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/connectDB.js";

import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import paymentRouter from "./routes/paymentRoute.js";

// Load environment variables
dotenv.config({ path: "./.env" });

const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    // Allow cookie-based auth for local dev across Vite ports.
    origin: process.env.CORS_ORIGIN || [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/review", reviewRouter);
app.use("/api/payment", paymentRouter);

// Health Check
app.get("/", (req, res) => {
  res.send("LMS Backend Running Successfully");
});

// Start Server
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
