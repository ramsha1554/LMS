import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import img from "../assets/empty.jpg";
import usePublishedCourse from '../customHooks/usePublishedCourse';
import axiosClient from '../lib/axiosClient';
import { setUserData } from '../redux/userSlice';
import { useEffect } from 'react';

function EnrolledCourses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseData } = useSelector(state => state.course);
  const { userData } = useSelector(state => state.user);

  usePublishedCourse();

  // Re-fetch user to get latest enrolledCourses from DB
  useEffect(() => {
    const refreshUser = async () => {
      try {
        const res = await axiosClient.get("/api/user/getcurrentuser");
        dispatch(setUserData(res.data.user));
      } catch (e) {
        console.log(e);
      }
    };
    refreshUser();
  }, [dispatch]);

  const enrolledCourses = courseData?.filter(course =>
    userData?.enrolledCourses?.some(
      id => id === course._id || id?._id === course._id
    )
  ) ?? [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Learning</h1>
        {enrolledCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <p className="text-lg font-medium">You haven't enrolled in any courses yet.</p>
            <button
              onClick={() => navigate('/allcourses')}
              className="mt-4 bg-black text-white px-6 py-2 rounded-lg text-sm"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200"
                onClick={() => { if (course?.lectures?.length > 0) { navigate(`/viewlecture/${course.lectures[0]._id}`); } else { alert("This course has no lectures yet."); } }}
              >
                <img src={course?.thumbnail || img} alt="" className="w-full h-[200px] object-cover" />
                <div className="p-5 space-y-2">
                  <h2 className="text-xl font-semibold">{course?.title}</h2>
                  <p className="text-gray-500 text-sm">{course?.category}</p>
                  <div className="space-y-3 pt-2">
                    <span className="text-sm text-gray-500">{course?.lectures?.length || 0} Lectures</span>
                    <button
                      className="bg-black text-white px-4 py-2 rounded-lg text-sm w-full"
                      onClick={(e) => { e.stopPropagation(); if (course?.lectures?.length > 0) { navigate(`/viewlecture/${course.lectures[0]._id}`); } else { alert("This course has no lectures yet."); } }}
                    >
                      Continue Learning
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EnrolledCourses;


