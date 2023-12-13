import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
