import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

function Dashboard() {
    const navigate = useNavigate()

    return (
        <div className='flex min-h-screen bg-gray-100'>
            <FaArrowLeftLong className='w-[22px] absolute top-[10%] left-[10%] h-[22px] cursor-pointer'
                onClick={() => navigate("/")} />
            <div className='w-full px-6 py-10 bg-gray-50 space-y-10'>
            </div>
        </div>
    )
}

export default Dashboard