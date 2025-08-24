import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // 🚫 Not logged in → redirect
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // 🚫 Logged in but wrong role → redirect to home or dashboard
    return <Navigate to="/" replace />;
  }

  return children; // ✅ Access granted
};
