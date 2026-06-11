import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./components/RequireAuth";
import RequireEducator from "./components/RequireEducator";
import RouteFallback from "./components/RouteFallback";
import useCurrentUser from "./customHooks/useCurrentUser";
import useAllReviews from "./customHooks/useAllReviews";

const Courses = React.lazy(() => import("./pages/Educator/Courses"));
const ForgetPassword = React.lazy(() => import("./pages/ForgetPassword"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Home = React.lazy(() => import("./pages/Home"));
const AllCourses = React.lazy(() => import("./pages/AllCourses"));
const ViewCourse = React.lazy(() => import("./pages/ViewCourse"));
const ViewLecture = React.lazy(() => import("./pages/ViewLecture"));
const CreateCourses = React.lazy(() => import("./pages/Educator/CreateCourses"));
const EditCourse = React.lazy(() => import("./pages/EditCourse"));
const CreateLecture = React.lazy(() => import("./pages/CreateLecture"));
const EditLecture = React.lazy(() => import("./pages/EditLecture"));
const Profile = React.lazy(() => import("./pages/Profile"));
const EditProfile = React.lazy(() => import("./pages/EditProfile"));
const EnrolledCourses = React.lazy(() => import("./pages/EnrolledCourses"));
const Dashboard = React.lazy(() => import("./pages/Educator/Dashboard"));

const App = () => {
  useCurrentUser();
  useAllReviews();
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
      <Suspense fallback={<RouteFallback label="Loading page..." />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/allcourses" element={<AllCourses />} />
          <Route path="/course/:courseId" element={<ViewCourse />} />
          <Route path="/educator/courses" element={<RequireEducator><Courses /></RequireEducator>} />
          <Route path="/editprofile" element={<RequireAuth><EditProfile /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/mycourses" element={<RequireAuth><EnrolledCourses /></RequireAuth>} />
          <Route path="/viewlecture/:lectureId" element={<RequireAuth><ViewLecture /></RequireAuth>} />
          <Route path="/educator/dashboard" element={<RequireEducator><Dashboard /></RequireEducator>} />
          <Route path="/createcourse" element={<RequireEducator><CreateCourses /></RequireEducator>} />
          <Route path="/editcourse/:courseId" element={<RequireEducator><EditCourse /></RequireEducator>} />
          <Route path="/createlecture/:courseId" element={<RequireEducator><CreateLecture /></RequireEducator>} />
          <Route path="/editlecture/:courseId/:lectureId" element={<RequireEducator><EditLecture /></RequireEducator>} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
