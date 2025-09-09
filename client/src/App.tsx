import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './components/homepage/homePage';
import NotFound from './components/commons/notFound/notFound';
import AdminPage from './components/adminpage/adminPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  // {
  //   path: "/videos",
  //   element: <VideosPage />,
  // },
]);

function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

export default App;
