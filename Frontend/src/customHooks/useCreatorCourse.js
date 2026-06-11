import { useEffect } from "react";
import axiosClient from "../lib/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorCourseData } from "../redux/courseSlice";

const useCreatorCourse = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const creatorCourses = async () => {
      try {
        const result = await axiosClient.get("/api/course/getcreator");
        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        // keep silent here; UI handles toasts in caller if needed
        console.log(error);
      }
    };

    creatorCourses();
  }, [dispatch, userData]);
};

export default useCreatorCourse;
