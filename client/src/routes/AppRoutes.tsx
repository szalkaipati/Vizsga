import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import AdminPage from "../pages/AdminPage";
import TeacherPage from "../pages/TeacherPage";
import StudentPage from "../pages/StudentPage";
import ProfilePage from "../pages/ProfilePage";
import Navbar from "../pages/Navbar";
import ProtectedRoute from "../pages/ProtectedRoute";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute allowedRoles={["STUDENT","TEACHER","ADMIN"]}><ProfilePage /></ProtectedRoute>} />
        <Route path="/student" element={<ProtectedRoute allowedRoles={["STUDENT"]}><StudentPage /></ProtectedRoute>} />
        <Route path="/teacher" element={<ProtectedRoute allowedRoles={["TEACHER"]}><TeacherPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;


