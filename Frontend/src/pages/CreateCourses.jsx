import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function CreateCourses() {

    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [category, setCategory] = useState("")

  return (
    <div className='min-h-screen bg-gray-50 p-6'>

        <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6'>

            <FaArrowLeftLong
             className='text-black w-[22px] h-[22px] cursor-pointer mb-5'
             onClick={()=>navigate("/")}
            />

            <h1 className='text-3xl font-bold'>
                Create New Course
            </h1>

            <p className='text-gray-500 mt-2 mb-8'>
                Build and publish your course content.
            </p>

            <form className='space-y-5'>

                {/* Course Title */}

                <div>

                    <label className='block text-sm font-medium mb-2'>
                        Course Title
                    </label>

                    <input
                     type="text"
                     value={title}
                     onChange={(e)=>setTitle(e.target.value)}
                     placeholder='Enter course title'
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
                     placeholder='Enter course subtitle'
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

            </form>

        </div>

    </div>
  )
}

export default CreateCourses;
// Deprecated duplicate root educator page. Use ./pages/Educator/CreateCourses instead.
