import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import img from "../assets/empty.jpg"

function EnrolledCourses() {

    const navigate = useNavigate()

    const { courseData } = useSelector(state => state.course)

  return (
    <div className='min-h-screen bg-gray-100 p-6'>

        <div className='max-w-7xl mx-auto'>

            <h1 className='text-3xl font-bold mb-8'>
                My Learning
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>

                {
                    courseData?.map((course,index)=>(

                        <div
                         key={index}
                         className='bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200'
                         onClick={()=>{
                            navigate(`/viewcourse/${course._id}`)
                         }}
                        >

                            <img
                             src={course?.thumbnail || img}
                             alt=""
                             className='w-full h-[200px] object-cover'
                            />

                            <div className='p-5 space-y-2'>

                                <h2 className='text-xl font-semibold'>
                                    {course?.title}
                                </h2>

                                <p className='text-gray-500 text-sm'>
                                    {course?.category}
                                </p>

                                <div className='flex items-center justify-between pt-2'>

                                    <span className='text-sm text-gray-500'>
                                        {course?.lectures?.length || 0} Lectures
                                    </span>

                                    <button className='bg-black text-white px-4 py-2 rounded-lg text-sm'>
                                        Continue
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

    </div>
  )
}

export default EnrolledCourses