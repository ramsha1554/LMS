import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Profile() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-12 flex items-center justify-center">
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-8 max-w-md w-full flex flex-col space-y-6">
        {/* Back Button */}
        <div>
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 hover:text-black flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-black"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card Header */}
        <div className="flex flex-col items-center text-center">
          {userData?.photoUrl ? (
            <img
              src={userData?.photoUrl}
              className="w-20 h-20 rounded-full object-cover border border-neutral-200 shadow-sm"
              alt={userData?.name || "Profile avatar"}
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-neutral-950 flex items-center justify-center text-white text-lg font-bold border border-neutral-800 uppercase shadow-inner">
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}
          <h2 className="text-base font-bold mt-4 text-neutral-900 leading-snug">
            {userData?.name}
          </h2>
          <span className="block mt-1 text-[10px] font-bold text-neutral-400 uppercase tracking-widest bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
            {userData?.role || "Student"}
          </span>
        </div>

        {/* Profile Metadata List */}
        <div className="border-t border-neutral-100 pt-6 space-y-3.5 text-xs text-neutral-600">
          <div className="flex items-center justify-between py-2 border-b border-neutral-50">
            <span className="font-medium text-neutral-400 uppercase tracking-wider">
              Email Address
            </span>
            <span className="text-neutral-900 font-semibold truncate max-w-[200px]">
              {userData?.email}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-neutral-50">
            <span className="font-medium text-neutral-400 uppercase tracking-wider">
              Enrolled Courses
            </span>
            <span className="text-neutral-900 font-semibold">
              {userData?.enrolledCourses?.length || 0}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 py-2">
            <span className="font-medium text-neutral-400 uppercase tracking-wider">
              Bio / Description
            </span>
            <p className="text-neutral-600 mt-1 leading-relaxed">
              {userData?.description ? (
                userData.description
              ) : (
                <span className="text-neutral-400 italic">
                  No bio description provided yet.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            className="w-full py-2.5 bg-black hover:bg-neutral-900 active:bg-neutral-800 text-white rounded-md text-xs font-semibold transition-colors duration-200 cursor-pointer shadow-sm"
            onClick={() => navigate("/editprofile")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;