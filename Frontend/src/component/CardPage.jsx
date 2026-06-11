import React from "react";
import { GraduationCap, LifeBuoy, Laptop, ShieldCheck } from "lucide-react";

function CardPage() {
  return (
    <div className="w-full py-20 bg-neutral-50 border-b border-neutral-150">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
            Why Choose Our Platform
          </h2>
          <p className="text-neutral-500 text-sm">
            Experience modern learning with expert guidance and lifetime support.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 text-center flex flex-col items-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100">
              <GraduationCap className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-900">
              Expert Mentors
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Learn directly from industry professionals.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 text-center flex flex-col items-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100">
              <LifeBuoy className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-900">
              24/7 Support
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Get continuous support throughout your learning journey.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 text-center flex flex-col items-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100">
              <Laptop className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-900">
              Practical Projects
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Build real-world projects and strengthen your portfolio.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 text-center flex flex-col items-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100">
              <ShieldCheck className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-900">
              Secure Payments
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Safe and secure payment integration with Razorpay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPage;

