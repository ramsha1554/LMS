import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../lib/axiosClient";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) { toast.error("Please enter your email"); return; }
    setLoading(true);
    try {
      const { data } = await axiosClient.post("/api/auth/sendotp", { email });
      toast.success(data.message || "OTP sent to your email");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) { toast.error("Please enter the OTP"); return; }
    setLoading(true);
    try {
      const { data } = await axiosClient.post("/api/auth/verifyotp", { email, otp });
      toast.success(data.message || "OTP verified");
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) { toast.error("Please fill all fields"); return; }
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }
    if (newPassword.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const { data } = await axiosClient.post("/api/auth/resetpassword", { email, newPassword });
      toast.success(data.message || "Password reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">SS</div>
        <span className="text-sm font-bold text-black tracking-wider">SKILL SYNC</span>
      </div>

      {/* Step 1: Enter Email */}
      {step === 1 && (
        <div className="bg-white border border-neutral-200 shadow-xl rounded-xl p-10 md:p-12 w-full max-w-md flex flex-col space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Forgot Password</h2>
            <p className="text-xs text-neutral-400">Enter your email address to receive a verification OTP.</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1" htmlFor="email">Email Address</label>
              <input
                className="w-full p-2.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950 transition-all duration-200 shadow-sm"
                id="email" type="email" placeholder="Enter your email"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pt-2">
              <button type="button" onClick={handleSendOtp} disabled={loading}
                className="w-full bg-black hover:bg-neutral-900 text-white py-2.5 rounded-md text-xs font-semibold transition-colors duration-200 cursor-pointer shadow-sm disabled:opacity-50">
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </div>
          <div className="text-center pt-2">
            <button onClick={() => navigate("/login")} className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-black transition-colors duration-200">
              <ArrowLeft className="w-3.5 h-3.5" /><span>Back to Login</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Verify OTP */}
      {step === 2 && (
        <div className="bg-white border border-neutral-200 shadow-xl rounded-xl p-10 md:p-12 w-full max-w-md flex flex-col space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Verify OTP</h2>
            <p className="text-xs text-neutral-400">Enter the security code sent to {email}.</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1" htmlFor="otp">Enter OTP</label>
              <input
                className="w-full p-2.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950 transition-all duration-200 shadow-sm text-center tracking-widest font-mono font-bold"
                id="otp" type="text" maxLength={6} placeholder="0 0 0 0 0 0"
                value={otp} onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="pt-2">
              <button type="button" onClick={handleVerifyOtp} disabled={loading}
                className="w-full bg-black hover:bg-neutral-900 text-white py-2.5 rounded-md text-xs font-semibold transition-colors duration-200 cursor-pointer shadow-sm disabled:opacity-50">
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
          <div className="text-center pt-2">
            <button onClick={() => { setStep(1); setOtp(""); }} className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-black transition-colors duration-200">
              <ArrowLeft className="w-3.5 h-3.5" /><span>Resend OTP / Back</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Reset Password */}
      {step === 3 && (
        <div className="bg-white border border-neutral-200 shadow-xl rounded-xl p-10 md:p-12 w-full max-w-md flex flex-col space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Reset Password</h2>
            <p className="text-xs text-neutral-400">Create a new secure password for your account.</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1" htmlFor="newPassword">New Password</label>
              <input
                className="w-full p-2.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950 transition-all duration-200 shadow-sm"
                id="newPassword" type="password" placeholder="Enter new password"
                value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1" htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="w-full p-2.5 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950 transition-all duration-200 shadow-sm"
                id="confirmPassword" type="password" placeholder="Confirm new password"
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="pt-2">
              <button type="button" onClick={handleResetPassword} disabled={loading}
                className="w-full bg-black hover:bg-neutral-900 text-white py-2.5 rounded-md text-xs font-semibold transition-colors duration-200 cursor-pointer shadow-sm disabled:opacity-50">
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;


