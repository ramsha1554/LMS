import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import forgetPassword from "./pages/ForgetPassword";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ForgetPassword from "./pages/ForgetPassword";
import AllCourses from "./pages/AllCourses";
import ViewCourse from "./pages/ViewCourse";
import CreateCourses from "./pages/CreateCourses";
import EditCourse from "./pages/EditCourse";
import CreateLecture from "./pages/CreateLecture";
import EditLecture from "./pages/EditLecture";  
 

const App = () => {
  const { userData } = useSelector((state) => state.user);

 

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/forget" element={<ForgetPassword />} />


          <Route path="/allcourses" element={<AllCourses />} />
          <Route path="/course/:courseId" element={<ViewCourse />} />
          
          <Route path="/createcourse" element={<CreateCourses />} />  
          <Route path="/editcourse/:courseId" element={<EditCourse />} />
          <Route path="/createlecture/:courseId" element={<CreateLecture />} />
          <Route path="/editlecture/:courseId/:lectureId" element={<EditLecture />} />

       
      </Routes>
    </>
  );
};

export default App;
