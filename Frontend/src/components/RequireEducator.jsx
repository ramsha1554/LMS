import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireEducator = ({ children }) => {
  const { userData } = useSelector((state) => state.user);

  if (!userData) return <Navigate to="/login" replace />;
  if (userData.role !== "educator") return <Navigate to="/" replace />;

  return children;
};

export default RequireEducator;



