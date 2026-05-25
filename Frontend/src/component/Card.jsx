import React from 'react'
import { useNavigate } from 'react-router-dom'

function Card({ course }) {

    const navigate = useNavigate()

  return (

    <div
     className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer'
     onClick={()=>navigate(`/course/${course?._id}`)}
    >

        <img
         src={course?.thumbnail}
         alt=""
         className='w-full h-[220px] object-cover'
        />

        <div className='p-5 space-y-3'>

            <h2 className='text-2xl font-semibold text-[#03394b]'>

                {course?.title}

            </h2>

            <p className='text-gray-500 line-clamp-2'>

                {course?.subTitle}

            </p>

            <div className='flex items-center justify-between pt-2'>

                <span className='text-xl font-bold text-black'>

                    ₹{course?.price}

                </span>

                <button className='bg-[#03394b] text-white px-4 py-2 rounded-xl cursor-pointer'>

                    View Course

                </button>

            </div>

        </div>

    </div>

  )

}

export default Card