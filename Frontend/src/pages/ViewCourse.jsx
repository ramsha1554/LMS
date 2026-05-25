import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import img from "../assets/empty.jpg"

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

            <div className='flex flex-col md:flex-row gap-6'>

                <div className='w-full md:w-1/2'>

                    <img
                     src={selectedCourse?.thumbnail || img}
                     alt=""
                     className='rounded-xl w-full object-cover'
                    />

                </div>

                <div className='flex-1 space-y-4'>

                    <h1 className='text-3xl font-bold'>
                        {selectedCourse?.title}
                    </h1>

                    <p className='text-gray-500'>
                        {selectedCourse?.category}
                    </p>

                    <p className='text-2xl font-semibold'>
                        ₹{selectedCourse?.price}
                    </p>

                </div>

            </div>

        </div>

    </div>
  )
}

export default ViewCourse