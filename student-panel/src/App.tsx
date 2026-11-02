import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./Layout/Layout"
import Login from "./pages/login"
import ProtectedRoute from "./components/ProtectedRoute"
import MyClasses from "./pages/classes"
import Attendence from "./pages/attendence"
import Assignments from "./pages/assignment"
import Results from "./pages/exsams-results"
import QuizPage from "./pages/quiz"
import MaterialsPage from "./pages/study-materials"
import Dashboard from "./pages/dashboard"
import LeaveRequest from "./pages/LeaveRequest"
import EventsCalendar from "./pages/eventsCalendar"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/classes" element={<MyClasses />} />
            <Route path="/attendance" element={<Attendence />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/results" element={<Results />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/leave-requests" element={<LeaveRequest />} />
            <Route path="/events" element={<EventsCalendar />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
