import React from 'react'

import { useNavigate } from 'react-router-dom'

import empty from "../assets/empty.jpg"

import { FaStar } from "react-icons/fa";

function Card({ course }) {

    const navigate = useNavigate()

  return (

    <div
     className='w-[350px] bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer'
     onClick={() => navigate(`/course/${course?._id}`)}
    >

        {/* Thumbnail */}

        <div className='w-full h-[220px] overflow-hidden'>

            <img
             src={course?.thumbnail || empty}
             alt=""
             className='w-full h-full object-cover hover:scale-105 transition-all duration-300'
            />

        </div>

        {/* Content */}

        <div className='p-5 space-y-4'>

            {/* Category */}

            <span className='bg-[#03394b] text-white text-xs px-3 py-1 rounded-full'>

                {course?.category || "Development"}

            </span>

            {/* Title */}

            <h2 className='text-2xl font-semibold text-[#03394b] line-clamp-2'>

                {course?.title}

            </h2>

            {/* Subtitle */}

            <p className='text-gray-500 line-clamp-2 text-sm'>

                {course?.subTitle || "Learn modern development with practical real-world projects."}

            </p>

            {/* Reviews */}

            <div className='flex items-center gap-2 text-yellow-500'>

                <FaStar />

                <span className='text-sm font-medium text-black'>

                    4.8

                </span>

                <span className='text-gray-400 text-sm'>

                    ({course?.reviews?.length || 0} Reviews)

                </span>

            </div>

            {/* Bottom */}

            <div className='flex items-center justify-between pt-2'>

                <span className='text-2xl font-bold text-black'>

                    ₹{course?.price}

                </span>

                <button
                 className='bg-[#03394b] text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-[#022631] transition-all duration-200'
                >

                    View Course

                </button>

            </div>

        </div>

    </div>

  )

}

export default Card