import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { setLectureData } from '../redux/lectureSlice';
import { toast } from 'react-toastify';
import axiosClient from '../lib/axiosClient';

function CreateLecture() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lectureData } = useSelector(state => state.lecture);
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const result = await axiosClient.get(`/api/course/courselecture/${courseId}`);
        dispatch(setLectureData(result.data.lectures));
      } catch (error) {
        console.log(error);
      }
    };
    fetchLectures();
  }, [courseId, dispatch]);

  const handleCreateLecture = async () => {
    setLoading(true);
    try {
      const result = await axiosClient.post(`/api/course/createlecture/${courseId}`, { lectureTitle });
      dispatch(setLectureData([...lectureData, result.data.lecture]));
      toast.success("Lecture Added");
      setLectureTitle("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create lecture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='bg-white shadow-xl rounded-xl w-full max-w-2xl p-6'>
        <div className='mb-6'>
          <h1 className='text-2xl font-semibold text-gray-800 mb-1'>Let's Add a Lecture</h1>
          <p className='text-sm text-gray-500'>Enter the title and add your video lectures to enhance your course content.</p>
        </div>

        <input type="text"
          className='w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4'
          placeholder='e.g. Introduction to MERN Stack'
          onChange={(e) => setLectureTitle(e.target.value)} value={lectureTitle} />

        <div className='flex gap-4 mb-6'>
          <button className='flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium'
            onClick={() => navigate(`/editcourse/${courseId}`)}>
            <FaArrowLeftLong /> Back to Course
          </button>
          <button className='px-5 py-2 rounded-md bg-black text-white hover:bg-gray-600 transition-all text-sm font-medium shadow'
            disabled={loading} onClick={handleCreateLecture}>
            {loading ? <ClipLoader size={30} color='white' /> : "+ Create Lecture"}
          </button>
        </div>

        <div className='space-y-2'>
          {lectureData?.map((lecture, index) => (
            <div key={index} className='bg-gray-100 rounded-md flex justify-between items-center p-3 text-sm font-medium text-gray-700'>
              <span>Lecture - {index + 1} : {lecture.lectureTitle}</span>
              <FaEdit className='text-gray-500 hover:text-gray-700 cursor-pointer'
                onClick={() => {
                  const id = lecture?._id ?? lecture?.id;
                  if (!id) {
                    toast.error("Lecture id missing (cannot edit).");
                    return;
                  }
                  navigate(`/editlecture/${courseId}/${id}`);
                }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateLecture;
// Deprecated duplicate root educator page. Use ./pages/Educator/CreateLecture instead.
