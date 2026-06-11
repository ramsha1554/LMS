import React from "react";
import { useNavigate } from "react-router-dom";
import { Code, Cpu, Database, ArrowRight } from "lucide-react";

function ExploreCourses() {
  const navigate = useNavigate();

  return (
    <div className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
            Explore Our Popular Courses
          </h2>
          <p className="text-neutral-500 text-sm">
            Learn modern skills from industry experts.
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
            <div className="h-[200px] bg-neutral-50 flex items-center justify-center border-b border-neutral-100">
              <Code className="w-10 h-10 text-neutral-400" />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-neutral-900">
                  MERN Stack Development
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Build full stack applications using MongoDB, Express, React and Node.js.
                </p>
              </div>

              <button
                className="w-full flex items-center justify-center gap-1 py-2 bg-black hover:bg-neutral-900 active:bg-neutral-800 text-white rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/allcourses")}
              >
                <span>Explore Course</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
            <div className="h-[200px] bg-neutral-50 flex items-center justify-center border-b border-neutral-100">
              <Cpu className="w-10 h-10 text-neutral-400" />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-neutral-900">
                  AI & Machine Learning
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Master AI tools and machine learning fundamentals.
                </p>
              </div>

              <button
                className="w-full flex items-center justify-center gap-1 py-2 bg-black hover:bg-neutral-900 active:bg-neutral-800 text-white rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/allcourses")}
              >
                <span>Explore Course</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
            <div className="h-[200px] bg-neutral-50 flex items-center justify-center border-b border-neutral-100">
              <Database className="w-10 h-10 text-neutral-400" />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-neutral-900">
                  Data Science Bootcamp
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Learn data analysis, visualization, and predictive modeling.
                </p>
              </div>

              <button
                className="w-full flex items-center justify-center gap-1 py-2 bg-black hover:bg-neutral-900 active:bg-neutral-800 text-white rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer"
                onClick={() => navigate("/allcourses")}
              >
                <span>Explore Course</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreCourses;

