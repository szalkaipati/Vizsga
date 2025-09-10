import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import AdminPage from "../pages/AdminPage";
import TeacherPage from "../pages/TeacherPage";
import StudentPage from "../pages/StudentPage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "../pages/ProtectedRoute";
import HomePage from "../pages/HomePage";
// import HomePage from "../components/homepage/homePage";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
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


