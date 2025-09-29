import  React,  { useState, } from "react";

import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
const [step, setStep] = useState(1);
const [email, setEmail] = useState("");
const [otp, setOtp] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const navigate = useNavigate();

    return <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

{ step === 1 && <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">


    <h2 className="text-2xl font-bold mb-6 text-center">Forget Password</h2>
    <form className="space-y-4"> 
<div>

        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
        </label>
        <input

            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-none focus-ring-1 focus:ring-black"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}

            onChange={(e) => setEmail(e.target.value)}
            required
        />

</div>

<button className="w-full bg-black text-white py-2 px-4 rounded hover:bg[#4b4b4b]transition-colors">
            Send OTP
            </button>
        </form>
<div className="mt-4 text-center"
onClick={()=>{
    navigate("/login");
}}>
Back to Login

</div>

</div>}


{ step === 2 && <div></div>}



{ step === 3 && <div></div>}




    </div>;





  };
  export default ForgetPassword;