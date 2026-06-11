import React from "react";

function ReviewPage() {
  return (
    <div className="w-full py-20 bg-neutral-50 border-t border-neutral-150">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
            What Our Students Say
          </h2>
          <p className="text-neutral-500 text-sm">
            Thousands of students trust our learning platform.
          </p>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Review 1 */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between space-y-6">
            <p className="text-xs text-neutral-600 leading-relaxed italic">
              "This LMS completely changed my learning experience. The courses are practical and beginner friendly."
            </p>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">
                Syeda Ramsha
              </h4>
              <span className="text-xs text-neutral-400 font-medium">
                MERN Stack Student
              </span>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between space-y-6">
            <p className="text-xs text-neutral-600 leading-relaxed italic">
              "The mentorship and support system helped me build confidence and real-world projects."
            </p>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">
                Alex Johnson
              </h4>
              <span className="text-xs text-neutral-400 font-medium">
                Full Stack Developer
              </span>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between space-y-6">
            <p className="text-xs text-neutral-600 leading-relaxed italic">
              "One of the best online learning experiences with structured content and lifetime access."
            </p>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">
                Priya Sharma
              </h4>
              <span className="text-xs text-neutral-400 font-medium">
                Data Science Learner
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;

