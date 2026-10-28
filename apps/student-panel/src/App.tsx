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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public authentication routes */}
        <Route path="/auth/login" element={<Login />} />

        {/* Protected application routes */}
        <Route element={<ProtectedRoute />}>
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
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
