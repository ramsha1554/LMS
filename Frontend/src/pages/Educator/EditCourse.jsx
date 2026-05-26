import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

function EditCourse() {
    const navigate = useNavigate()
    const { courseId } = useParams()
     const [selectCourse, setSelectCourse] = useState(null)

    return (
        <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md'>
            <div className='flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative'>
                <FaArrowLeftLong className='top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer'
                    onClick={() => navigate("/courses")} />
                <h2 className='text-2xl font-semibold md:pl-[60px]'>
                    Add Detail Information regarding the Course
                </h2>
 <div className='space-x-2 space-y-2'>
                    <button className='bg-black text-white px-4 py-2 rounded-md'
                        onClick={() => navigate(`/createlecture/${selectCourse?._id}`)}>
                        Go to Lecture page
                    </button>
                </div>

            </div>
            <div className='bg-gray-50 p-6 rounded-md'>
                <h2 className='text-lg font-medium mb-4'>Basic Course Information</h2>
                <form className='space-y-6' onSubmit={(e) => e.preventDefault()}>
                </form>
            </div>
        
        </div>
    )
}

export default EditCourse