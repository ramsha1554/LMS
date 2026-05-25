import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Footer() {

  return (

    <div className='w-full bg-[#03394b] text-white py-[70px]'>

        <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>

            {/* Brand */}

            <div className='space-y-5'>

                <h1 className='text-3xl font-bold'>

                    LMS Platform

                </h1>

                <p className='text-gray-300 leading-relaxed'>

                    Learn modern skills with industry-ready courses and expert mentorship.

                </p>

            </div>

            {/* Quick Links */}

            <div className='space-y-5'>

                <h2 className='text-2xl font-semibold'>

                    Quick Links

                </h2>

                <div className='flex flex-col gap-3 text-gray-300'>

                    <span className='cursor-pointer hover:text-white'>
                        Home
                    </span>

                    <span className='cursor-pointer hover:text-white'>
                        Courses
                    </span>

                    <span className='cursor-pointer hover:text-white'>
                        About
                    </span>

                    <span className='cursor-pointer hover:text-white'>
                        Contact
                    </span>

                </div>

            </div>

            {/* Support */}

            <div className='space-y-5'>

                <h2 className='text-2xl font-semibold'>

                    Support

                </h2>

                <div className='flex flex-col gap-3 text-gray-300'>

                    <span className='cursor-pointer hover:text-white'>
                        Help Center
                    </span>

                    <span className='cursor-pointer hover:text-white'>
                        Privacy Policy
                    </span>

                    <span className='cursor-pointer hover:text-white'>
                        Terms & Conditions
                    </span>

                </div>

            </div>

            {/* Socials */}

            <div className='space-y-5'>

                <h2 className='text-2xl font-semibold'>

                    Follow Us

                </h2>

                <div className='flex gap-5'>

                    <FaGithub className='w-[35px] h-[35px] cursor-pointer hover:scale-110 transition-all duration-300' />

                    <FaLinkedin className='w-[35px] h-[35px] cursor-pointer hover:scale-110 transition-all duration-300' />

                    <FaInstagram className='w-[35px] h-[35px] cursor-pointer hover:scale-110 transition-all duration-300' />

                </div>

            </div>

        </div>

        {/* Bottom */}

        <div className='border-t border-gray-500 mt-12 pt-6 text-center text-gray-300'>

            © 2026 LMS Platform. All rights reserved.

        </div>

    </div>

  )

}

export default Footer