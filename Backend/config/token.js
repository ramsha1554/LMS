import jwt from "jsonwebtoken";
import "dotenv/config";

const genToken = async (userId) => {
  try {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log(error);
    throw new Error("Token generation failed");
  }
};

export default genToken;
