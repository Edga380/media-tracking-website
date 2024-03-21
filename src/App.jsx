import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import NotFound from "./NotFound";
import { AuthProvider } from "./UseAuth";
import { ProtectedRoute } from "./ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
