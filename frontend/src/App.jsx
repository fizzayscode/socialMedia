import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/privateRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
