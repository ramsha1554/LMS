import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';

function ViewLecture() {

    const navigate = useNavigate()

    const { lectureId } = useParams()

  return (
    <div className='min-h-screen bg-gray-100 p-6'>

        <div className='max-w-7xl mx-auto space-y-6'>

            {/* Back Button */}

            <FaArrowLeftLong
             className='w-[22px] h-[22px] cursor-pointer'
             onClick={()=>navigate(-1)}
            />

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

                {/* Video Player */}

                <div className='lg:col-span-2 bg-white rounded-2xl shadow-md p-5'>

                    <div className='aspect-video bg-black rounded-xl flex items-center justify-center'>

                        <span className='text-white'>
                            Video Player
                        </span>

                    </div>

                    <div className='mt-5'>

                        <h1 className='text-2xl font-bold'>
                            Lecture Title
                        </h1>

                        <p className='text-gray-500 mt-2'>
                            Lecture ID: {lectureId}
                        </p>

                    </div>

                </div>

                {/* Lecture Sidebar */}

                <div className='bg-white rounded-2xl shadow-md p-5'>

                    <h2 className='text-xl font-bold mb-4'>
                        Course Lectures
                    </h2>

                    <div className='space-y-3'>

                        <div className='border rounded-lg p-3 cursor-pointer hover:bg-gray-50'>
                            Introduction Lecture
                        </div>

                        <div className='border rounded-lg p-3 cursor-pointer hover:bg-gray-50'>
                            Advanced Concepts
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
  )
}

export default ViewLecture