"use client";
import { createBrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/homepage/homePage";
import AdminPage from "./components/adminpage/adminPage";
import NavBar from "./components/NavBar";
import LoginSignup from "./logIn-SignUp/login-signup";



export default function App() {
    return (
    <>
      <html> 
          <body>
                <NavBar />
                <LoginSignup />
                <HomePage />
          </body>
      </html>
    </>
    );
  }