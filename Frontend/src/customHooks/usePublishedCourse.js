import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCourseData } from "../redux/courseSlice";
import axiosClient from "../lib/axiosClient";

const usePublishedCourse = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCourseData = async () => {
      try {
        const result = await axiosClient.get("/api/course/getpublished");
        dispatch(setCourseData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    getCourseData();
  }, [dispatch]);
};

export default usePublishedCourse;
