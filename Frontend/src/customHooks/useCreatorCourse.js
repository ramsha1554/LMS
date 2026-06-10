import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorCourseData } from "../redux/courseSlice";

const useCreatorCourse = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  return useEffect(() => {
    const creatorCourses = async () => {
      try {
        const result = await axios.get(SERVER_URL + "/api/course/getcreator", {
          withCredentials: true,
        });
        console.log(result.data);
        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    creatorCourses();
  }, [dispatch, userData]);
};

export default useCreatorCourse;
