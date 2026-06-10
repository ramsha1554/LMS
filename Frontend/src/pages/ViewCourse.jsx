import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import img from "../assets/empty.jpg";
import {
  ArrowLeft, Star, Lock, Infinity as InfinityIcon,
  Monitor, Award, Play, PlayCircle
} from "lucide-react";
import axiosClient from "../lib/axiosClient.js";
import { toast } from "react-toastify";

function ViewCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);

  const selectedCourse = courseData?.find((course) => course._id === courseId);

  // ✅ Derive isEnrolled from actual userData instead of useState(false)
  const isEnrolled = userData?.enrolledCourses?.some(
    (id) => id === courseId || id?._id === courseId
  ) ?? false;

  const [selectedLecture, setSelectedLecture] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true); // already loaded
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (isEnrolled) {
      navigate("/mycourses");
      return;
    }

    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
      toast.error("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    setLoading(true);
    try {
      // Step 1 — Create order on backend
      const { data } = await axiosClient.post("/payment/order", {
        courseId: selectedCourse?._id,
      });

      if (!data.success) {
        toast.error(data.message || "Failed to create order");
        return;
      }

      // Step 2 — Open Razorpay checkout popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "SkillSync",
        description: data.courseName,
        order_id: data.orderId,
        handler: async function (response) {
          // Step 3 — Verify payment on backend
          try {
            const verify = await axiosClient.post("/payment/verifypayment", {
              courseId: selectedCourse?._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verify.data.success) {
              toast.success("Enrollment successful! 🎉");
              // Refresh user data so isEnrolled updates automatically
              const userRes = await axiosClient.get("/user/me");
              dispatch({ type: "user/setUserData", payload: userRes.data.user });
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            toast.error("Verification error: " + err.message);
          }
        },
        prefill: {
          name: userData?.name || "",
          email: userData?.email || "",
        },
        theme: { color: "#000000" },
        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Payment failed: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
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

              <div className="flex items-center gap-2 text-amber-500">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs font-semibold text-neutral-800">4.8</span>
                </div>
                <span className="text-neutral-400 text-xs">(1,200 reviews)</span>
              </div>

              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-lg font-bold text-neutral-900">
                  ₹{selectedCourse?.price}
                </span>
                <span className="text-xs text-neutral-400 line-through">₹599</span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-100 space-y-3">
              <ul className="space-y-2.5">
                <li className="flex items-center gap-3 text-xs text-neutral-600">
                  <InfinityIcon className="text-neutral-900 w-4 h-4" />
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

            <div className="pt-2">
              <button
                className="w-full md:w-auto px-6 py-2.5 bg-black hover:bg-neutral-900 active:bg-neutral-800 text-white rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer shadow-sm disabled:opacity-50"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? "Processing..." : isEnrolled ? "Continue Learning" : "Enroll Now"}
              </button>
            </div>
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="flex flex-col md:flex-row gap-8 pt-6 border-t border-neutral-100">
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
                      ${lecture.isPreviewFree || isEnrolled
                        ? "hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300 text-neutral-800 cursor-pointer"
                        : "opacity-40 bg-neutral-50/50 border-neutral-100 cursor-not-allowed text-neutral-400"
                      }`}
                  >
                    <span>
                      {lecture.isPreviewFree || isEnrolled ? (
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
