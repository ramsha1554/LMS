import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import usePublishedCourse from "../customHooks/usePublishedCourse";

function ViewLecture() {
  const navigate = useNavigate();
  const { lectureId } = useParams();

  usePublishedCourse();

  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);

  // Find the course that contains this lecture
  const currentCourse = courseData?.find((course) =>
    course.lectures?.some((l) => l._id === lectureId)
  );

  // Only show lectures the student is enrolled to see
  const isEnrolled = userData?.enrolledCourses?.some(
    (id) => id === currentCourse?._id || id?._id === currentCourse?._id
  ) ?? false;

  const lectures = currentCourse?.lectures || [];

  const selectedLecture = lectures.find((l) => l._id === lectureId);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <FaArrowLeftLong
          className="w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-5">
            <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
              {selectedLecture?.videoUrl ? (
                <video
                  src={selectedLecture.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                  key={selectedLecture._id}
                />
              ) : (
                <span className="text-white">Lecture Video</span>
              )}
            </div>
            <div className="mt-5">
              <h1 className="text-2xl font-bold">{selectedLecture?.lectureTitle}</h1>
              <p className="text-gray-500 mt-2">Continue your learning journey.</p>
            </div>
          </div>

          {/* Lecture Sidebar */}
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-xl font-bold mb-1">{currentCourse?.title || "Course Lectures"}</h2>
            <p className="text-xs text-gray-400 mb-4">{lectures.length} Lectures</p>
            <div className="space-y-3">
              {lectures.map((lecture, index) => {
                const isAccessible = lecture.isPreviewFree || isEnrolled;
                const isActive = lecture._id === lectureId;
                return (
                  <div
                    key={index}
                    onClick={() => isAccessible && navigate(`/viewlecture/${lecture._id}`)}
                    className={`border rounded-lg p-3 transition-all duration-200 text-sm
                      ${isActive ? "bg-black text-white" : ""}
                      ${isAccessible && !isActive ? "hover:bg-gray-50 cursor-pointer" : ""}
                      ${!isAccessible ? "opacity-40 cursor-not-allowed" : ""}
                    `}
                  >
                    <span className="font-medium">{index + 1}. {lecture.lectureTitle}</span>
                    {!isAccessible && <span className="ml-2 text-xs">(Locked)</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewLecture;
