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
// import SubjectManagement from "./pages/app/admin/AcademicManagement/SubjectManagement"
import StaffManagement from "./pages/app/admin/PeopleManagment/StaffManagement"
import ResultsGrades from "./pages/app/admin/AcademicManagement/ResultsAndGrades"
import TeachersManagement from "./pages/app/admin/AcademicManagement/TeachersManagement"
import LibraryManagement from "./pages/app/admin/AcademicManagement/LibraryManagement"
import ParentsGuardians from "./pages/app/admin/PeopleManagment/parentsManagement"
import TimetableManagement from "./pages/app/admin/AcademicManagement/TimeTableManagement"
import ExaminationManagement from "./pages/app/admin/AcademicManagement/ExaminationManagement"
import FeesManagement from "./pages/app/admin/FinanceManagement/FeesManagement"
import Payments from "./pages/app/admin/FinanceManagement/Payments"
import Transport from "./pages/app/admin/Attendance & Activities/Transport"
import Assignments from "./pages/app/admin/Attendance & Activities/Assignments"
import Attendance from "./pages/app/admin/Attendance & Activities/Attendance"
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
          {/* <Route path="/admin/subjects" element={<SubjectManagement />} /> */}
          {/* <Route path="reports" element={<AdminReports />} /> */}
          <Route path="/admin/teachers" element={<TeachersManagement />} />
          <Route path="/admin/timetable" element={<TimetableManagement />} />
          <Route
            path="/admin/examinations"
            element={<ExaminationManagement />}
          />
          <Route path="/admin/results" element={<ResultsGrades />} />
          <Route path="/admin/library" element={<LibraryManagement />} />
          <Route path="/admin/results" element={<ResultsGrades />} />

          {/* PEOPLE MANAGMENT */}
          <Route path="/admin/parents" element={<ParentsGuardians />} />
          <Route path="/admin/staff" element={<StaffManagement />} />

          {/* FESS MANAGEMENT */}
          <Route path="/admin/fees" element={<FeesManagement />} />
          <Route path="/admin/payments" element={<Payments />} />

          {/* Attendance & Activities */}
          <Route path="/admin/transport" element={<Transport/>}/>
          <Route path="/admin/attendance" element={<Attendance/>}/>
          <Route path="/admin/assignments" element={<Assignments/>}/>
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
