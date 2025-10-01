import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";


import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
 

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
       
      </Routes>
    </>
  );
};

export default App;
