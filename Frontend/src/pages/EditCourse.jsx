import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';

function EditCourse() {

    const navigate = useNavigate()

    const { courseId } = useParams()

    const { creatorCourseData } = useSelector(state => state.course)

    const selectedCourse = creatorCourseData?.find(
        course => course._id === courseId
    )

    const [title, setTitle] = useState(
        selectedCourse?.title || ""
    )

    const [subTitle, setSubTitle] = useState(
        selectedCourse?.subTitle || ""
    )

    const [category, setCategory] = useState(
        selectedCourse?.category || ""
    )

    const handleUpdateCourse = async (e) => {

        e.preventDefault()

        try {

            const updatedData = {
                title,
                subTitle,
                category
            }

            await axios.put(
                `${serverUrl}/api/course/editcourse/${courseId}`,
                updatedData,
                { withCredentials: true }
            )

            toast.success("Course updated successfully")

        } catch (error) {

            console.log(error)

            toast.error("Failed to update course")

        }

    }

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

            <p className='text-gray-500 mt-2 mb-8'>
                Update your course information.
            </p>

            <form
             className='space-y-5'
             onSubmit={handleUpdateCourse}
            >

                {/* Course Title */}

                <div>

                    <label className='block text-sm font-medium mb-2'>
                        Course Title
                    </label>

                    <input
                     type="text"
                     value={title}
                     onChange={(e)=>setTitle(e.target.value)}
                     className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none'
                    />

                </div>

                {/* Subtitle */}

                <div>

                    <label className='block text-sm font-medium mb-2'>
                        Course Subtitle
                    </label>

                    <input
                     type="text"
                     value={subTitle}
                     onChange={(e)=>setSubTitle(e.target.value)}
                     className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none'
                    />

                </div>

                {/* Category */}

                <div>

                    <label className='block text-sm font-medium mb-2'>
                        Category
                    </label>

                    <select
                     value={category}
                     onChange={(e)=>setCategory(e.target.value)}
                     className='w-full border border-gray-300 rounded-lg px-4 py-3 outline-none'
                    >

                        <option value="">
                            Select Category
                        </option>

                        <option value="Web Development">
                            Web Development
                        </option>

                        <option value="AI/ML">
                            AI/ML
                        </option>

                        <option value="Data Science">
                            Data Science
                        </option>

                    </select>

                </div>

                {/* Submit Button */}

                <button
                 type='submit'
                 className='bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 cursor-pointer'
                >
                    Save Changes
                </button>

            </form>

        </div>

    </div>
  )
}

export default EditCourse