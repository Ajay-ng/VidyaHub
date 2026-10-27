
import { Navigate, Outlet } from "react-router-dom";

// true = login required
// false = allow everyone
const AUTH_REQUIRED = false;

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (AUTH_REQUIRED && !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
