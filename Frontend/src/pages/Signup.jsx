import React, { useState, useCallback } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react"; 

const logopng = '../assests/logopng.png';

function Signup({ onSignUp, onLoginRedirect }) {
  const [selectedRole, setSelectedRole] = useState('student');
  const handleRoleChange = useCallback((role) => {
    setSelectedRole(role);
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);
  const passwordType = showPassword ? 'text' : 'password';

  const preventDefault = (e) => e.preventDefault();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100 p-4">
      <div className="flex bg-white shadow-xl rounded-xl w-full max-w-lg overflow-hidden">
        <div className="w-full md:w-3/5 p-10 md:p-12">
          <div className="mb-6">
            <span className="text-xl font-semibold text-gray-800">let's get started</span>
            <span className="block text-sm text-gray-500 mt-1">Create your account</span>
          </div>

          <form className="space-y-4" onSubmit={preventDefault}>
            <div className="relative">
              <span className="block mb-1 text-sm font-medium text-gray-700">Name</span>
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 w-4 h-4" style={{ marginTop: '0.25rem' }} />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                className="w-full p-2 pl-9 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <span className="block mb-1 text-sm font-medium text-gray-700">Email</span>
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 w-4 h-4" style={{ marginTop: '0.25rem' }} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-2 pl-9 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <span className="block mb-1 text-sm font-medium text-gray-700">Password</span>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 w-4 h-4" style={{ marginTop: '0.25rem' }} />
              <input
                type={passwordType}
                id="password"
                name="password"
                placeholder="Your password"
                className="w-full p-2 pl-9 pr-10 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-transparent"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-900 hover:text-gray-700 transition-colors cursor-pointer focus:outline-none"
                style={{ marginTop: '0.25rem' }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            
            <div className="pt-2 flex justify-start space-x-2">
              <button
                type="button"
                onClick={() => handleRoleChange('student')}
                className={`px-4 py-2 text-sm rounded-md font-medium transition-colors ${
                  selectedRole === 'student'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('educator')}
                className={`px-4 py-2 text-sm rounded-md font-medium transition-colors ${
                  selectedRole === 'educator'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Educator
              </button>
            </div>
            
            <button
              type="submit"
              className="w-full bg-black text-white p-3 mt-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Sign Up
            </button>
          </form>
          
          <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Already have an account? </span>
            <button 
              type="button" 
              onClick={onLoginRedirect}
              className="text-black font-semibold hover:underline"
            >
              Login
            </button>
          </div>
        </div>

        <div className="relative hidden md:block md:w-2/5">
          <div className="h-full flex flex-col justify-center items-center bg-black text-white p-8 rounded-r-xl">
            <div className="flex flex-col items-center mb-2">
              <span className="text-3xl font-bold tracking-wider mb-2">SS</span> 
            </div>
            <span className="text-xs font-light tracking-widest uppercase">SKILL SYNC</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
