import { Navigate, Outlet, useLocation } from "react-router-dom"

type Role = "admin" | "teacher"

type User = {
  role: Role
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
  const path = location.pathname

  const isAuthPage = path === "/auth/login" || path === "/auth/register"

  // Unauthenticated users can access only auth pages.
  if (!isAuthenticated) {
    if (isAuthPage) {
      return <Outlet />
    }

    return <Navigate to="/auth/login" replace state={{ from: location }} />
  }

  // Authenticated users should not revisit login/register.
  if (isAuthPage) {
    return (
      <Navigate
        to={user?.role === "admin" ? "/admin/dashboard" : "/teacher/dashboard"}
        replace
      />
    )
  }

  // User must exist to access protected pages.
  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  // Teachers cannot access admin routes.
  if (user.role !== "admin" && path.startsWith("/admin")) {
    return <Navigate to="/teacher/dashboard" replace />
  }

  // Admins cannot access teacher routes.
  if (user.role === "admin" && path.startsWith("/teacher")) {
    return <Navigate to="/admin/dashboard" replace />
  }

  return <Outlet />
}
