import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLectureData } from '../redux/lectureSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import axiosClient from '../lib/axiosClient';

function EditLecture() {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lectureData } = useSelector(state => state.lecture);
  const selectedLecture = lectureData?.find(l => l._id === lectureId);

  //  All hooks declared before any early return
  const [lectureTitle, setLectureTitle] = useState(selectedLecture?.lectureTitle || "");
  const [videoUrl, setVideoUrl] = useState("");
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  // Early return AFTER hooks
  if (!lectureId || lectureId === "undefined") {
    return (
      <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
        <div className='bg-white rounded-xl shadow-lg p-6 text-center'>
          <h2 className='text-xl font-semibold text-gray-800'>Invalid lecture route</h2>
          <p className='text-gray-600 mt-2'>lectureId is missing from the URL.</p>
        </div>
      </div>
    );
  }

  const handleEditLecture = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("lectureTitle", lectureTitle);
    formdata.append("video", videoUrl);
    formdata.append("isPreviewFree", isPreviewFree);
    try {
      const result = await axiosClient.post(`/api/course/editlecture/${lectureId}`, formdata);
      dispatch(setLectureData([...lectureData, result.data]));
      toast.success("Lecture Updated");
      navigate("/educator/courses");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const removeLecture = async () => {
    setLoading1(true);
    try {
      await axiosClient.delete(`/api/course/removelecture/${lectureId}`);
      navigate(`/createlecture/${courseId}`);
      toast.success("Lecture Removed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Remove failed");
    } finally {
      setLoading1(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6'>
        <div className='flex items-center gap-2 mb-2'>
          <FaArrowLeftLong className='text-gray-600 cursor-pointer'
            onClick={() => navigate(`/createlecture/${courseId}`)} />
          <h2 className='text-xl font-semibold text-gray-800'>Update Course Lecture</h2>
        </div>

        <button className='mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm'
          disabled={loading1} onClick={removeLecture}>
          {loading1 ? <ClipLoader size={30} color='white' /> : "Remove Lecture"}
        </button>

        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Lecture Title *</label>
            <input type="text"
              className='w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:outline-none'
              required onChange={(e) => setLectureTitle(e.target.value)} value={lectureTitle} />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Video *</label>
            <input type="file"
              className='w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-white hover:file:bg-gray-500'
              required accept='video/*'
              onChange={(e) => setVideoUrl(e.target.files[0])} />
          </div>
          <div className='flex items-center gap-3'>
            <input type="checkbox" className='accent-black h-4 w-4' id='isFree'
              onChange={() => setIsPreviewFree(prev => !prev)} />
            <label htmlFor="isFree" className='text-sm text-gray-700'>Is this Video FREE</label>
          </div>
          {loading && <p className='text-sm text-gray-500'>Uploading video... Please wait.</p>}
        </div>

        <div className='pt-4'>
          <button className='w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition'
            disabled={loading} onClick={handleEditLecture}>
            {loading ? <ClipLoader size={30} color='white' /> : "Update Lecture"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditLecture;
