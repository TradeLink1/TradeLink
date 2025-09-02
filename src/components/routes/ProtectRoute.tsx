// src/components/ProtectedRoute.tsx
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectRouteProps {
  children: ReactNode;
  allowedRole?: "user" | "seller"; // optional: specify which role can access
}

const ProtectRoute = ({ children, allowedRole }: ProtectRouteProps) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation(); // get current path

  // 1️⃣ If no token, redirect to login and store intended page
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // 2️⃣ If role is restricted and does not match, redirect
  if (allowedRole && role !== allowedRole) { 
    return <Navigate to="/" replace />; // or some "unauthorized" page
  }

  // ✅ Allow access if token exists and role matches (or no role restriction)
  return <>{children}</>;
};

export default ProtectRoute;