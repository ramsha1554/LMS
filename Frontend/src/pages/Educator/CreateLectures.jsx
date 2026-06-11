import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";
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
      dispatch(setLectureData([...( lectureData || []), data.lecture]));
      setLectureTitle("");
      toast.success("Lecture created");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create lecture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-2">
          <FaArrowLeftLong
            className="text-gray-600 cursor-pointer"
            onClick={() => navigate("/educator/courses")}
          />
          <h2 className="text-xl font-semibold text-gray-800">Manage Lectures</h2>
        </div>

        {/* Create new lecture */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">Add New Lecture</h3>
          <input
            type="text"
            placeholder="Lecture title"
            className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:outline-none"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
          <button
            className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50 flex items-center justify-center gap-2"
            disabled={loading}
            onClick={handleCreateLecture}
          >
            {loading ? <ClipLoader size={16} color="white" /> : "Create Lecture"}
          </button>
        </div>

        {/* Lecture list */}
        <div className="bg-white rounded-xl shadow p-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">Lectures</h3>
          {fetching && <p className="text-sm text-gray-400">Loading...</p>}
          {!fetching && (!lectureData || lectureData.length === 0) && (
            <p className="text-sm text-gray-400">No lectures yet. Add one above.</p>
          )}
          {lectureData?.map((lecture, index) => (
            <div
              key={lecture._id}
              className="flex items-center justify-between border border-gray-200 rounded-lg p-3"
            >
              <span className="text-sm text-gray-800">{index + 1}. {lecture.lectureTitle}</span>
              <FaEdit
                className="text-gray-500 hover:text-blue-600 cursor-pointer"
                onClick={() => navigate(`/editlecture/${courseId}/${lecture._id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateLectures;
