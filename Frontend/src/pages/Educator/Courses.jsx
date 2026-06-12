import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, PlusCircle, Pencil, BookOpen } from "lucide-react";
import { toast } from "react-toastify";
import axiosClient from "../../lib/axiosClient";
import { setCreatorCourseData } from "../../redux/courseSlice";
import img from "../../assets/empty.jpg";

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

  const handleTogglePublish = async (courseId) => {
    try {
      const { data } = await axiosClient.patch(`/api/course/togglepublish/${courseId}`);
      toast.success(data.message);
      dispatch(
        setCreatorCourseData(
          creatorCourseData.map((c) =>
            c._id === courseId ? { ...c, isPublished: data.isPublished } : c
          )
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="w-full h-[64px] bg-white border-b border-neutral-200 flex items-center px-6 gap-4 sticky top-0 z-10">
        <button
          onClick={() => navigate("/educator/dashboard")}
          className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-neutral-600" />
        </button>
        <span className="text-sm font-semibold text-neutral-900">My Courses</span>
        <div className="ml-auto">
          <button
            onClick={() => navigate("/createcourse")}
            className="px-4 py-2 text-xs font-medium bg-black text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Create Course
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Empty state */}
        {(!creatorCourseData || creatorCourseData.length === 0) && (
          <div className="bg-white rounded-xl border border-neutral-200 p-12 flex flex-col items-center justify-center text-center gap-4">
            <BookOpen className="w-10 h-10 text-neutral-300" />
            <p className="text-sm font-medium text-neutral-700">No courses yet</p>
            <p className="text-xs text-neutral-400">Create your first course to get started.</p>
            <button
              onClick={() => navigate("/createcourse")}
              className="mt-2 px-5 py-2.5 text-xs font-medium bg-black text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Create Course
            </button>
          </div>
        )}

        {/* Desktop Table */}
        {creatorCourseData && creatorCourseData.length > 0 && (
          <>
            <div className="hidden md:block bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-100 bg-neutral-50">
                    <th className="text-left py-3 px-5 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Course</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Price</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Status</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Publish</th>
                    <th className="text-left py-3 px-5 text-xs font-semibold text-neutral-500 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {creatorCourseData.map((course, index) => (
                    <tr key={index} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={course?.thumbnail || img}
                            className="w-16 h-11 object-cover rounded-md border border-neutral-100 flex-shrink-0"
                            alt=""
                          />
                          <div>
                            <p className="text-sm font-medium text-neutral-900 leading-snug">{course?.title}</p>
                            <p className="text-xs text-neutral-400 mt-0.5">{course?.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-sm text-neutral-700 font-medium">
                        {course?.price ? `₹${course.price.toLocaleString()}` : "—"}
                      </td>
                      <td className="py-4 px-5">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          course?.isPublished
                            ? "bg-green-50 text-green-700"
                            : "bg-neutral-100 text-neutral-500"
                        }`}>
                          {course?.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <button
                          onClick={() => handleTogglePublish(course._id)}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                            course?.isPublished
                              ? "bg-red-50 text-red-600 hover:bg-red-100"
                              : "bg-green-50 text-green-700 hover:bg-green-100"
                          }`}
                        >
                          {course?.isPublished ? "Unpublish" : "Publish"}
                        </button>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/editcourse/${course?._id}`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors"
                          >
                            <Pencil className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => navigate(`/createlecture/${course?._id}`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-black text-white rounded-md hover:bg-neutral-800 transition-colors"
                          >
                            <BookOpen className="w-3 h-3" />
                            Lectures
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {creatorCourseData.map((course, index) => (
                <div key={index} className="bg-white rounded-xl border border-neutral-200 p-4 space-y-3">
                  <div className="flex gap-3 items-start">
                    <img
                      src={course?.thumbnail || img}
                      alt=""
                      className="w-16 h-12 rounded-md object-cover border border-neutral-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 leading-snug truncate">{course?.title}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">{course?.category}</p>
                      <p className="text-xs font-semibold text-neutral-700 mt-1">
                        {course?.price ? `₹${course.price.toLocaleString()}` : "—"}
                      </p>
                    </div>
                    <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${
                      course?.isPublished ? "bg-green-50 text-green-700" : "bg-neutral-100 text-neutral-500"
                    }`}>
                      {course?.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-neutral-100">
                    <button
                      onClick={() => handleTogglePublish(course._id)}
                      className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        course?.isPublished
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-green-50 text-green-700 hover:bg-green-100"
                      }`}
                    >
                      {course?.isPublished ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => navigate(`/editcourse/${course?._id}`)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors"
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/createlecture/${course?._id}`)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium bg-black text-white rounded-md hover:bg-neutral-800 transition-colors"
                    >
                      <BookOpen className="w-3 h-3" />
                      Lectures
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Courses;
