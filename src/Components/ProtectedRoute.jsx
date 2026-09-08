import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContextValue";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ message: "Please login to use AI Budget Planner.", from: location.pathname }} replace />;
  }

  return children;
}

export default ProtectedRoute;