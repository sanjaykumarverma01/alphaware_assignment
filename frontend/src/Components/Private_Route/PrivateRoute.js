import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo?.data) {
    return <Navigate to="/login" />;
  }

  if (userInfo?.data?.userType === "admin") {
    return <Navigate to="/admin-dashboard" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
