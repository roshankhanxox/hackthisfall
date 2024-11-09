import React from "react";
import { Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing";
import Signup from "./pages/Authentication/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App;