import CourseProgress from "../models/courseProgressModel.js";
import Course from "../models/courseModel.js";

// POST /api/progress/complete
export const markLectureComplete = async (req, res) => {
  try {
    const { courseId, lectureId } = req.body;
    const userId = req.userId;

    let progress = await CourseProgress.findOne({ userId, courseId });

    if (!progress) {
      progress = await CourseProgress.create({
        userId,
        courseId,
        completedLectures: [lectureId],
      });
    } else {
      if (!progress.completedLectures.includes(lectureId)) {
        progress.completedLectures.push(lectureId);
      }
    }

    const course = await Course.findById(courseId);
    if (course && progress.completedLectures.length === course.lectures.length) {
      progress.isCompleted = true;
    }

    await progress.save();
    res.status(200).json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/progress/:courseId
export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    const progress = await CourseProgress.findOne({ userId, courseId });
    res.status(200).json({
      success: true,
      completedLectures: progress?.completedLectures || [],
      isCompleted: progress?.isCompleted || false,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
