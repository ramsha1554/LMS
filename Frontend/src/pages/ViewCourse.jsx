import React, { useState } from 'react'
import {
  FaArrowLeftLong,
  FaStar,
  FaLock,
  FaInfinity
} from "react-icons/fa6";

import { FaPlayCircle } from "react-icons/fa";

import { MdDevices } from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";

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

    const [selectedLecture, setSelectedLecture] = useState(null)

    const [isEnrolled, setIsEnrolled] = useState(false)

    const loadRazorpayScript = () => {

        return new Promise((resolve) => {

            const script = document.createElement("script")

            script.src = "https://checkout.razorpay.com/v1/checkout.js"

            script.onload = () => {
                resolve(true)
            }

            script.onerror = () => {
                resolve(false)
            }

            document.body.appendChild(script)

        })

    }

    const handlePayment = async () => {

        const res = await loadRazorpayScript()

        if(!res){

            alert("Razorpay SDK failed to load")

            return

        }

        try {

            const response = await fetch(
                "http://localhost:8000/api/payment/order",
                {

                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body: JSON.stringify({
                        courseId:selectedCourse?._id
                    })

                }
            )

            const data = await response.json()

            console.log(data)

        } catch (error) {

            console.log(error)

        }

    }

  return (
    
    <div className='min-h-screen bg-gray-50 p-6'>

        <div className='max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-8'>

            {/* Back Button */}

            <FaArrowLeftLong
             className='text-black w-[22px] h-[22px] cursor-pointer'
             onClick={()=>navigate("/")}
            />

            {/* Top Section */}

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

                    {/* Ratings */}

                    <div className='flex items-center gap-2 text-yellow-500'>

                        <span className='flex items-center gap-1'>
                            <FaStar />
                            4.8
                        </span>

                        <span className='text-gray-400 text-sm'>
                            (1,200 Reviews)
                        </span>

                    </div>

                    {/* Category */}

                    <p className='text-gray-600'>
                        Category: {selectedCourse?.category}
                    </p>

                    {/* Pricing */}

                    <div>

                        <span className='text-2xl font-semibold text-black'>
                            ₹{selectedCourse?.price}
                        </span>

                        <span className='text-gray-400 line-through ml-2'>
                            ₹599
                        </span>

                    </div>

                    {/* Course Benefits */}

                    <ul className='space-y-3 text-gray-700 pt-2'>

                        <li className='flex items-center gap-3'>

                            <FaInfinity className='text-[#03394b] w-[18px] h-[18px]' />

                            Full lifetime access

                        </li>

                        <li className='flex items-center gap-3'>

                            <MdDevices className='text-[#03394b] w-[20px] h-[20px]' />

                            Access on mobile and desktop

                        </li>

                        <li className='flex items-center gap-3'>

                            <PiCertificateFill className='text-[#03394b] w-[20px] h-[20px]' />

                            Certificate of completion

                        </li>

                    </ul>

                    {/* Enroll Button */}

                    <button
                     className='bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-all duration-200'
                     onClick={handlePayment}
                    >

                        {
                            isEnrolled
                            ? "Continue Learning"
                            : "Enroll Now"
                        }

                    </button>

                </div>

            </div>

            {/* Curriculum Section */}

            <div className='flex flex-col md:flex-row gap-6'>

                {/* Lecture List */}

                <div className='bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200'>

                    <h2 className='text-2xl font-bold mb-2'>
                        Course Curriculum
                    </h2>

                    <p className='text-sm text-gray-500 mb-4'>
                        {selectedCourse?.lectures?.length || 0} Lectures
                    </p>

                    <div className='flex flex-col gap-3'>

                        {
                            selectedCourse?.lectures?.map((lecture, index) => (

                                <button
                                 key={index}

                                 disabled={!lecture.isPreviewFree && !isEnrolled}

                                 onClick={()=>{
                                    if(lecture.isPreviewFree || isEnrolled){
                                        setSelectedLecture(lecture)
                                    }
                                 }}

                                 className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all duration-200
                                 ${lecture.isPreviewFree || isEnrolled
                                    ? "hover:bg-gray-100 border-gray-300 cursor-pointer"
                                    : "opacity-60 border-gray-200 cursor-not-allowed"
                                 }`}
                                >

                                    <span className='text-lg text-gray-700'>

                                        {
                                            lecture.isPreviewFree
                                            ? <FaPlayCircle />
                                            : <FaLock />
                                        }

                                    </span>

                                    <span className='text-sm font-medium text-gray-800'>
                                        {lecture.lectureTitle}
                                    </span>

                                </button>

                            ))
                        }

                    </div>

                </div>

                {/* Video Preview */}

                <div className='bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200'>

                    <div className='aspect-video w-full rounded-lg overflow-hidden bg-black flex items-center justify-center'>

                        {
                            selectedLecture?.videoUrl ? (

                                <video
                                 className='w-full h-full object-cover'
                                 src={selectedLecture?.videoUrl}
                                 controls
                                />

                            ) : (

                                <span className='text-white text-sm'>
                                    Select a free preview lecture
                                </span>

                            )
                        }

                    </div>

                </div>

            </div>

        </div>

    </div>
  )
}

export default ViewCourse