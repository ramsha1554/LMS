import React from "react";

const RouteFallback = ({ label = "Loading..." }) => {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center p-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 text-neutral-800 text-sm">
          <span
            aria-hidden
            className="w-2.5 h-2.5 rounded-full bg-neutral-800 animate-pulse"
          />
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
};

export default RouteFallback;

