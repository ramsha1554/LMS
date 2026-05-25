import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ViewCourse() {

    const navigate = useNavigate()

    const { courseId } = useParams()

    const { courseData } = useSelector(state => state.course)

    const selectedCourse = courseData?.find(
        course => course._id === courseId
    )

  return (
    <div className='min-h-screen bg-gray-50 p-6'>

        <div className='max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6'>

            <FaArrowLeftLong
             className='text-black w-[22px] h-[22px] cursor-pointer mb-5'
             onClick={()=>navigate("/")}
            />

            <h1 className='text-3xl font-bold'>
                {selectedCourse?.title}
            </h1>

            <p className='text-gray-500 mt-2'>
                {selectedCourse?.category}
            </p>

        </div>

    </div>
  )
}

export default ViewCourse