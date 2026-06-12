import React, { useState } from "react";
import { ArrowLeft, Eye, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLectureData } from "../../redux/lectureSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import axiosClient from "../../lib/axiosClient";

function EditLecture() {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lectureData } = useSelector((state) => state.lecture);
  const selectedLecture = lectureData?.find((l) => l._id === lectureId);

  const [lectureTitle, setLectureTitle] = useState(selectedLecture?.lectureTitle || "");
  const [videoFile, setVideoFile] = useState(null);
  const [isPreviewFree, setIsPreviewFree] = useState(selectedLecture?.isPreviewFree || false);
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  if (!lectureId || lectureId === "undefined") {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center max-w-sm">
          <p className="text-sm font-semibold text-neutral-800">Invalid lecture route</p>
          <p className="text-xs text-neutral-400 mt-1">lectureId is missing from the URL.</p>
          <button
            onClick={() => navigate("/educator/courses")}
            className="mt-4 px-4 py-2 bg-black text-white text-xs rounded-md hover:bg-neutral-800 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const handleEditLecture = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("lectureTitle", lectureTitle);
    if (videoFile) formdata.append("videoUrl", videoFile);
    formdata.append("isPreviewFree", isPreviewFree);
    try {
      const result = await axiosClient.post(`/api/course/editlecture/${lectureId}`, formdata);
      dispatch(
        setLectureData(
          lectureData.map((l) => (l._id === lectureId ? result.data : l))
        )
      );
      toast.success("Lecture updated");
      navigate(`/createlecture/${courseId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const removeLecture = async () => {
    setRemoving(true);
    try {
      await axiosClient.delete(`/api/course/removelecture/${lectureId}`);
      dispatch(setLectureData(lectureData.filter((l) => l._id !== lectureId)));
      toast.success("Lecture removed");
      navigate(`/createlecture/${courseId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Remove failed");
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="w-full h-[64px] bg-white border-b border-neutral-200 flex items-center px-6 gap-4 sticky top-0 z-10">
        <button
          onClick={() => navigate(`/createlecture/${courseId}`)}
          className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-neutral-600" />
        </button>
        <span className="text-sm font-semibold text-neutral-900">Edit Lecture</span>
      </div>

      <div className="max-w-xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">

          {/* Lecture Title */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Lecture Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              placeholder="e.g. Introduction to Hooks"
            />
          </div>

          {/* Video Upload */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Video {selectedLecture?.videoUrl ? "(upload to replace)" : <span className="text-red-500">*</span>}
            </label>

            {/* Show current video filename if exists */}
            {selectedLecture?.videoUrl && !videoFile && (
              <div className="mb-2 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-md flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                <span className="text-xs text-neutral-500 truncate">
                  Current: {selectedLecture.videoUrl.split("/").pop()}
                </span>
              </div>
            )}

            {videoFile && (
              <div className="mb-2 px-3 py-2 bg-green-50 border border-green-200 rounded-md">
                <span className="text-xs text-green-700 truncate block">
                  New: {videoFile.name}
                </span>
              </div>
            )}

            <input
              type="file"
              accept="video/*"
              className="w-full border border-neutral-300 rounded-md p-2 text-sm
                file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0
                file:text-xs file:font-medium file:bg-neutral-900 file:text-white
                hover:file:bg-neutral-700 transition-all cursor-pointer"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
          </div>

          {/* Free Preview Toggle */}
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-md">
            <div>
              <p className="text-xs font-semibold text-neutral-800">Free Preview</p>
              <p className="text-xs text-neutral-400 mt-0.5">Let students watch this lecture before enrolling</p>
            </div>
            <button
              onClick={() => setIsPreviewFree((prev) => !prev)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none ${
                isPreviewFree ? "bg-black" : "bg-neutral-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  isPreviewFree ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {loading && (
            <p className="text-xs text-neutral-400 text-center">Uploading video, please wait...</p>
          )}

          {/* Save button */}
          <button
            className="w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            disabled={loading}
            onClick={handleEditLecture}
          >
            {loading ? <ClipLoader size={16} color="white" /> : "Save Changes"}
          </button>

          {/* Remove section */}
          <div className="pt-2 border-t border-neutral-100">
            {!confirmRemove ? (
              <button
                onClick={() => setConfirmRemove(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-red-500 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove Lecture
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-center text-neutral-500">Are you sure? This cannot be undone.</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmRemove(false)}
                    className="flex-1 py-2.5 text-xs font-medium border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={removeLecture}
                    disabled={removing}
                    className="flex-1 py-2.5 text-xs font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {removing ? <ClipLoader size={14} color="white" /> : "Yes, Remove"}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default EditLecture;
