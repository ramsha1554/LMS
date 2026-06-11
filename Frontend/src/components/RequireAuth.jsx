import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Wraps protected pages based on persisted Redux userData.
// If userData is null, redirects to /login.
const RequireAuth = ({ children }) => {
  const { userData } = useSelector((state) => state.user);

  // userData is hydrated asynchronously on app load.
  // Until it's present, block access to protected routes.
  if (!userData) return <Navigate to="/login" replace />;

  return children;
};


export default RequireAuth;



