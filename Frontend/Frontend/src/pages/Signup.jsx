import React from 'react';
import { Mail, Lock, User, Eye , EyeOff} from "lucide-react"; 
import axios from 'axios';
import { useState , useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import { useDispatch } from 'react-redux';
import { setUserData } from "../redux/userSlice.js";

import { toast } from "react-toastify";
function Signup() {
const dispatch = useDispatch();


    const navigate = useNavigate(); // initialize useNavigate
const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' // default role
  });

const handleChange = (e) =>{
  setFormData(
    {
      ...formData,
      [e.target.name]: e.target.value


    }
  )

}

const handleSubmit = async (e) => {   
  e.preventDefault();
    console.log("Submitting formData:", formData); 
  try {
    const res = await axios.post("http://localhost:3000/api/auth/signup", formData);


toast.success("Signup Successful!", {     
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false, 
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  style: {
    background: "#4caf50",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    borderRadius: "10px",
  },
});

 dispatch(setUserData(res.data.user));
    navigate('/login'); // redirect to login page after successful signup
  } catch (err) {
    alert(err.response?.data?.message || "Error occurred");
  }
};

const handleRoleChange = (role) => {
  setFormData(prev => ({
    ...prev,
    role: role
  }));
};



  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);
  const passwordType = showPassword ? 'text' : 'password';


  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100 p-4">
      <div className="flex bg-white shadow-xl rounded-xl w-full max-w-lg overflow-hidden">
        <div className="w-full md:w-3/5 p-10 md:p-12">
          <div className="mb-6">
            <span className="text-xl font-semibold text-gray-800">Let's get started</span>
            <span className="block text-sm text-gray-500 mt-1">Create your account</span>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="relative">
              <span className="block mb-1 text-sm font-medium text-gray-700">Name</span>
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 w-4 h-4" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full p-2 pl-9 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-900"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <span className="block mb-1 text-sm font-medium text-gray-700">Email</span>
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 w-4 h-4" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-2 pl-9 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-900"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <span className="block mb-1 text-sm font-medium text-gray-700">Password</span>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 w-4 h-4" />
              <input
                type={passwordType}    // important
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                className="w-full p-2 pl-9 pr-10 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-900"
              />
               <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-900"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Role buttons */}
            <div className="pt-2 flex justify-start space-x-2">
              <button type="button" 
              onClick={() => handleRoleChange('student')}
            className={`px-4 py-2 text-sm rounded-md font-medium border ${
      formData.role === 'student' ? 'bg-black text-white' : 'bg-white text-gray-700'
    }`}>
                Student
              </button>
              <button type="button"
              onClick={() => handleRoleChange('educator')}
                className={`px-4 py-2 text-sm rounded-md font-medium border ${
      formData.role === 'educator' ? 'bg-black text-white' : 'bg-white text-gray-700'
    }`}>
                Educator
              </button>
            </div>

            {/* Submit */}
            <button type="submit" className="w-full bg-black text-white p-3 mt-4 rounded-md">
              Sign Up
            </button>
          </form>

          {/* Login redirect */}
          <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Already have an account? </span>
            <button type="button" className="text-black font-semibold hover:underline"
            onClick={() => navigate('/login')} // navigate to login page
            >
              Login
            </button>
          </div>
        </div>

        {/* Right side brand section */}
        <div className="hidden md:flex md:w-2/5 justify-center items-center bg-black text-white rounded-r-xl">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold mb-2">SS</span>
            <span className="text-xs tracking-widest">SKILL SYNC</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
