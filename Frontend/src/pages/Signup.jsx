import logopng from '../assets/logopng.png'; 

function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-200">
      
      {/* Main Card */}
      <div className="flex bg-white shadow-lg rounded-xl w-full max-w-3xl overflow-hidden">
        
    
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-2xl font-semibold text-gray-900">let's get started</span>
            <span className="block text-sm text-gray-500 mt-1">Create your account</span>
          </div>

          <form className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="pass" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="pass"
                name="pass"
                placeholder="Your password"
                className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Student / Educator */}
            <div className="pt-2">
              <div className="flex bg-white rounded-md border border-gray-300 overflow-hidden">
                <label htmlFor="student" className="flex-1 cursor-pointer">
                  <input type="radio" id="student" name="role" value="student" className="hidden peer" defaultChecked />
                  <span className="block w-full text-center py-2 text-sm text-gray-600 peer-checked:bg-black peer-checked:text-white transition-colors">
                    Student
                  </span>
                </label>
                <label htmlFor="educator" className="flex-1 cursor-pointer">
                  <input type="radio" id="educator" name="role" value="educator" className="hidden peer" />
                  <span className="block w-full text-center py-2 text-sm text-gray-600 peer-checked:bg-black peer-checked:text-white transition-colors">
                    Educator
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white p-3 mt-4 rounded-md font-semibold hover:bg-gray-800 transition-colors"
            >
              SignUp
            </button>
          </form>
        </div>

        <div className="w-1/2 bg-black flex flex-col justify-center items-center text-white p-10 rounded-r-xl">
          <img src={logopng} alt="Virtual Courses Logo" className="w-20 h-20 mb-4" />
          <span className="text-sm tracking-widest font-light uppercase">Virtual Courses</span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

