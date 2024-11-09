import React from "react";
import { Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing";
import Signup from "./pages/Authentication/Signup";
import Login from "./pages/Authentication/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App;