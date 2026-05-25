import Review from "../models/courseModel.js";

export const getReview = async (req, res) => {
  try {
    const reviews = await Review.find({});
    return res.status(200).json(reviews);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch reviews", error: error.message });
  }
};
