// import { StrictMode } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import HomePage from './components/homepage/homePage';
// import NotFound from './components/commons/notFound/notFound';
// import AdminPage from './components/adminpage/adminPage';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//     errorElement: <NotFound />,
//   },
//   {
//     path: "/admin",
//     element: <AdminPage />,
//   },
//   // {
//   //   path: "/videos",
//   //   element: <VideosPage />,
//   // },
// ]);

// function App() {
//   return (
//     <StrictMode>
//       <RouterProvider router={router} />
//     </StrictMode>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import TeacherPage from "./pages/TeacherPage";
import StudentPage from "./pages/StudentPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

