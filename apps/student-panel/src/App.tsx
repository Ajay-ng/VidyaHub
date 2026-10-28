
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout"
import Login from "./pages/login"
import ProtectedRoute from "./components/ProtectedRoute"
import MyClasses from "./pages/classes"
import Attendence from "./pages/attendence"
import Assignments from "./pages/assignment"
import Results from "./pages/exsams-results"
import QuizPage from "./pages/quiz"
import MaterialsPage from "./pages/study-materials"

import Layout from "./Layout/Layout";
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import MyClasses from "./pages/classes";
import Attendence from "./pages/attendence";
import Assignments from "./pages/assignment";
import Dashboard from "./pages/dashboard";
import LeaveRequest from "./pages/LeaveRequest";
import EventsCalendar from "./pages/eventsCalendar";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page: Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/classes"
              element={<MyClasses />}
            />
            <Route
              path="/attendance"
              element={<Attendence />}
            />
            <Route
              path="/assignments"
              element={<Assignments />}
            />
            <Route
              path="/leave-requests"
              element={<LeaveRequest />}
            />
            <Route
              path="/events"
              element={<EventsCalendar />}
            />
          <Route path="/" element={<Layout />}>
            <Route path="/classes" element={<MyClasses />} />
            <Route path="/attendance" element={<Attendence />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/results" element={<Results />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/materials" element={<MaterialsPage />} />
          </Route>
        </Route>

        {/* Handle unknown URLs */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
