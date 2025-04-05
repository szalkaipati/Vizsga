

"use client"; 
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/homepage/homePage";
import AdminPage from "./components/adminpage/adminPage";
import NotFound from "./components/commons/notFound/notFound";
import { StrictMode } from "react";

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
])


export default function Home() {
    return (
   
    <StrictMode>
          <RouterProvider router={router}></RouterProvider>
        {/*<BrowserRouter>
            <App></App>
        </BrowserRouter>*/}
      </StrictMode>
      
    );
  }