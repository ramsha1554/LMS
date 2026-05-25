import React from 'react'
import Nav from '../component/Nav'
import { useSelector } from 'react-redux'
import Card from '../component/Card'

function AllCourses() {

  const { courseData } = useSelector(state => state.course)

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Nav />

      <main className='w-full py-[130px] px-[20px]'>

        <h1 className='text-3xl font-bold'>
          All Courses
        </h1>

        <p className='mt-3 text-gray-600'>
          Total Courses: {courseData?.length}
        </p>

        <div className='flex flex-wrap gap-6 mt-10'>
          {
            courseData?.map((course, index) => (
              <Card
                key={index}
                title={course.title}
                category={course.category}
                thumbnail={course.thumbnail}
                price={course.price}
              />
            ))
          }
        </div>

      </main>
    </div>
  )
}

export default AllCourses