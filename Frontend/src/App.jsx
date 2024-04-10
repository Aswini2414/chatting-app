
import React from "react";
import './App.css'
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const { authUser } = useAuthContext();
  return (
    <BrowserRouter>
      <div className="p-4 h-screen flex md:items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App
