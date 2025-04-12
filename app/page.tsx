"use client"; // Ensure this runs client-side
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import HomePage from "./components/homepage/homePage";
import NotFound from "./components/commons/notFound/notFound";
import AdminPage from "./components/adminpage/adminPage";
// import VideosPage from "./components/videos/videos";

// Setup routing using react-router-dom
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />
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

export default function Home() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
