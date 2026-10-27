import { Navigate, Route, Routes } from "react-router"
import Login from "./pages/auth/Login"
import AuthLayout from "./Layout/auth/AuthLayout"
import ProtectedRoute from "./Layout/common/ProtectedRoute"
import AdminLayout from "./Layout/App/admin/AdminLayout"
import AdminDashboard from "./pages/app/admin/AdminDashboard"
import TeacherLayout from "./Layout/App/teacher/TeacherLayout"
import TeacherDashboard from "./pages/app/teacher/TeacherDashboard"

export function App() {
  const user = {
    role: "teacher" as "admin" | "teacher",
  }
  const isAuthenticated = true

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} user={user} />
        }
      >
        <Route
          index
          element={
            <Navigate
              to={
                !isAuthenticated
                  ? "/auth/login"
                  : user?.role === "admin"
                    ? "/admin/dashboard"
                    : "/teacher/dashboard"
              }
              replace
            />
          }
        />
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="teacher" element={<TeacherLayout />}>
          <Route path="dashboard" element={<TeacherDashboard />} />

        </Route>
      </Route>
    </Routes>
  )
}

export default App
