import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  const { userData, isLoading } = useSelector((state) => state.user);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!userData) return <Navigate to="/login" replace />;

  return children;
};

export default RequireAuth;