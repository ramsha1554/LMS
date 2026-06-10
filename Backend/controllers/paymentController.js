import User from "../models/user.model.js";
import Course from "../models/courseModel.js";
import getRazorpay from "../config/razorpay.js";

export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.userId;
    console.log("PAYMENT HIT, courseId:", courseId, "userId:", userId);
    console.log("RAZORPAY KEY:", process.env.RAZORPAY_KEY_ID);
    console.log("RAZORPAY SECRET:", process.env.RAZORPAY_KEY_SECRET ? "EXISTS" : "MISSING");

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const user = await User.findById(userId);
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: `r_${courseId.slice(-8)}_${userId.slice(-8)}`,
      notes: { courseId, userId },
    };

    console.log("CALLING RAZORPAY with options:", options);
    const razorpay = getRazorpay();
    console.log("RAZORPAY INSTANCE:", razorpay ? "OK" : "NULL");

    const order = await razorpay.orders.create(options);
    console.log("ORDER CREATED:", order.id);

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      courseName: course.title,
      courseId,
    });
  } catch (error) {
    console.error("FULL ERROR OBJECT:", error);
    console.error("ERROR MESSAGE:", error.message);
    console.error("ERROR STATUS:", error.statusCode);
    console.error("ERROR DESCRIPTION:", error.error?.description);
    return res.status(500).json({
      message: `Failed to create order: ${error.message || JSON.stringify(error)}`,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { courseId, razorpay_order_id } = req.body;
    const userId = req.userId;
    const orderInfo = await getRazorpay().orders.fetch(razorpay_order_id);
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
      return res.status(200).json({ success: true, message: "Payment verified and enrollment successful" });
    } else {
      return res.status(400).json({ success: false, message: "Payment not completed" });
    }
  } catch (error) {
    console.error("VERIFY ERROR:", error);
    return res.status(500).json({ message: `Payment verification failed: ${error.message}` });
  }
};
