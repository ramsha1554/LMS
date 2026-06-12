import User from "../models/user.model.js";
import Payment from "../models/paymentModel.js";
import Course from "../models/courseModel.js";
import getRazorpay from "../config/razorpay.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.userId;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    const user = await User.findById(userId);
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled" });
    }
    if (!course.price || course.price <= 0) return res.status(400).json({ message: "Course price is not set" });
    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: `r_${courseId.slice(-8)}_${userId.slice(-8)}`,
      notes: { courseId, userId },
    };
    const order = await getRazorpay().orders.create(options);
    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      courseName: course.title,
      courseId,
    });
  } catch (error) {
    return res.status(500).json({ message: `Failed to create order: ${error.message}` });
  }
};

export const webhookPayment = async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const body = req.body;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    const event = JSON.parse(body.toString());

    if (event.event === "payment.captured") {
      const { courseId, userId } = event.payload.payment.entity.notes;

      const user = await User.findById(userId);
      if (user && !user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }

      const course = await Course.findById(courseId);
      if (course && !course.enrolledStudents.includes(userId)) {
        course.enrolledStudents.push(userId);
        await course.save();
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    res.status(500).json({ message: "Webhook error" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { courseId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.userId;

    // HMAC signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

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
    await Payment.create({
      userId,
      courseId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      amount: (await Course.findById(courseId))?.price || 0,
      currency: "INR",
      status: "captured",
    });

    return res.status(200).json({ success: true, message: "Payment verified and enrollment successful" });
  } catch (error) {
    return res.status(500).json({ message: `Payment verification failed: ${error.message}` });
  }
};

