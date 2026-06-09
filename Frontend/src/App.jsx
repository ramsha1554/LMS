
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RequireAuth from "./components/RequireAuth";
import getCurrentUser from "./customHooks/getCurrentUser";
import RouteFallback from "./components/RouteFallback";

const Courses = React.lazy(() => import("./pages/Educator/Courses"));
const forgetPassword = React.lazy(() => import("./pages/ForgetPassword"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Home = React.lazy(() => import("./pages/Home"));
const AllCourses = React.lazy(() => import("./pages/AllCourses"));
const ViewCourse = React.lazy(() => import("./pages/ViewCourse"));
const CreateCourses = React.lazy(() => import("./pages/Educator/CreateCourses"));
const EditCourse = React.lazy(() => import("./pages/EditCourse"));
const CreateLecture = React.lazy(() => import("./pages/CreateLecture"));
const EditLecture = React.lazy(() => import("./pages/EditLecture"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Dashboard = React.lazy(() => import("./pages/Educator/Dashboard"));

const App = () => {
  // Hydrate redux from cookie on first load.
  getCurrentUser();


  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />

      <Suspense fallback={<RouteFallback label="Loading page…" />}> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/educator/courses" element={<Courses />} />
          <Route path="/allcourses" element={<AllCourses />} />
          <Route path="/course/:courseId" element={<ViewCourse />} />

          {/* Protected routes */}
          <Route
            path="/educator/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
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
      </Suspense>
    </>
  );
};

export default App;

