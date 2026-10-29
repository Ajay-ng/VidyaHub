import { Navigate, Route, Routes } from "react-router"

import Login from "./pages/auth/Login"

// Layouts
import AuthLayout from "./Layout/auth/AuthLayout"
import ProtectedRoute from "./Layout/common/ProtectedRoute"
import AdminLayout from "./Layout/App/admin/AdminLayout"
import TeacherLayout from "./Layout/App/teacher/TeacherLayout"

// Admin Pages
import AdminDashboard from "./pages/app/admin/AdminDashboard"
import StudentManagement from "./pages/app/admin/AcademicManagement/StudentManagement"
import Classes from "./pages/app/admin/AcademicManagement/ClassesManagement"
import ResultsGrades from "./pages/app/admin/AcademicManagement/ResultsAndGrades"
import TeachersManagement from "./pages/app/admin/AcademicManagement/TeachersManagement"
import LibraryManagement from "./pages/app/admin/AcademicManagement/LibraryManagement"
import TimetableManagement from "./pages/app/admin/AcademicManagement/TimeTableManagement"
import ExaminationManagement from "./pages/app/admin/AcademicManagement/ExaminationManagement"

import StaffManagement from "./pages/app/admin/PeopleManagment/StaffManagement"
import ParentsGuardians from "./pages/app/admin/PeopleManagment/parentsManagement"

import FeesManagement from "./pages/app/admin/FinanceManagement/FeesManagement"
import Payments from "./pages/app/admin/FinanceManagement/Payments"

import Transport from "./pages/app/admin/Attendance & Activities/Transport"
import Assignments from "./pages/app/admin/Attendance & Activities/Assignments"
import Attendance from "./pages/app/admin/Attendance & Activities/Attendance"

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

export function App() {
  // Temporary authentication
  const user = {
    role: "admin" as "admin" | "teacher",
  }

  const isAuthenticated = true

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>

      {/* PROTECTED ROUTES */}
      <Route
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} user={user} />
        }
      >
        {/* HOME REDIRECT */}
        <Route
          path="/"
          element={
            <Navigate
              to={
                user.role === "admin"
                  ? "/admin/dashboard"
                  : "/teacher/dashboard"
              }
              replace
            />
          }
        />

        {/* ADMIN ROUTES */}
        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* Academic Management */}
          <Route path="student-management" element={<StudentManagement />} />
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

          {/* Communication Management */}
          <Route path="announcements" element={<AnnouncementManagement />} />
          <Route path="messages" element={<MessageManagement />} />
        </Route>

        {/* TEACHER ROUTES */}
        <Route path="teacher" element={<TeacherLayout />}>
          <Route path="dashboard" element={<TeacherDashboard />} />

          {/* Attendance */}
          <Route path="attendance" element={<TeacherAttendancePage />} />

          {/* Students */}
          <Route path="students" element={<TeacherStudentsPage />} />
          <Route path="students/:id" element={<StudentDetailsPage />} />

          {/* Assignments */}
          <Route path="assignments" element={<TeacherAssignmentsPage />} />
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
          <Route path="assignments/create" element={<CreateAssignmentPage />} />

          {/* Timetable */}
          <Route path="timetable" element={<TeacherTimetablePage />} />

          {/* Profile */}
          <Route path="profile" element={<TeacherProfilePage />} />
        </Route>
      </Route>

      {/* PAGE NOT FOUND */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  )
}

export default App
