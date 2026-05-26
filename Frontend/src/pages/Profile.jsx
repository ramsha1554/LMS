import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

function Profile() {
    const navigate = useNavigate()

    return (
        <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
            <div className='bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative'>
                <FaArrowLeftLong className='absolute top-[8%] left-[5%] w-[22px] h-[22px] cursor-pointer'
                    onClick={() => navigate("/")} />
            </div>
        </div>
    )
}

export default Profile