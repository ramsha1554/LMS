import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import usePublishedCourse from "../customHooks/usePublishedCourse";
import axiosClient from "../lib/axiosClient";
import { CheckCircle, Circle, Lock } from "lucide-react";

function ViewLecture() {
  const navigate = useNavigate();
  const { lectureId } = useParams();

  usePublishedCourse();

  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);

  const [completedLectures, setCompletedLectures] = useState([]);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const [freshLectures, setFreshLectures] = useState([]);

  const currentCourse = courseData?.find((course) =>
    course.lectures?.some((l) => l._id === lectureId)
  );

  const isEnrolled = userData?.enrolledCourses?.some(
    (id) => id === currentCourse?._id || id?._id === currentCourse?._id
  ) ?? false;

  const lectures = freshLectures.length > 0 ? freshLectures : (currentCourse?.lectures || []);
  const selectedLecture = lectures.find((l) => l._id === lectureId);

  useEffect(() => {
    if (!currentCourse?._id) return;
    const fetchFreshLectures = async () => {
      try {
        const { data } = await axiosClient.get(`/api/course/courselecture/${currentCourse._id}`);
        setFreshLectures(data.lectures || []);
      } catch (err) {
        console.error("Failed to fetch fresh lectures:", err);
      }
    };
    fetchFreshLectures();
  }, [currentCourse?._id]);

  useEffect(() => {
    if (!currentCourse?._id || !isEnrolled) return;
    const fetchProgress = async () => {
      try {
        const res = await axiosClient.get(`/api/progress/${currentCourse._id}`);
        setCompletedLectures(res.data.completedLectures || []);
        setIsCourseCompleted(res.data.isCompleted || false);
      } catch (err) {
        console.error("Failed to fetch progress:", err);
      }
    };
    fetchProgress();
  }, [currentCourse?._id, isEnrolled]);

  const handleVideoEnded = async () => {
    if (!isEnrolled || !currentCourse?._id || !lectureId) return;
    if (completedLectures.includes(lectureId)) return;
    try {
      const res = await axiosClient.post("/api/progress/complete", {
        courseId: currentCourse._id,
        lectureId,
      });
      setCompletedLectures(res.data.progress.completedLectures || []);
      setIsCourseCompleted(res.data.progress.isCompleted || false);
    } catch (err) {
      console.error("Failed to mark lecture complete:", err);
    }
  };

  const handleCertificateDownload = async () => {
    try {
      const res = await axiosClient.get(`/api/certificate/${currentCourse._id}`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificate-${currentCourse.title?.replace(/\s+/g, "-") || "course"}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download certificate. Please try again.");
    }
  };

  const completedCount = completedLectures.length;
  const totalCount = lectures.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <FaArrowLeftLong
          className="w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-5">
            <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
              {selectedLecture?.videoUrl ? (
                <video
                  src={selectedLecture.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                  key={selectedLecture._id}
                  onEnded={handleVideoEnded}
                />
              ) : (
                <span className="text-white">Lecture Video</span>
              )}
            </div>
            <div className="mt-5">
              <h1 className="text-2xl font-bold">{selectedLecture?.lectureTitle}</h1>
              <p className="text-gray-500 mt-2">Continue your learning journey.</p>
            </div>

            {isEnrolled && totalCount > 0 && (
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Course progress</span>
                  <span className="font-semibold text-gray-800">
                    {completedCount}/{totalCount} lectures
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-black h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                {isCourseCompleted && (
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Course completed!
                    </p>
                    <button
                      onClick={handleCertificateDownload}
                      className="text-xs bg-black text-white px-3 py-1 rounded-md hover:bg-neutral-800 transition-colors"
                    >
                      Download Certificate
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-xl font-bold mb-1">{currentCourse?.title || "Course Lectures"}</h2>
            <p className="text-xs text-gray-400 mb-4">{lectures.length} Lectures</p>
            <div className="space-y-3">
              {lectures.map((lecture, index) => {
                const isAccessible = lecture.isPreviewFree || isEnrolled;
                const isActive = lecture._id === lectureId;
                const isDone = completedLectures.includes(lecture._id);
                return (
                  <div
                    key={index}
                    onClick={() => isAccessible && navigate(`/viewlecture/${lecture._id}`)}
                    className={`border rounded-lg p-3 transition-all duration-200 text-sm flex items-center gap-2
                      ${isActive ? "bg-black text-white border-black" : ""}
                      ${isAccessible && !isActive ? "hover:bg-gray-50 cursor-pointer" : ""}
                      ${!isAccessible ? "opacity-40 cursor-not-allowed" : ""}
                    `}
                  >
                    {!isAccessible ? (
                      <Lock className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-white" : "text-gray-400"}`} />
                    ) : isDone ? (
                      <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-white" : "text-green-500"}`} />
                    ) : (
                      <Circle className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-white" : "text-gray-300"}`} />
                    )}
                    <span className="font-medium">{index + 1}. {lecture.lectureTitle}</span>
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