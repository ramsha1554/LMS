import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';

function EditLecture() {

    const navigate = useNavigate()

    const { lectureId } = useParams()

    const [lectureTitle, setLectureTitle] = useState("")

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

            <form className='space-y-5'>

                {/* Lecture Title */}

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

            </form>

        </div>

    </div>
  )
}

export default EditLecture