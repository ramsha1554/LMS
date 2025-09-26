


import logopng from '../assets/logopng.png';



function Login() {
  return (
    // Main container with a light gray background, covering the full screen
    <div className="flex items-center justify-center min-h-screen bg-[#F0F2F5]">

      {/* Card container with shadow, rounded corners, and flex layout */}
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        
        {/* Left Side (Form) */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome!</span>
          <span className="font-light text-gray-400 mb-8">
      Enter your details to Login to your account.
          </span>
          
          <form  onSubmit={(e) => e.preventDefault()}>
         

            {/* Email Input */}
            <div className="py-4">
              <span className="mb-2 text-md">Email</span>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            
            {/* Password Input */}
            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                name="pass"
                id="pass"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                placeholder="Enter your password"
              />
            </div>
            
            {/* Remember Me Checkbox */}
            <div className="flex justify-between w-full py-4">
              <div className="mr-24">
                <input type="checkbox" name="ch" id="ch" className="mr-2" />
                <span className="text-md">Remember for</span>
              </div>
            </div>
            
            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300 transition-colors"
            >
           Login
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center text-gray-400">
         Don't have an account?
            <a href="/signup" className="font-bold text-black ml-1 hover:underline">Sign Up</a>
          </div>
        </div>
        
  
        <div className="relative hidden md:block">
          <div className="w-[400px] h-full flex flex-col justify-center items-center bg-black text-white rounded-r-2xl p-8 text-center">
            {/* Your Logo */}
       
            <img src={logopng} alt="Logo" className="w-20 h-20 mb-4" />  
            <span className="text-4xl font-extrabold">Skill Sync</span>
            <p className="mt-3 text-gray-300">Unlock your potential with our expert-led online courses.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;