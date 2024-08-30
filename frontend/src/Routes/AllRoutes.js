import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../Pages/auth/SignUp";
import Login from "../Pages/auth/Login";
import PrivateRoute from "../Components/Private_Route/PrivateRoute";
import AdminDashboard from "../Pages/Admin_Dashboard/AdminDashboard";
import JobsPage from "../Pages/Jobs/JobsPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/jobs"
        element={
          <PrivateRoute>
            <JobsPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
