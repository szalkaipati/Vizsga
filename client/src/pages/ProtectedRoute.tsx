// ProtectedRoute.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const role = localStorage.getItem("role");
  if (!role || !allowedRoles.includes(role)) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
