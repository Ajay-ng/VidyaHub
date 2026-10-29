import { Navigate, Route, Routes } from "react-router"
import Login from "./pages/auth/Login"
import AuthLayout from "./Layout/auth/AuthLayout"
import ProtectedRoute from "./Layout/common/ProtectedRoute"
import AdminLayout from "./Layout/App/admin/AdminLayout"
import AdminDashboard from "./pages/app/admin/AdminDashboard"
import TeacherLayout from "./Layout/App/teacher/TeacherLayout"
import TeacherDashboard from "./pages/app/teacher/TeacherDashboard"
import TeacherAttendancePage from "./pages/app/teacher/attendance/TeacherAttendancePage";
import TeacherStudentsPage from "@/pages/app/teacher/students/TeacherStudentsPage";
import StudentDetailsPage from "./pages/app/teacher/students/StudentDetailsPage";
import TeacherAssignmentsPage from "./pages/app/teacher/assignments/TeacherAssignmentsPage";
import AssignmentDetailsPage from "./pages/app/teacher/assignments/AssignmentDetailsPage";
import TeacherEditAssignmentPage from "./pages/app/teacher/assignments/TeacherEditAssignmentPage";
import TeacherDeleteAssignmentPage from "./pages/app/teacher/assignments/TeacherDeleteAssignmentPage";
import CreateAssignmentPage from "./pages/app/teacher/assignments/CreateAssignmentPage";
import TeacherTimetablePage from "./pages/app/teacher/timetable/TeacherTimetablePage";
import TeacherProfilePage from "./pages/app/teacher/profile/TeacherProfilePage";


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
          {/* <Route path="reports" element={<AdminReports />} /> */}
        </Route>

        <Route path="teacher" element={<TeacherLayout />}>
          <Route path="dashboard" element={<TeacherDashboard />} />
           <Route
          path="attendance"
          element={<TeacherAttendancePage />}
        />
         <Route
            path="students"
            element={<TeacherStudentsPage />}
          />
          <Route
  path="/teacher/students/:id"
  element={<StudentDetailsPage />}
/>
 <Route
  path="students/:id"
  element={<StudentDetailsPage />}
/>

<Route
  path="assignments"
  element={<TeacherAssignmentsPage />}
/>

<Route
  path="assignments/details"
  element={<AssignmentDetailsPage />}
/>

<Route
  path="assignments/edit"
  element={<TeacherEditAssignmentPage />}
/>
<Route
  path="assignments/delete"
  element={<TeacherDeleteAssignmentPage />}
/>

<Route
  path="assignments/create"
  element={<CreateAssignmentPage />}
/>
<Route
  path="timetable"
  element={<TeacherTimetablePage />}
/>
<Route
  path="profile"
  element={<TeacherProfilePage />}
/>

   </Route>
      </Route>
    </Routes>
  )
}

export default App
