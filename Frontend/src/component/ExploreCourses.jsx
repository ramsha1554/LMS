import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const courses = [
  {
    title: "MERN Stack Development",
    description: "Build full stack applications using MongoDB, Express, React and Node.js.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop",
    category: "Web Development",
  },
  {
    title: "AI & Machine Learning",
    description: "Master AI tools and machine learning fundamentals.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop",
    category: "AI/ML",
  },
  {
    title: "Data Science Bootcamp",
    description: "Learn data analysis, visualization, and predictive modeling.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    category: "Data Science",
  },
];

function ExploreCourses() {
  const navigate = useNavigate();

  return (
    <div className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
            Explore Our Popular Courses
          </h2>
          <p className="text-neutral-500 text-sm">
            Learn modern skills from industry experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              <div className="h-[200px] overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {course.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <button
                  className="w-full flex items-center justify-center gap-1 py-2 bg-black hover:bg-neutral-900 active:bg-neutral-800 text-white rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer"
                  onClick={() => navigate(`/allcourses?search=${encodeURIComponent(course.title)}`)}
                >
                  <span>Explore Course</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreCourses;
