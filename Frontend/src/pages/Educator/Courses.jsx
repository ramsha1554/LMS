import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import img from "../../assets/empty.jpg";
import { setCreatorCourseData } from "../../redux/courseSlice";
import axiosClient from "../../lib/axiosClient";
import { toast } from "react-toastify";

function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await axiosClient.get("/api/course/getcreator");
        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, [userData, dispatch]);

  const handleTogglePublish = async (courseId, currentStatus) => {
    try {
      const { data } = await axiosClient.patch(`/api/course/togglepublish/${courseId}`);
      toast.success(data.message);
      // Update local redux state immediately
      dispatch(setCreatorCourseData(
        creatorCourseData.map(c =>
          c._id === courseId ? { ...c, isPublished: data.isPublished } : c
        )
      ));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full min-h-screen p-4 sm:p-6 bg-gray-100">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div className="flex items-center justify-center gap-3">
            <FaArrowLeftLong
              className="w-[22px] h-[22px] cursor-pointer"
              onClick={() => navigate("/educator/dashboard")}
            />
            <h1 className="text-2xl font-semibold">All Created Courses</h1>
          </div>
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => navigate("/createcourse")}
          >
            Create Course
          </button>
        </div>

        {/* Large Screen Table */}
        <div className="hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Course</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Publish</th>
                <th className="text-left py-3 px-4">Edit</th>
              </tr>
            </thead>
            <tbody>
              {creatorCourseData?.map((course, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition duration-200">
                  <td className="py-3 px-4 flex items-center gap-4">
                    <img
                      src={course?.thumbnail || img}
                      className="w-20 h-14 object-cover rounded-md"
                      alt=""
                    />
                    <span>{course?.title}</span>
                  </td>
                  <td className="px-4 py-3">{course?.price ? `₹${course.price}` : "₹ NA"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs ${course?.isPublished ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                      {course?.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleTogglePublish(course._id, course.isPublished)}
                      className={`px-3 py-1 rounded text-xs font-medium ${course?.isPublished ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`}
                    >
                      {course?.isPublished ? "Unpublish" : "Publish"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <FaEdit
                      className="text-gray-600 hover:text-blue-600 cursor-pointer"
                      onClick={() => navigate(`/editcourse/${course?._id}`)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center text-sm text-gray-400 mt-6">A list of your recent courses.</p>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {creatorCourseData?.map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 flex flex-col gap-3">
              <div className="flex gap-4 items-center">
                <img src={course?.thumbnail || img} alt="" className="w-16 h-16 rounded-md object-cover" />
                <div className="flex-1">
                  <h2 className="font-medium text-sm">{course?.title}</h2>
                  <p className="text-gray-600 text-xs mt-1">{course?.price ? `₹${course.price}` : "₹ NA"}</p>
                </div>
                <FaEdit
                  className="text-gray-600 hover:text-blue-600 cursor-pointer"
                  onClick={() => navigate(`/editcourse/${course?._id}`)}
                />
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs rounded-full ${course?.isPublished ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                  {course?.isPublished ? "Published" : "Draft"}
                </span>
                <button
                  onClick={() => handleTogglePublish(course._id, course.isPublished)}
                  className={`px-3 py-1 rounded text-xs font-medium ${course?.isPublished ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"}`}
                >
                  {course?.isPublished ? "Unpublish" : "Publish"}
                </button>
              </div>
            </div>
          ))}
          <p className="text-center text-sm text-gray-400 mt-4">A list of your recent courses.</p>
        </div>

      </div>
    </div>
  );
}

export default Courses;
