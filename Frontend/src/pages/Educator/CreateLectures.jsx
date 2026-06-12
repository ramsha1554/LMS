import React, { useEffect, useState } from "react";
import { ArrowLeft, PlusCircle, Pencil, BookOpen } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import axiosClient from "../../lib/axiosClient";
import { setLectureData } from "../../redux/lectureSlice";

function CreateLectures() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lectureData } = useSelector((state) => state.lecture);

  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const { data } = await axiosClient.get(`/api/course/getlecture/${courseId}`);
        dispatch(setLectureData(data.lectures || []));
      } catch (error) {
        console.error("Failed to fetch lectures:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchLectures();
  }, [courseId, dispatch]);

  const handleCreateLecture = async () => {
    if (!lectureTitle.trim()) {
      toast.error("Lecture title is required");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosClient.post(`/api/course/createlecture/${courseId}`, { lectureTitle });
      dispatch(setLectureData([...(lectureData || []), data.lecture]));
      setLectureTitle("");
      toast.success("Lecture created");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create lecture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="w-full h-[64px] bg-white border-b border-neutral-200 flex items-center px-6 gap-4 sticky top-0 z-10">
        <button
          onClick={() => navigate(`/editcourse/${courseId}`)}
          className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-neutral-600" />
        </button>
        <span className="text-sm font-semibold text-neutral-900">Manage Lectures</span>
        <div className="ml-auto">
          <button
            onClick={() => navigate("/educator/courses")}
            className="px-4 py-2 text-xs font-medium border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">

        {/* Add lecture card */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-neutral-900">Add New Lecture</p>
            <p className="text-xs text-neutral-400 mt-0.5">Give the lecture a clear title — you can upload the video after.</p>
          </div>
          <input
            type="text"
            placeholder="e.g. Introduction to React Hooks"
            className="w-full px-3 py-2.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreateLecture()}
          />
          <button
            className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            disabled={loading}
            onClick={handleCreateLecture}
          >
            {loading ? (
              <ClipLoader size={16} color="white" />
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                Create Lecture
              </>
            )}
          </button>
        </div>

        {/* Lecture list */}
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <p className="text-sm font-semibold text-neutral-900">Lectures</p>
            {lectureData && lectureData.length > 0 && (
              <span className="text-xs text-neutral-400">{lectureData.length} total</span>
            )}
          </div>

          {fetching && (
            <div className="px-6 py-8 flex justify-center">
              <ClipLoader size={20} color="#000" />
            </div>
          )}

          {!fetching && (!lectureData || lectureData.length === 0) && (
            <div className="px-6 py-10 flex flex-col items-center gap-3 text-center">
              <BookOpen className="w-8 h-8 text-neutral-200" />
              <p className="text-sm text-neutral-400">No lectures yet. Add your first one above.</p>
            </div>
          )}

          {!fetching && lectureData && lectureData.length > 0 && (
            <div className="divide-y divide-neutral-100">
              {lectureData.map((lecture, index) => (
                <div
                  key={lecture._id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-neutral-50 transition-colors"
                >
                  {/* Lecture number */}
                  <span className="w-7 h-7 rounded-full bg-neutral-100 text-neutral-500 text-xs font-semibold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>

                  {/* Title */}
                  <p className="flex-1 text-sm text-neutral-800 font-medium truncate">
                    {lecture.lectureTitle}
                  </p>

                  {/* Edit button */}
                  <button
                    onClick={() => navigate(`/editlecture/${courseId}/${lecture._id}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded-md hover:bg-neutral-100 transition-colors flex-shrink-0"
                  >
                    <Pencil className="w-3 h-3" />
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateLectures;
