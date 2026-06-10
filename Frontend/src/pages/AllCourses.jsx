import React from "react";
import Nav from "../component/Nav";
import { useSelector } from "react-redux";
import Card from "../component/Card";
import usePublishedCourse from "../customHooks/usePublishedCourse";
import { BookOpen } from "lucide-react";

function AllCourses() {
  // FETCH COURSES
  usePublishedCourse();

  // REDUX STATE
  const { courseData = [] } = useSelector((state) => state.course || {});

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Nav />

      {/* Sidebar */}
      <aside className="w-[260px] h-screen bg-white border-r border-neutral-200 fixed top-0 left-0 pt-24 px-6 shadow-sm z-5 hidden md:block">
        <div className="space-y-6">
          <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
            Filter Courses
          </h2>

          <div className="space-y-4">
            <div>
              <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-2">
                Categories
              </span>
              <div className="space-y-2">
                {["Development", "Design", "Business", "Marketing"].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer hover:text-black transition-colors duration-150"
                  >
                    <input
                      type="checkbox"
                      className="rounded border-neutral-300 text-black focus:ring-black"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full pt-24 pb-16 px-6 md:pl-[286px]">
        {/* Heading */}
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-neutral-900">
            All Courses
          </h1>
          <span className="block text-xs text-neutral-500">
            Total Courses: {courseData?.length}
          </span>
        </div>

        {/* Empty State */}
        {courseData?.length === 0 && (
          <div className="mt-16 border border-dashed border-neutral-300 rounded-xl p-12 text-center max-w-md mx-auto flex flex-col items-center justify-center space-y-4 bg-white shadow-sm">
            <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100 text-neutral-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-neutral-900">
                No Courses Available
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Check back later or contact support to learn when new courses will be published.
              </p>
            </div>
          </div>
        )}

        {/* Courses */}
        <div className="flex flex-wrap gap-6 mt-8">
          {courseData?.map((course, index) => (
            <Card key={index} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default AllCourses;
