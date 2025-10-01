import React, { useState } from "react";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Step 1: Enter Email */}
      {step === 1 && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Forget Password</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-black"
                id="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
            >
              Send OTP
            </button>
          </form>
        </div>
      )}

      {/* Step 2: Verify OTP */}
      {step === 2 && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                Enter OTP
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-black"
                id="otp"
                type="text"
                placeholder="Enter the OTP sent to your email"
              />
            </div>

            <button
              type="button"
              onClick={() => setStep(3)}
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
            >
              Verify OTP
            </button>
          </form>
        </div>
      )}

      {/* Step 3: Reset Password */}
      {step === 3 && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-black"
                id="newPassword"
                type="password"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-black"
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="button"
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
            >
              Reset Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
