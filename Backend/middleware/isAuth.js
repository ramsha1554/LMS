import jwt from "jsonwebtoken";
import "dotenv/config";

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

export default isAuth;
