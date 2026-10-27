
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./Layout/Layout";
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public authentication routes */}
        <Route path="/auth/login" element={<Login />} />

        {/* Protected application routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            {/* Add protected child routes here */}
          </Route>
        </Route>

        {/* Handle unknown URLs */}
        <Route
          path="*"
          element={<Navigate to="/auth/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
