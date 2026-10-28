import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Layout from "./Layout/Layout"
import Login from "./pages/login"
import ProtectedRoute from "./components/ProtectedRoute"
import MyClasses from "./pages/classes"
import Attendence from "./pages/attendence"
import Assignments from "./pages/assignment"
import Results from "./pages/exsams-results"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page: Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/classes" element={<MyClasses />} />
            <Route path="/attendance" element={<Attendence />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/results" element={<Results />} />
          </Route>
        </Route>

        {/* Handle unknown URLs */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
