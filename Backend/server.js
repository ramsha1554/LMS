import express from "express";
import connectDB from "./config/connectDB.js";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = 3000 || process.env.PORT;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);

// NOTE: userRoute/controller are still CommonJS at the moment.
// This will be updated automatically if runtime errors occur.
import userRouter from "./routes/userRoute.js";
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
