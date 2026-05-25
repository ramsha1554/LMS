import React from 'react'
import { useNavigate } from 'react-router-dom'

function ExploreCourses() {

    const navigate = useNavigate()

  return (

    <div className='w-full py-[80px] bg-white'>

        <div className='max-w-7xl mx-auto px-6'>

            {/* Heading */}

            <div className='text-center space-y-4 mb-12'>

                <h1 className='lg:text-[50px] text-[35px] font-bold text-[#03394b]'>

                    Explore Our Popular Courses

                </h1>

                <p className='text-gray-500 text-lg'>

                    Learn modern skills from industry experts.

                </p>

            </div>

            {/* Course Cards */}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

                <div className='bg-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300'>

                    <div className='h-[220px] bg-gray-300'></div>

                    <div className='p-6 space-y-3'>

                        <h2 className='text-2xl font-semibold text-[#03394b]'>

                            MERN Stack Development

                        </h2>

                        <p className='text-gray-500'>

                            Build full stack applications using MongoDB, Express, React and Node.js.

                        </p>

                        <button
                         className='mt-3 bg-[#03394b] text-white px-5 py-2 rounded-xl cursor-pointer'
                         onClick={()=>navigate("/allcourses")}
                        >

                            Explore

                        </button>

                    </div>

                </div>

                <div className='bg-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300'>

                    <div className='h-[220px] bg-gray-300'></div>

                    <div className='p-6 space-y-3'>

                        <h2 className='text-2xl font-semibold text-[#03394b]'>

                            AI & Machine Learning

                        </h2>

                        <p className='text-gray-500'>

                            Master AI tools and machine learning fundamentals.

                        </p>

                        <button
                         className='mt-3 bg-[#03394b] text-white px-5 py-2 rounded-xl cursor-pointer'
                         onClick={()=>navigate("/allcourses")}
                        >

                            Explore

                        </button>

                    </div>

                </div>

                <div className='bg-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300'>

                    <div className='h-[220px] bg-gray-300'></div>

                    <div className='p-6 space-y-3'>

                        <h2 className='text-2xl font-semibold text-[#03394b]'>

                            Data Science Bootcamp

                        </h2>

                        <p className='text-gray-500'>

                            Learn data analysis, visualization, and predictive modeling.

                        </p>

                        <button
                         className='mt-3 bg-[#03394b] text-white px-5 py-2 rounded-xl cursor-pointer'
                         onClick={()=>navigate("/allcourses")}
                        >

                            Explore

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>

  )

}

export default ExploreCourses