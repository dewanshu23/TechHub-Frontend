import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem("userRole"); // Assuming you store user role in localStorage

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />; // Redirect unauthorized users
  }

  return children;
};

export default ProtectedRoute;
