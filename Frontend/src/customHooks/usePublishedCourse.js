import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../lib/constants";

import { useDispatch } from "react-redux";
import { setCourseData } from "../redux/courseSlice";

const usePublishedCourse = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCourseData = async () => {
      try {
        const result = await axios.get(
          SERVER_URL + "/api/course/getpublished",
          { withCredentials: true },
        );
        dispatch(setCourseData(result.data));
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCourseData();
  }, []);
};

export default usePublishedCourse;
