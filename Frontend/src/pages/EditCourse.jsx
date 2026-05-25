import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditCourse() {

    const navigate = useNavigate()

    const { courseId } = useParams()

    const { creatorCourseData } = useSelector(state => state.course)

    const selectedCourse = creatorCourseData?.find(
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
                Edit Course
            </h1>

            <p className='text-gray-500 mt-2'>
                Update your course information.
            </p>

            <div className='mt-8 space-y-4'>

                <div>

                    <h2 className='text-sm text-gray-500'>
                        Course Title
                    </h2>

                    <p className='text-lg font-medium'>
                        {selectedCourse?.title}
                    </p>

                </div>

                <div>

                    <h2 className='text-sm text-gray-500'>
                        Category
                    </h2>

                    <p className='text-lg font-medium'>
                        {selectedCourse?.category}
                    </p>

                </div>

            </div>

        </div>

    </div>
  )
}

export default EditCourse