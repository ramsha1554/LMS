import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';

function CreateLecture() {

    const navigate = useNavigate()

    const { courseId } = useParams()

    const [lectureTitle, setLectureTitle] = useState("")

    const handleCreateLecture = async (e) => {

        e.preventDefault()

        try {

            const lectureData = {
                lectureTitle
            }

            await axios.post(
                `${serverUrl}/api/course/createlecture/${courseId}`,
                lectureData,
                { withCredentials: true }
            )

            toast.success("Lecture created successfully")

            setLectureTitle("")

        } catch (error) {

            console.log(error)

            toast.error("Failed to create lecture")

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
                Add New Lecture
            </h1>

            <p className='text-gray-500 mt-2 mb-8'>
                Create lecture content for this course.
            </p>

            <form
             className='space-y-5'
             onSubmit={handleCreateLecture}
            >

                {/* Lecture Title */}

                <div>

                    <label className='block text-sm font-medium mb-2'>
                        Lecture Title
                    </label>

                    <input
                     type="text"
                     value={lectureTitle}
                     onChange={(e)=>setLectureTitle(e.target.value)}
                     placeholder='Enter lecture title'
                     className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none'
                    />

                </div>

                {/* Submit Button */}

                <button
                 type='submit'
                 className='bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 cursor-pointer'
                >
                    Create Lecture
                </button>

            </form>

        </div>

    </div>
  )
}

export default CreateLecture