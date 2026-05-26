import User from "../models/user.model.js";
import Course from "../models/courseModel.js";

import RazorPayInstance from "../config/razorpay.js";

export const verifyPayment = async (req, res) => {
  try {
    const {
      courseId,

      userId,

      razorpay_order_id,
    } = req.body;

    const orderInfo = await RazorPayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const user = await User.findById(userId);

      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);

        await user.save();
      }

      const course = await Course.findById(courseId);

      if (!course.enrolledStudents.includes(userId)) {
        course.enrolledStudents.push(userId);

        await course.save();
      }

      return res.status(200).json({
        message: "Payment verified and enrollment successful",
      });
    } else {
      return res.status(400).json({
        message: "Payment failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Internal server error during payment verification ${error}`,
    });
  }
};
