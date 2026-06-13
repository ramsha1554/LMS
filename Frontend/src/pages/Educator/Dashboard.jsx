import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Users, DollarSign, PlusCircle } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);

  const totalEarning = creatorCourseData?.reduce((sum, course) => {
    return sum + (course.price || 0) * (course.enrolledStudents?.length || 0);
  }, 0) || 0;

  const totalStudents = creatorCourseData?.reduce((sum, course) => {
    return sum + (course.enrolledStudents?.length || 0);
  }, 0) || 0;

  const lectureChartData = creatorCourseData?.map((c) => ({
    name: (c.title?.slice(0, 12) || "Course") + "...",
    lectures: c.lectures?.length || 0,
  })) || [];

  const enrollChartData = creatorCourseData?.map((c) => ({
    name: (c.title?.slice(0, 12) || "Course") + "...",
    enrolled: c.enrolledStudents?.length || 0,
  })) || [];

  const avatarLetter = userData?.name?.charAt(0).toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="w-full h-[64px] bg-white border-b border-neutral-200 flex items-center px-6 gap-4 sticky top-0 z-10">
        <button
          onClick={() => navigate("/")}
          className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-neutral-600" />
        </button>
        <span className="text-sm font-semibold text-neutral-900">Educator Dashboard</span>
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => navigate("/educator/courses")}
            className="px-4 py-2 text-xs font-medium border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors"
          >
            My Courses
          </button>
          <button
            onClick={() => navigate("/createcourse")}
            className="px-4 py-2 text-xs font-medium bg-black text-white rounded-md hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Create Course
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          {userData?.photo ? (
            <img src={userData.photo} className="w-20 h-20 rounded-full object-cover border-2 border-neutral-200" alt="Educator" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
              {avatarLetter}
            </div>
          )}
          <div className="flex-1 text-center md:text-left space-y-1">
            <h1 className="text-xl font-bold text-neutral-900">Welcome back, {userData?.name || "Educator"} </h1>
            <p className="text-sm text-neutral-500">{userData?.description || "Start creating courses for your students."}</p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-neutral-200 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-neutral-700" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Total Courses</p>
              <p className="text-xl font-bold text-neutral-900">{creatorCourseData?.length || 0}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-neutral-700" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Total Students</p>
              <p className="text-xl font-bold text-neutral-900">{totalStudents}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-neutral-700" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Total Earnings</p>
              <p className="text-xl font-bold text-neutral-900">₹{totalEarning.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Lectures per Course</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={lectureChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="lectures" fill="#171717" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <h2 className="text-sm font-semibold text-neutral-900 mb-4">Students Enrolled</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={enrollChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="enrolled" fill="#171717" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
