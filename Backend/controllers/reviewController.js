import Review from "../models/reviewModel.js";
import Course from "../models/courseModel.js";

// POST /api/review/createreview
export const createReview = async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body;
    const userId = req.userId; // set by isAuth middleware

    // Check course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Check user is enrolled
    if (!course.enrolledStudents.includes(userId)) {
      return res.status(403).json({ success: false, message: "You must be enrolled to review this course" });
    }

    // Check for duplicate review
    const existing = await Review.findOne({ userId, courseId });
    if (existing) {
      return res.status(400).json({ success: false, message: "You have already reviewed this course" });
    }

    const review = await Review.create({ userId, courseId, rating, comment });

    res.status(201).json({ success: true, message: "Review submitted", review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/review/getreviews/:courseId
export const getReviews = async (req, res) => {
  try {
    const { courseId } = req.params;

    const reviews = await Review.find({ courseId })
      .populate("userId", "name photoUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// GET /api/review/getreviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "name photoUrl")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
