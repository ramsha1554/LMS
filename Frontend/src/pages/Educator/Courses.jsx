import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

import { SERVER_URL } from "../../lib/constants";
import { setCreatorCourseData } from "../../redux/courseSlice";

function Courses() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

const { userData } = useSelector((state) => state.user);

const { creatorCourseData } = useSelector((state) => state.course);
useEffect(() => {

  const creatorCourses = async () => {

    try {

      const result = await axios.get(
        SERVER_URL + "/api/course/getcreator",
        { withCredentials: true }
      );

      console.log(result.data);

      dispatch(setCreatorCourseData(result.data));

    } catch (error) {

      console.log(error);

    }

  };

  creatorCourses();

}, [userData]); 
  return (

    <div className="flex min-h-screen bg-gray-100">

      <div className="w-full min-h-screen p-4 sm:p-6 bg-gray-100">

        {/* Header */}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">

          <div className="flex items-center gap-3">

            <FaArrowLeftLong
              className="w-[22px] h-[22px] cursor-pointer"
              onClick={() => navigate("/dashboard")}
            />

            <h1 className="text-2xl font-semibold">

              All Created Courses

            </h1>

          </div>

          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            onClick={() => navigate("/createcourse")}
          >

            Create Course

          </button>

        </div>

        {/* Empty State */}

        <div className="bg-white rounded-xl shadow p-10 flex items-center justify-center">

          <p className="text-gray-500 text-lg">

            No courses created yet.

          </p>

        </div>

      </div>

    </div>

  );

}

export default Courses;