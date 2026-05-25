import React from 'react'
import { FaUserGraduate } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaLaptopCode } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";

function CardPage() {

  return (

    <div className='w-full py-[90px] bg-[#f5f7fa]'>

        <div className='max-w-7xl mx-auto px-6'>

            {/* Heading */}

            <div className='text-center mb-14'>

                <h1 className='lg:text-[50px] text-[35px] font-bold text-[#03394b]'>

                    Why Choose Our Platform

                </h1>

                <p className='text-gray-500 text-lg mt-4'>

                    Experience modern learning with expert guidance and lifetime support.

                </p>

            </div>

            {/* Cards */}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>

                <div className='bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center space-y-5'>

                    <FaUserGraduate className='w-[60px] h-[60px] mx-auto fill-[#03394b]' />

                    <h2 className='text-2xl font-semibold text-[#03394b]'>

                        Expert Mentors

                    </h2>

                    <p className='text-gray-500'>

                        Learn directly from industry professionals.

                    </p>

                </div>

                <div className='bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center space-y-5'>

                    <MdOutlineSupportAgent className='w-[60px] h-[60px] mx-auto fill-[#03394b]' />

                    <h2 className='text-2xl font-semibold text-[#03394b]'>

                        24/7 Support

                    </h2>

                    <p className='text-gray-500'>

                        Get continuous support throughout your learning journey.

                    </p>

                </div>

                <div className='bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center space-y-5'>

                    <FaLaptopCode className='w-[60px] h-[60px] mx-auto fill-[#03394b]' />

                    <h2 className='text-2xl font-semibold text-[#03394b]'>

                        Practical Projects

                    </h2>

                    <p className='text-gray-500'>

                        Build real-world projects and strengthen your portfolio.

                    </p>

                </div>

                <div className='bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center space-y-5'>

                    <RiSecurePaymentFill className='w-[60px] h-[60px] mx-auto fill-[#03394b]' />

                    <h2 className='text-2xl font-semibold text-[#03394b]'>

                        Secure Payments

                    </h2>

                    <p className='text-gray-500'>

                        Safe and secure payment integration with Razorpay.

                    </p>

                </div>

            </div>

        </div>

    </div>

  )

}

export default CardPage