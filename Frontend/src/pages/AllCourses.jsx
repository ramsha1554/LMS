import React from 'react'

import Nav from '../component/Nav'

import { useSelector } from 'react-redux'

import Card from '../component/Card'

import getPublishedCourse from "../customHooks/getPublishedCourse"

function AllCourses() {

  // FETCH COURSES

  getPublishedCourse()

  // REDUX STATE

  const { courseData = [] } = useSelector(
    state => state.course || {}
  )

  return (

    <div className='flex min-h-screen bg-gray-50'>

      <Nav />

      {/* Sidebar */}

      <aside className='w-[260px] h-screen bg-black fixed top-0 left-0 py-[130px] px-6'>

        <h2 className='text-white text-2xl font-bold'>

          Filter Courses

        </h2>

      </aside>

      {/* Main Content */}

      <main className='w-full py-[130px] px-[20px] md:pl-[300px]'>

        {/* Heading */}

        <h1 className='text-3xl font-bold'>

          All Courses

        </h1>

        {/* Total Courses */}

        <p className='mt-3 text-gray-600'>

          Total Courses: {courseData?.length}

        </p>

        {/* Empty State */}

        {
          courseData?.length === 0 && (

            <div className='mt-16 text-3xl font-semibold text-gray-400'>

              No Courses Available

            </div>

          )
        }

        {/* Courses */}

        <div className='flex flex-wrap gap-6 mt-10'>

          {
            courseData?.map((course, index) => (

              <Card
                key={index}
                course={course}
              />

            ))
          }

        </div>

      </main>

    </div>
  )
}

export default AllCourses