import React from 'react'
import about from "../assets/about.jpg"

function About() {

  return (

    <div className='w-full py-[100px] bg-white'>

        <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>

            {/* Image */}

            <div>

                <img
                 src={about}
                 alt=""
                 className='w-full rounded-3xl shadow-lg'
                />

            </div>

            {/* Content */}

            <div className='space-y-6'>

                <h1 className='lg:text-[50px] text-[35px] font-bold text-[#03394b] leading-tight'>

                    Learn Without Limits And Grow Your Career

                </h1>

                <p className='text-gray-500 text-lg leading-relaxed'>

                    Our LMS platform helps students gain industry-level skills through expert-designed courses, real-world projects, and lifetime learning support.

                </p>

                <p className='text-gray-500 text-lg leading-relaxed'>

                    Whether you're starting your coding journey or upgrading your professional skills, we provide everything needed to succeed in the modern tech world.

                </p>

                <button className='bg-[#03394b] text-white px-8 py-3 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300'>

                    Learn More

                </button>

            </div>

        </div>

    </div>

  )

}

export default About