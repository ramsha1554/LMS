import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';
import { SERVER_URL } from "../lib/constants";

function EditLecture() {

    const navigate = useNavigate()
    const serverUrl = SERVER_URL
    const { lectureId } = useParams()

    const [lectureTitle, setLectureTitle] = useState("")
    const [video, setVideo] = useState(null)
    const [isPreviewFree, setIsPreviewFree] = useState(false)

    const handleUpdateLecture = async (e) => {

        e.preventDefault()

        try {

            const formData = new FormData()

            formData.append("lectureTitle", lectureTitle)
            formData.append("isPreviewFree", isPreviewFree)

            if(video){
                formData.append("video", video)
            }

            await axios.put(
                `${serverUrl}/api/course/editlecture/${lectureId}`,
                formData,
                {
                    withCredentials: true,
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                }
            )

            toast.success("Lecture updated successfully")

        } catch (error) {

            console.log(error)

            toast.error("Failed to update lecture")

        }

    }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>

        <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6'>

            <FaArrowLeftLong
             className='text-black w-[22px] h-[22px] cursor-pointer mb-5'
             onClick={()=>navigate(-1)}
            />

            <h1 className='text-3xl font-bold'>
                Edit Lecture
            </h1>

            <p className='text-gray-500 mt-2 mb-8'>
                Update lecture information and content.
            </p>

            <form
             className='space-y-5'
             onSubmit={handleUpdateLecture}
            >

                <div>

                    <label className='block text-sm font-medium mb-2'>
                        Lecture Title
                    </label>

                    <input
                     type="text"
                     value={lectureTitle}
                     onChange={(e)=>setLectureTitle(e.target.value)}
                     placeholder='Update lecture title'
                     className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none'
                    />

                </div>

                <div>

                    <label className='block text-sm font-medium mb-2'>
                        Upload Lecture Video
                    </label>

                    <input
                     type="file"
                     accept='video/*'
                     onChange={(e)=>setVideo(e.target.files[0])}
                     className='w-full border border-gray-300 rounded-lg px-4 py-3'
                    />

                </div>

                <div className='flex items-center gap-3'>

                    <input
                     type="checkbox"
                     checked={isPreviewFree}
                     onChange={(e)=>setIsPreviewFree(e.target.checked)}
                    />

                    <label className='text-sm font-medium'>
                        Make this lecture free preview
                    </label>

                </div>

                <button
                 type='submit'
                 className='bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 cursor-pointer'
                >
                    Save Lecture
                </button>

            </form>

        </div>

    </div>
  )
}

export default EditLecture

