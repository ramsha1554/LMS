import React from "react";
import about from "../assets/about.jpg";

function About() {
  return (
    <div className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div>
          <img
            src={about}
            alt="About us"
            className="w-full rounded-xl border border-neutral-200 shadow-sm"
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 leading-tight">
            Learn Without Limits And Grow Your Career
          </h2>

          <div className="space-y-4">
            <p className="text-neutral-500 text-sm leading-relaxed">
              Our LMS platform helps students gain industry-level skills through expert-designed courses, real-world projects, and lifetime learning support.
            </p>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Whether you're starting your coding journey or upgrading your professional skills, we provide everything needed to succeed in the modern tech world.
            </p>
          </div>

          <button className="px-6 py-2.5 bg-black hover:bg-neutral-900 active:bg-neutral-800 text-white rounded-md text-xs font-medium transition-colors duration-200 cursor-pointer">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;