import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";

interface ProtectRouteProps {
  children: ReactElement; 
}

const ProtectRoute = ({ children }: ProtectRouteProps) => {
  const isLoggedIn = localStorage.getItem("authToken");

  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default ProtectRoute;
