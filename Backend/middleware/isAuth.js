
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user.model.js";

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = verifyToken.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

export const isEducator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("role");

    if (!user || user.role !== "educator") {
      return res.status(403).json({
        message: "Access denied: educators only",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Role check failed",
      error: error.message,
    });
  }
};

export default isAuth;