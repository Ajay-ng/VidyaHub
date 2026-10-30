
import { Navigate, Outlet, useLocation } from "react-router-dom"

type Role = "admin" | "teacher"

type User = {
  role: Role
  email: string
}

type ProtectedRouteProps = {
  isAuthenticated: boolean
  user: User | null
}

export default function ProtectedRoute({
  isAuthenticated,
  user,
}: ProtectedRouteProps) {
  const location = useLocation()

  // Check authentication
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ from: location }}
      />
    )
  }

  // Prevent admin from accessing teacher pages
  if (
    user.role === "admin" &&
    location.pathname.startsWith("/teacher")
  ) {
    return <Navigate to="/admin/dashboard" replace />
  }

  // Prevent teacher from accessing admin pages
  if (
    user.role === "teacher" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/teacher/dashboard" replace />
  }

  return <Outlet />
}
