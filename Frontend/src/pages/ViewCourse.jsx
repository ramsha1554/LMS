import React from 'react'
import { FaArrowLeftLong, FaStar } from "react-icons/fa6";
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

                {/* Thumbnail */}

                <div className='w-full md:w-1/2'>

                    <img
                     src={selectedCourse?.thumbnail || img}
                     alt=""
                     className='rounded-xl w-full object-cover'
                    />

                </div>

                {/* Course Info */}

                <div className='flex-1 space-y-4 mt-4'>

                    <h1 className='text-3xl font-bold'>
                        {selectedCourse?.title}
                    </h1>

                    <p className='text-gray-500'>
                        {selectedCourse?.subTitle}
                    </p>

                    <div className='flex items-center gap-2 text-yellow-500'>

                        <span className='flex items-center gap-1'>
                            <FaStar />
                            4.8
                        </span>

                        <span className='text-gray-400 text-sm'>
                            (1,200 Reviews)
                        </span>

                    </div>

                    <p className='text-gray-600'>
                        Category: {selectedCourse?.category}
                    </p>

                    <div>

                        <span className='text-2xl font-semibold text-black'>
                            ₹{selectedCourse?.price}
                        </span>

                        <span className='text-gray-400 line-through ml-2'>
                            ₹599
                        </span>

                    </div>

                    <ul className='space-y-2 text-gray-700 pt-2'>

                        <li>
                            ✅ Full lifetime access
                        </li>

                        <li>
                            ✅ Access on mobile and desktop
                        </li>

                        <li>
                            ✅ Certificate of completion
                        </li>

                    </ul>

                    <button className='bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 cursor-pointer'>
                        Enroll Now
                    </button>

                </div>

            </div>

        </div>

    </div>
  )
}

export default ViewCourse