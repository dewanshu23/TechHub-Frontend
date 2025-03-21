import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // const userRole = localStorage.getItem("userRole"); // Assuming you store user role in localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Convert string to object
  const userRole = user ? user.userrole : null; // Get userrole or return null if user is not found
  
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />; // Redirect unauthorized users
  }

  return children;
};

export default ProtectedRoute;
