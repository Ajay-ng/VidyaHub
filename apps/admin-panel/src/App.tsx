import { Navigate, Route, Routes } from "react-router"
import Login from "./pages/auth/Login"
import AuthLayout from "./Layout/auth/AuthLayout"
import ProtectedRoute from "./Layout/common/ProtectedRoute"
import AdminLayout from "./Layout/App/admin/AdminLayout"
import AdminDashboard from "./pages/app/admin/AdminDashboard"
import TeacherLayout from "./Layout/App/teacher/TeacherLayout"
import TeacherDashboard from "./pages/app/teacher/TeacherDashboard"
import TeacherAttendancePage from "./pages/app/teacher/TeacherDashboard"
import StudentManagement from "./pages/app/admin/AcademicManagement/StudentManagement"
import Classes from "./pages/app/admin/AcademicManagement/ClassesManagement"
import SubjectManagement from "./pages/app/admin/AcademicManagement/SubjectManagement"

import TeacherAttendancePage from "./pages/app/teacher/TeacherDashboard";
import TeachersManagement from "./pages/app/admin/AcademicManagement/TeachersManagement"
import LibraryManagement from "./pages/app/admin/AcademicManagement/LibraryManagement"
export function App() {
  const user = {
    role: "admin" as "admin" | "teacher",
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

        {/*ADMIN ROUTES*/}
        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin/student-management"
            element={<StudentManagement />}
          />
          <Route path="/admin/classes" element={<Classes />} />
          <Route path="/admin/subjects" element={<SubjectManagement />} />
          {/* <Route path="reports" element={<AdminReports />} /> */}
          <Route path="/admin/teachers" element={<TeachersManagement />} />
          <Route path="/admin/library" element={<LibraryManagement/>}/>
        </Route>

        {/*STUDENT ROUTES*/}
        <Route path="teacher" element={<TeacherLayout />}>
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="attendance" element={<TeacherAttendancePage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
