
import { useEffect, useState } from "react"

import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"

// Authentication
import Login from "./pages/auth/Login"

// Layouts
import AuthLayout from "./Layout/auth/AuthLayout"
import ProtectedRoute from "./Layout/common/ProtectedRoute"
import AdminLayout from "./Layout/App/admin/AdminLayout"
import TeacherLayout from "./Layout/App/teacher/TeacherLayout"

// Admin Pages
import AdminDashboard from "./pages/app/admin/AdminDashboard"

// Academic Management
import StudentManagement from "./pages/app/admin/AcademicManagement/StudentManagement"
import Classes from "./pages/app/admin/AcademicManagement/ClassesManagement"
import ResultsGrades from "./pages/app/admin/AcademicManagement/ResultsAndGrades"
import TeachersManagement from "./pages/app/admin/AcademicManagement/TeachersManagement"
import LibraryManagement from "./pages/app/admin/AcademicManagement/LibraryManagement"
import TimetableManagement from "./pages/app/admin/AcademicManagement/TimeTableManagement"
import ExaminationManagement from "./pages/app/admin/AcademicManagement/ExaminationManagement"

// People Management
import StaffManagement from "./pages/app/admin/PeopleManagment/StaffManagement"
import ParentsGuardians from "./pages/app/admin/PeopleManagment/parentsManagement"

// Finance Management
import FeesManagement from "./pages/app/admin/FinanceManagement/FeesManagement"
import Payments from "./pages/app/admin/FinanceManagement/Payments"

// Attendance & Activities
import Transport from "./pages/app/admin/Attendance & Activities/Transport"
import Assignments from "./pages/app/admin/Attendance & Activities/Assignments"
import Attendance from "./pages/app/admin/Attendance & Activities/Attendance"

// Administration Management
import RolesPermissions from "./pages/app/admin/AdministrationManagement/roles&Permission"
import UserManagement from "./pages/app/admin/AdministrationManagement/userManagement"

// Communication Management
import AnnouncementManagement from "./pages/app/admin/CommunicationManagement/AnnouncementsManagement"
import MessageManagement from "./pages/app/admin/CommunicationManagement/MessageManagement"

// Teacher Pages
import TeacherDashboard from "./pages/app/teacher/TeacherDashboard"
import TeacherAttendancePage from "./pages/app/teacher/attendance/TeacherAttendancePage"
import TeacherStudentsPage from "./pages/app/teacher/students/TeacherStudentsPage"
import StudentDetailsPage from "./pages/app/teacher/students/StudentDetailsPage"

import TeacherAssignmentsPage from "./pages/app/teacher/assignments/TeacherAssignmentsPage"
import AssignmentDetailsPage from "./pages/app/teacher/assignments/AssignmentDetailsPage"
import TeacherEditAssignmentPage from "./pages/app/teacher/assignments/TeacherEditAssignmentPage"
import TeacherDeleteAssignmentPage from "./pages/app/teacher/assignments/TeacherDeleteAssignmentPage"
import CreateAssignmentPage from "./pages/app/teacher/assignments/CreateAssignmentPage"

import TeacherTimetablePage from "./pages/app/teacher/timetable/TeacherTimetablePage"
import TeacherProfilePage from "./pages/app/teacher/profile/TeacherProfilePage"

// User Types
type Role = "admin" | "teacher"

type User = {
  role: Role
  email: string
}

// Read authentication from localStorage
const getAuthData = (): {
  isAuthenticated: boolean
  user: User | null
} => {
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true"

  const storedRole = localStorage.getItem("userRole")
  const email = localStorage.getItem("userEmail") || ""

  const isValidRole =
    storedRole === "admin" || storedRole === "teacher"

  if (!isAuthenticated || !isValidRole) {
    return {
      isAuthenticated: false,
      user: null,
    }
  }

  return {
    isAuthenticated: true,
    user: {
      role: storedRole as Role,
      email,
    },
  }
}

export function App() {
  const location = useLocation()

  // Authentication state
  const [auth, setAuth] = useState(getAuthData)

  // Refresh authentication whenever the route changes
  useEffect(() => {
    setAuth(getAuthData())
  }, [location.pathname])

  // Listen for authentication changes in other browser tabs
  useEffect(() => {
    const handleStorageChange = () => {
      setAuth(getAuthData())
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const { isAuthenticated, user } = auth

  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="auth" element={<AuthLayout />}>
        <Route
          path="login"
          element={
            isAuthenticated ? (
              <Navigate
                to={
                  user?.role === "admin"
                    ? "/admin/dashboard"
                    : "/teacher/dashboard"
                }
                replace
              />
            ) : (
              <Login />
            )
          }
        />
      </Route>

      {/* PROTECTED ROUTES */}
      <Route
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            user={user}
          />
        }
      >

        {/* HOME REDIRECT */}
        <Route
          path="/"
          element={
            <Navigate
              to={
                user?.role === "admin"
                  ? "/admin/dashboard"
                  : user?.role === "teacher"
                    ? "/teacher/dashboard"
                    : "/auth/login"
              }
              replace
            />
          }
        />

        {/* ADMIN ROUTES */}
        <Route path="admin" element={<AdminLayout />}>

          <Route
            index
            element={<Navigate to="/admin/dashboard" replace />}
          />

          <Route path="dashboard" element={<AdminDashboard />} />

          {/* Academic Management */}
          <Route
            path="student-management"
            element={<StudentManagement />}
          />
          <Route path="classes" element={<Classes />} />
          <Route path="teachers" element={<TeachersManagement />} />
          <Route path="timetable" element={<TimetableManagement />} />
          <Route path="examinations" element={<ExaminationManagement />} />
          <Route path="results" element={<ResultsGrades />} />
          <Route path="library" element={<LibraryManagement />} />

          {/* People Management */}
          <Route path="parents" element={<ParentsGuardians />} />
          <Route path="staff" element={<StaffManagement />} />

          {/* Finance Management */}
          <Route path="fees" element={<FeesManagement />} />
          <Route path="payments" element={<Payments />} />

          {/* Attendance & Activities */}
          <Route path="transport" element={<Transport />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="assignments" element={<Assignments />} />

          {/* Administration Management */}
          <Route path="roles" element={<RolesPermissions />} />
          <Route path="users" element={<UserManagement />} />

          {/* Communication Management */}
          <Route
            path="announcements"
            element={<AnnouncementManagement />}
          />
          <Route path="messages" element={<MessageManagement />} />

        </Route>

        {/* TEACHER ROUTES */}
        <Route path="teacher" element={<TeacherLayout />}>

          <Route
            index
            element={<Navigate to="/teacher/dashboard" replace />}
          />

          <Route path="dashboard" element={<TeacherDashboard />} />

          {/* Attendance */}
          <Route
            path="attendance"
            element={<TeacherAttendancePage />}
          />

          {/* Students */}
          <Route path="students" element={<TeacherStudentsPage />} />
          <Route
            path="students/:id"
            element={<StudentDetailsPage />}
          />

          {/* Assignments */}
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

          {/* Timetable */}
          <Route
            path="timetable"
            element={<TeacherTimetablePage />}
          />

          {/* Profile */}
          <Route
            path="profile"
            element={<TeacherProfilePage />}
          />

        </Route>
      </Route>

      {/* PAGE NOT FOUND */}
      <Route
        path="*"
        element={
          <Navigate
            to={
              isAuthenticated
                ? user?.role === "admin"
                  ? "/admin/dashboard"
                  : "/teacher/dashboard"
                : "/auth/login"
            }
            replace
          />
        }
      />

    </Routes>
  )
}

export default App
