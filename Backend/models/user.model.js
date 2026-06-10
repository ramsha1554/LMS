import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "educator"],
      default: "student",
    },
    photo: {
      type: String,
      default:
        "https://ui-avatars.com/api/?background=000000&color=fff&name=User",
    },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    resetotp: { type: String },
    otpExpiry: { type: Date },
    isOtpVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
