import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import img from "../assets/empty.jpg";
import { ArrowLeft, Star, Lock, Infinity as InfinityIcon, Monitor, Award, Play, PlayCircle } from "lucide-react";
import axiosClient from "../lib/axiosClient.js";
import usePublishedCourse from "../customHooks/usePublishedCourse";
import { toast } from "react-toastify";

function ViewCourse() {
  usePublishedCourse();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const course = courseData?.find((c) => c._id === courseId) || null;
  const isEnrolled = userData?.enrolledCourses?.some(
    (id) => id === courseId || id?._id === courseId
  ) ?? false;

  const [selectedLecture, setSelectedLecture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    if (!courseId) return;
    const fetchReviews = async () => {
      try {
        const { data } = await axiosClient.get(`/api/review/getreviews/${courseId}`);
        if (data.success) setReviews(data.reviews);
      } catch (e) {
        console.log(e);
      }
    };
    fetchReviews();
  }, [courseId]);

  const handleSubmitReview = async () => {
    if (!comment.trim()) { toast.error("Please write a comment"); return; }
    setReviewLoading(true);
    try {
      const { data } = await axiosClient.post("/api/review/createreview", { courseId, rating, comment });
      if (data.success) {
        toast.success("Review submitted!");
        setComment("");
        setRating(5);
        const res = await axiosClient.get(`/api/review/getreviews/${courseId}`);
        if (res.data.success) setReviews(res.data.reviews);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setReviewLoading(false);
    }
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (isEnrolled) { navigate("/mycourses"); return; }
    if (!course?._id) { toast.error("Course not loaded yet."); return; }
    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) { toast.error("Razorpay SDK failed to load."); return; }
    setLoading(true);
    try {
      const { data } = await axiosClient.post("/api/payment/order", { courseId: course._id });
      if (!data.success) { toast.error(data.message || "Failed to create order"); setLoading(false); return; }
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "SkillSync",
        description: data.courseName,
        order_id: data.orderId,
        handler: async function (response) {
          try {
            const verify = await axiosClient.post("/api/payment/verifypayment", {
              courseId: course._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (verify.data.success) {
              toast.success("Enrollment successful!");
              const userRes = await axiosClient.get("/api/user/getcurrentuser");
              dispatch({ type: "user/setUserData", payload: userRes.data.user });
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            toast.error("Verification error: " + err.message);
          }
        },
        prefill: { name: userData?.name || "", email: userData?.email || "" },
        theme: { color: "#000000" },
        modal: { ondismiss: () => toast.info("Payment cancelled") },
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
        <div>
          <button onClick={() => navigate("/")} className="w-9 h-9 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 hover:text-black flex items-center justify-center transition-colors duration-200">
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <img src={course?.thumbnail || img} alt={course?.title || "Course thumbnail"} className="rounded-xl w-full border border-neutral-200 object-cover aspect-video" />
          </div>
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex">
                <span className="bg-neutral-100 text-neutral-800 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-neutral-200">
                  {course?.category || "Development"}
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 leading-snug">{course?.title}</h1>
              <p className="text-xs text-neutral-500 leading-relaxed">{course?.subTitle || "Master this course with step-by-step logic and professional guidance."}</p>
              <div className="flex items-center gap-2 text-amber-500">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs font-semibold text-neutral-800">{avgRating || "No ratings"}</span>
                </div>
                <span className="text-neutral-400 text-xs">({reviews.length} reviews)</span>
              </div>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-lg font-bold text-neutral-900">{course ? "Rs." + (course.price ?? "0") : "Loading..."}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-neutral-100 space-y-3">
              <ul className="space-y-2.5">
                <li className="flex items-center gap-3 text-xs text-neutral-600"><InfinityIcon className="text-neutral-900 w-4 h-4" /><span>Full lifetime access</span></li>
                <li className="flex items-center gap-3 text-xs text-neutral-600"><Monitor className="text-neutral-900 w-4 h-4" /><span>Access on mobile and desktop</span></li>
                <li className="flex items-center gap-3 text-xs text-neutral-600"><Award className="text-neutral-900 w-4 h-4" /><span>Certificate of completion</span></li>
              </ul>
              <div className="pt-2">
                <button className="w-full md:w-auto px-6 py-2.5 bg-black hover:bg-neutral-900 text-white rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer shadow-sm disabled:opacity-50" onClick={handlePayment} disabled={loading || !course}>
                  {loading ? "Processing..." : isEnrolled ? "Continue Learning" : "Enroll Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 pt-6 border-t border-neutral-100">
          <div className="bg-white w-full md:w-2/5 p-6 rounded-xl border border-neutral-200 shadow-sm">
            <h2 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-1">Course Curriculum</h2>
            <p className="text-xs text-neutral-400 mb-4">{course?.lectures?.length || 0} Lectures</p>
            <div className="flex flex-col gap-2">
              {course?.lectures?.map((lecture, index) => (
                <button key={index}
                  disabled={!lecture.isPreviewFree && !isEnrolled}
                  onClick={() => { if (lecture.isPreviewFree || isEnrolled) setSelectedLecture(lecture); }}
                  className={"w-full flex items-center gap-3 px-4 py-2.5 rounded-md border text-left text-xs font-medium transition-colors duration-200 " + (lecture.isPreviewFree || isEnrolled ? "hover:bg-neutral-50 border-neutral-200 text-neutral-800 cursor-pointer" : "opacity-40 bg-neutral-50/50 border-neutral-100 cursor-not-allowed text-neutral-400")}
                >
                  <span>{lecture.isPreviewFree || isEnrolled ? <PlayCircle className="w-4 h-4 text-neutral-600" /> : <Lock className="w-4 h-4 text-neutral-400" />}</span>
                  <span className="truncate">{lecture.lectureTitle}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white w-full md:w-3/5 p-6 rounded-xl border border-neutral-200 shadow-sm">
            <div className="aspect-video w-full rounded-md overflow-hidden bg-neutral-950 flex flex-col items-center justify-center border border-neutral-800">
              {selectedLecture?.videoUrl ? (
                <video className="w-full h-full object-contain" src={selectedLecture.videoUrl} controls />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <Play className="w-10 h-10 text-neutral-600 animate-pulse" />
                  <span className="text-xs text-neutral-400">Select a free preview lecture</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-neutral-100 space-y-6">
          <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">Student Reviews</h2>
          {isEnrolled && (
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 space-y-3">
              <p className="text-xs font-semibold text-neutral-700">Write a Review</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)}>
                    <Star className={`w-4 h-4 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-neutral-300"}`} />
                  </button>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                className="w-full p-3 border border-neutral-200 rounded-md text-xs resize-none h-20 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
              <button onClick={handleSubmitReview} disabled={reviewLoading}
                className="px-4 py-2 bg-black text-white rounded-md text-xs font-medium disabled:opacity-50">
                {reviewLoading ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          )}
          {reviews.length === 0 ? (
            <p className="text-xs text-neutral-400">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="border border-neutral-100 rounded-xl p-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-700">
                      {review.userId?.name?.slice(0, 1).toUpperCase() || "U"}
                    </div>
                    <span className="text-xs font-semibold text-neutral-800">{review.userId?.name || "User"}</span>
                    <div className="flex items-center gap-0.5 ml-auto">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-3 h-3 ${star <= review.rating ? "fill-amber-400 text-amber-400" : "text-neutral-200"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 pl-9">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
