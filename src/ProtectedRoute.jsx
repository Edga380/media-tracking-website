import { Navigate } from "react-router-dom";
import { UseAuth } from "./UseAuth";

export const ProtectedRoute = ({ children }) => {
  const { user } = UseAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
