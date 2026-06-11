import React, { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../lib/axiosClient.js";
import { setUserData } from "../redux/userSlice.js";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axiosClient.get("/api/auth/logout");
      dispatch(setUserData(null));
      toast.success("Logout Successful!", {
        position: "top-right", autoClose: 3000,
        style: { background: "#171717", color: "#fff", fontSize: "14px", borderRadius: "6px" },
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout Failed!", {
        position: "top-right", autoClose: 3000,
        style: { background: "#171717", color: "#fff", fontSize: "14px", borderRadius: "6px" },
      });
    }
  };

  const isEducator = userData?.role === "educator";

  return (
    <nav className="w-full h-[70px] bg-white text-neutral-800 flex justify-between items-center px-8 fixed top-0 left-0 z-10 border-b border-neutral-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">SS</div>
        <h1 className="text-xl font-bold tracking-wider text-black">SKILL SYNC</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          >
            {userData?.photoUrl ? (
              <img src={userData.photoUrl} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <User className="w-5 h-5" />
            )}
          </button>

          <div className={`absolute right-0 mt-2 w-44 bg-white border border-neutral-200 shadow-xl rounded-xl overflow-hidden transform transition-all duration-200 origin-top ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}>
            {userData ? (
              <>
                {isEducator ? (
                  <button
                    onClick={() => { setOpen(false); navigate("/educator/courses"); }}
                    className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors duration-200"
                  >
                    My Courses
                  </button>
                ) : (
                  <button
                    onClick={() => { setOpen(false); navigate("/mycourses"); }}
                    className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors duration-200"
                  >
                    My Courses
                  </button>
                )}
                <button
                  onClick={() => { setOpen(false); navigate("/profile"); }}
                  className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors duration-200"
                >
                  My Profile
                </button>
              </>
            ) : (
              <button
                onClick={() => { setOpen(false); navigate("/login"); }}
                className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors duration-200"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {isEducator && (
          <button
            onClick={() => navigate("/educator/dashboard")}
            className="px-4 py-2 bg-black hover:bg-neutral-900 text-white rounded-md text-sm font-medium transition-colors duration-200"
          >
            Dashboard
          </button>
        )}

        {!userData ? (
          <button
            className="px-4 py-2 bg-black hover:bg-neutral-900 text-white rounded-md text-sm font-medium transition-colors duration-200"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-black hover:bg-neutral-900 text-white rounded-md text-sm font-medium transition-colors duration-200"
            onClick={handleLogout}
          >
            LogOut
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
