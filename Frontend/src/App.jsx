
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";

import Courses from "./pages/Educator/Courses"; 
import forgetPassword from "./pages/ForgetPassword";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

import AllCourses from "./pages/AllCourses";
import ViewCourse from "./pages/ViewCourse";
import CreateCourses from "./pages/CreateCourses";
import EditCourse from "./pages/EditCourse";
import CreateLecture from "./pages/CreateLecture";
import EditLecture from "./pages/EditLecture";

import RequireAuth from "./components/RequireAuth";

import getCurrentUser from "./customHooks/getCurrentUser";

const App = () => {
  // Hydrate redux from cookie on first load.
  getCurrentUser();


  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget" element={<forgetPassword />} />
<Route path="/educator/courses" element={<Courses />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/course/:courseId" element={<ViewCourse />} />

        {/* Protected routes */}
        <Route
          path="/createcourse"
          element={
            <RequireAuth>
              <CreateCourses />
            </RequireAuth>
          }
        />
        <Route
          path="/editcourse/:courseId"
          element={
            <RequireAuth>
              <EditCourse />
            </RequireAuth>
          }
        />
        <Route
          path="/createlecture/:courseId"
          element={
            <RequireAuth>
              <CreateLecture />
            </RequireAuth>
          }
        />
        <Route
          path="/editlecture/:courseId/:lectureId"
          element={
            <RequireAuth>
              <EditLecture />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
};

export default App;

