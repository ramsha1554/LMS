import User from "../models/user.model.js";
import Course from "../models/courseModel.js";
import RazorPayInstance from "../config/razorpay.js";

// POST /api/payment/order — creates a Razorpay order
export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.userId; // set by isAuth middleware

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if already enrolled
    const user = await User.findById(userId);
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const options = {
      amount: course.price * 100, // Razorpay expects paise
      currency: "INR",
      receipt: `receipt_${courseId}_${userId}`,
      notes: { courseId, userId },
    };

    const order = await RazorPayInstance.orders.create(options);

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      courseName: course.title,
      courseId,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to create order: ${error.message}`,
    });
  }
};

// POST /api/payment/verifypayment — verifies and enrolls
export const verifyPayment = async (req, res) => {
  try {
    const { courseId, razorpay_order_id } = req.body;
    const userId = req.userId; // use isAuth instead of trusting client-sent userId

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
        success: true,
        message: "Payment verified and enrollment successful",
      });
    } else {
      return res.status(400).json({ success: false, message: "Payment not completed" });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Payment verification failed: ${error.message}`,
    });
  }
};