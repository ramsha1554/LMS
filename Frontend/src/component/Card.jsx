import React from "react";
import { useNavigate } from "react-router-dom";
import empty from "../assets/empty.jpg";
import { Star } from "lucide-react";

function Card({ course }) {
  const navigate = useNavigate();

  return (
    <div
      className="group w-[320px] bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col"
      onClick={() => navigate(`/course/${course?._id}`)}
    >
      {/* Thumbnail */}
      <div className="w-full h-[180px] overflow-hidden bg-neutral-100 border-b border-neutral-100">
        <img
          src={course?.thumbnail || empty}
          alt={course?.title || "Course thumbnail"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Category */}
          <div className="flex">
            <span className="bg-neutral-100 text-neutral-800 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-neutral-200">
              {course?.category || "Development"}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-neutral-900 line-clamp-2 min-h-[40px] leading-snug">
            {course?.title}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
            {course?.subTitle || "Learn modern development with practical real-world projects."}
          </p>
        </div>

        {/* Reviews & Bottom */}
        <div className="space-y-3 pt-2 border-t border-neutral-100">
          {/* Reviews */}
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-semibold text-neutral-800">4.8</span>
            <span className="text-neutral-400 text-xs">
              ({course?.reviews?.length || 0} reviews)
            </span>
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-bold text-neutral-900">
              ₹{course?.price ?? 0}
            </span>
            <button className="bg-black hover:bg-neutral-900 active:bg-neutral-800 text-white px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer">
              View Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
