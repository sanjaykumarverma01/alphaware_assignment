import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../Pages/auth/SignUp";
import Login from "../Pages/auth/Login";
import HomePage from "../Pages/landing/Home";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
    </Routes>
  );
};

export default AllRoutes;
