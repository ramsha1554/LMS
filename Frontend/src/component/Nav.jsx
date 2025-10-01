import React, { useState, useRef, useEffect } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { setUserData } from "../redux/userSlice.js";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close dropdown when clicking outside
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
      const res = await axios.get("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      toast.success("Logout Successful!", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: "#4caf50",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "16px",
          borderRadius: "10px",
        },
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout Failed!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <nav className="w-full h-[70px] bg-white text-gray-800 flex justify-between items-center px-8 fixed top-0 left-0 z-10 border-b border-gray-200">
      {/* LEFT SIDE: Logo + Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
          SS
        </div>
        <h1 className="text-xl font-bold tracking-wider text-black">
          SKILL SYNC
        </h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">
        {/* Profile Menu */}
        <div className="relative" ref={menuRef}>
          <IoPersonCircle
            className="w-10 h-10 cursor-pointer text-gray-600 hover:text-black transition-colors"
            onClick={() => setOpen(!open)}
          />

          {/* Smooth Dropdown */}
          <div
            className={`absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg overflow-hidden 
              transform transition-all duration-200 origin-top
              ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
          >
            <button
              onClick={() => {
                setOpen(false);
                navigate("/courses");
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 transition"
            >
               Courses
            </button>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 transition"
            >
             My Profile
            </button>
          </div>
        </div>

        {/* Educator Dashboard */}
        {userData?.role === "educator" && (
          <button className="px-4 py-2 bg-black text-white rounded-md font-semibold transition-colors">
            Dashboard
          </button>
        )}

        {/* Auth Buttons */}
        {!userData ? (
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded-md font-semibold hover:bg-black transition-colors"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded-md font-semibold hover:bg-black transition-colors"
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

