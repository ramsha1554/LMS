import React from 'react'

function ReviewPage() {

  return (

    <div className='w-full py-[100px] bg-[#f5f7fa]'>

        <div className='max-w-7xl mx-auto px-6'>

            {/* Heading */}

            <div className='text-center mb-14'>

                <h1 className='lg:text-[50px] text-[35px] font-bold text-[#03394b]'>

                    What Our Students Say

                </h1>

                <p className='text-gray-500 text-lg mt-4'>

                    Thousands of students trust our learning platform.

                </p>

            </div>

            {/* Reviews */}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

                <div className='bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 space-y-5'>

                    <p className='text-gray-500 leading-relaxed'>

                        This LMS completely changed my learning experience. The courses are practical and beginner friendly.

                    </p>

                    <div>

                        <h2 className='text-xl font-semibold text-[#03394b]'>

                            Syeda Ramsha

                        </h2>

                        <span className='text-gray-400'>

                            MERN Stack Student

                        </span>

                    </div>

                </div>

                <div className='bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 space-y-5'>

                    <p className='text-gray-500 leading-relaxed'>

                        The mentorship and support system helped me build confidence and real-world projects.

                    </p>

                    <div>

                        <h2 className='text-xl font-semibold text-[#03394b]'>

                            Alex Johnson

                        </h2>

                        <span className='text-gray-400'>

                            Full Stack Developer

                        </span>

                    </div>

                </div>

                <div className='bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 space-y-5'>

                    <p className='text-gray-500 leading-relaxed'>

                        One of the best online learning experiences with structured content and lifetime access.

                    </p>

                    <div>

                        <h2 className='text-xl font-semibold text-[#03394b]'>

                            Priya Sharma

                        </h2>

                        <span className='text-gray-400'>

                            Data Science Learner

                        </span>

                    </div>

                </div>

            </div>

        </div>

    </div>

  )

}

export default ReviewPage