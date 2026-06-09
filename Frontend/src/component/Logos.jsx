import React from "react";
import { BookOpen, Unlock, CreditCard, HelpCircle, Users } from "lucide-react";

function Logos() {
  return (
    <div className="w-full min-h-[90px] flex items-center justify-center flex-wrap gap-4 py-8 bg-neutral-50 border-b border-neutral-150">
      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full cursor-pointer text-neutral-800 text-sm font-medium hover:bg-neutral-50 transition-colors duration-200 shadow-sm">
        <BookOpen className="w-4 h-4 text-neutral-900" />
        <span>20k+ Online Courses</span>
      </div>

      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full cursor-pointer text-neutral-800 text-sm font-medium hover:bg-neutral-50 transition-colors duration-200 shadow-sm">
        <Unlock className="w-4 h-4 text-neutral-900" />
        <span>Lifetime Access</span>
      </div>

      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full cursor-pointer text-neutral-800 text-sm font-medium hover:bg-neutral-50 transition-colors duration-200 shadow-sm">
        <CreditCard className="w-4 h-4 text-neutral-900" />
        <span>Value for Money</span>
      </div>

      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full cursor-pointer text-neutral-800 text-sm font-medium hover:bg-neutral-50 transition-colors duration-200 shadow-sm">
        <HelpCircle className="w-4 h-4 text-neutral-900" />
        <span>Lifetime Support</span>
      </div>

      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full cursor-pointer text-neutral-800 text-sm font-medium hover:bg-neutral-50 transition-colors duration-200 shadow-sm">
        <Users className="w-4 h-4 text-neutral-900" />
        <span>Community Support</span>
      </div>
    </div>
  );
}

export default Logos;