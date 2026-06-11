import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setReviewData } from "../redux/reviewSlice";
import axiosClient from "../lib/axiosClient";

const useAllReviews = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const allReviews = async () => {
      try {
        const result = await axiosClient.get("/api/review/getreviews");
        dispatch(setReviewData(result.data));
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    allReviews();
  }, [dispatch]);
};

export default useAllReviews;


