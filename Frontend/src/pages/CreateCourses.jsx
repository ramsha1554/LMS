import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function CreateCourses() {

    const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-gray-50 p-6'>

        <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6'>

            <FaArrowLeftLong
             className='text-black w-[22px] h-[22px] cursor-pointer mb-5'
             onClick={()=>navigate("/")}
            />

            <h1 className='text-3xl font-bold'>
                Create New Course
            </h1>

            <p className='text-gray-500 mt-2'>
                Build and publish your course content.
            </p>

        </div>

    </div>
  )
}

export default CreateCourses