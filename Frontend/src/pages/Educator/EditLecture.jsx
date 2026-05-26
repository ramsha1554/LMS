import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditLecture() {
    const { courseId, lectureId } = useParams()
    const navigate = useNavigate()
    const { lectureData } = useSelector(state => state.lecture)
    const selectedLecture = lectureData.find(lecture => lecture._id === lectureId)
    const [lectureTitle, setLectureTitle] = useState(selectedLecture?.lectureTitle)
    const [videoUrl, setVideoUrl] = useState("")
    const [isPreviewFree, setIsPreviewFree] = useState(false)

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
            <div className='w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6'>
                <div className='flex items-center gap-2 mb-2'>
                    <FaArrowLeftLong className='text-gray-600 cursor-pointer'
                        onClick={() => navigate(`/createlecture/${courseId}`)} />
                    <h2 className='text-xl font-semibold text-gray-800'>Update Course Lecture</h2>
                </div>

                <div className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Lecture Title *</label>
                        <input type="text"
                            className='w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[black] focus:outline-none'
                            required onChange={(e) => setLectureTitle(e.target.value)} value={lectureTitle} />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Video *</label>
                        <input type="file"
                            className='w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-[white] hover:file:bg-gray-500'
                            required accept='video/*'
                            onChange={(e) => setVideoUrl(e.target.files[0])} />
                    </div>

                    <div className='flex items-center gap-3'>
                        <input type="checkbox" className='accent-[black] h-4 w-4' id='isFree'
                            onChange={() => setIsPreviewFree(prev => !prev)} />
                        <label htmlFor="isFree" className='text-sm text-gray-700'>Is this Video FREE</label>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditLecture