import React, { useState, useCallback } from 'react';
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

function Login({ onSignUpRedirect }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);
  const passwordType = showPassword ? 'text' : 'password';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", form);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100 p-4">
      <div className="flex bg-white shadow-xl rounded-xl w-full max-w-lg overflow-hidden">
        <div className="w-full md:w-3/5 p-10 md:p-12">
          <div className="mb-6">
            <span className="text-xl font-semibold text-gray-800">Welcome Back</span>
            <span className="block text-sm text-gray-500 mt-1">Login to your account</span>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <span className="block mb-1 text-sm font-medium text-gray-700">Email</span>
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 w-4 h-4" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 pl-9 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div className="relative">
              <span className="block mb-1 text-sm font-medium text-gray-700">Password</span>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 w-4 h-4" />
              <input
                type={passwordType}
                id="password"
                name="password"
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
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

            <div className="text-right pt-1">
              <button type="button" className="text-sm text-gray-600 hover:underline">
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="w-full bg-black text-white p-3 mt-4 rounded-md">
              Login
            </button>
          </form>

          <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Don't have an account? </span>
            <button type="button" onClick={onSignUpRedirect} className="text-black font-semibold hover:underline">
              Sign Up
            </button>
          </div>
        </div>

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

export default Login;
