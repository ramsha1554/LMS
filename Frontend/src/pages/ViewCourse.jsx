import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import img from "../assets/empty.jpg";
import {
  ArrowLeft,
  Star,
  Lock,
  Infinity,
  Monitor,
  Award,
  Play,
  PlayCircle
} from "lucide-react";

function ViewCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);

  const selectedCourse = courseData?.find((course) => course._id === courseId);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: selectedCourse?._id,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto bg-white border border-neutral-200 rounded-xl shadow-sm p-8 space-y-8">
        {/* Back Button */}
        <div>
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 hover:text-black flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-black"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Thumbnail */}
          <div className="w-full md:w-1/2">
            <img
              src={selectedCourse?.thumbnail || img}
              alt={selectedCourse?.title || "Course thumbnail"}
              className="rounded-xl w-full border border-neutral-200 object-cover aspect-video"
            />
          </div>

          {/* Course Info */}
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Category */}
              <div className="flex">
                <span className="bg-neutral-100 text-neutral-800 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-neutral-200">
                  {selectedCourse?.category || "Development"}
                </span>
              </div>

              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 leading-snug">
                {selectedCourse?.title}
              </h1>

              <p className="text-xs text-neutral-500 leading-relaxed">
                {selectedCourse?.subTitle || "Master this course with step-by-step logic and professional guidance."}
              </p>

              {/* Ratings */}
              <div className="flex items-center gap-2 text-amber-500">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs font-semibold text-neutral-800">4.8</span>
                </div>
                <span className="text-neutral-400 text-xs">(1,200 reviews)</span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-lg font-bold text-neutral-900">
                  ₹{selectedCourse?.price}
                </span>
                <span className="text-xs text-neutral-400 line-through">
                  ₹599
                </span>
              </div>
            </div>

            {/* Course Benefits */}
            <div className="pt-2 border-t border-neutral-100 space-y-3">
              <ul className="space-y-2.5">
                <li className="flex items-center gap-3 text-xs text-neutral-600">
                  <Infinity className="text-neutral-900 w-4 h-4" />
                  <span>Full lifetime access</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-neutral-600">
                  <Monitor className="text-neutral-900 w-4 h-4" />
                  <span>Access on mobile and desktop</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-neutral-600">
                  <Award className="text-neutral-900 w-4 h-4" />
                  <span>Certificate of completion</span>
                </li>
              </ul>
            </div>

            {/* Enroll Button */}
            <div className="pt-2">
              <button
                className="w-full md:w-auto px-6 py-2.5 bg-black hover:bg-neutral-900 active:bg-neutral-800 text-white rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer shadow-sm"
                onClick={handlePayment}
              >
                {isEnrolled ? "Continue Learning" : "Enroll Now"}
              </button>
            </div>
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="flex flex-col md:flex-row gap-8 pt-6 border-t border-neutral-100">
          {/* Lecture List */}
          <div className="bg-white w-full md:w-2/5 p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-1">
                Course Curriculum
              </h2>
              <p className="text-xs text-neutral-400 mb-4">
                {selectedCourse?.lectures?.length || 0} Lectures
              </p>

              <div className="flex flex-col gap-2">
                {selectedCourse?.lectures?.map((lecture, index) => (
                  <button
                    key={index}
                    disabled={!lecture.isPreviewFree && !isEnrolled}
                    onClick={() => {
                      if (lecture.isPreviewFree || isEnrolled) {
                        setSelectedLecture(lecture);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md border text-left text-xs font-medium transition-colors duration-200
                      ${
                        lecture.isPreviewFree || isEnrolled
                          ? "hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300 text-neutral-800 cursor-pointer"
                          : "opacity-40 bg-neutral-50/50 border-neutral-100 cursor-not-allowed text-neutral-400"
                      }`}
                  >
                    <span>
                      {lecture.isPreviewFree ? (
                        <PlayCircle className="w-4 h-4 text-neutral-600" />
                      ) : (
                        <Lock className="w-4 h-4 text-neutral-400" />
                      )}
                    </span>
                    <span className="truncate">{lecture.lectureTitle}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Video Preview */}
          <div className="bg-white w-full md:w-3/5 p-6 rounded-xl border border-neutral-200 shadow-sm">
            <div className="aspect-video w-full rounded-md overflow-hidden bg-neutral-950 flex flex-col items-center justify-center border border-neutral-800 shadow-inner">
              {selectedLecture?.videoUrl ? (
                <video
                  className="w-full h-full object-contain"
                  src={selectedLecture?.videoUrl}
                  controls
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3 text-neutral-500">
                  <Play className="w-10 h-10 text-neutral-600 animate-pulse" />
                  <span className="text-xs text-neutral-400">
                    Select a free preview lecture
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;