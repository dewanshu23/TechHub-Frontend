// import React from "react";
// import { Link } from "react-router-dom";
// import "../CSS/Navbar.css"; // Import CSS
// import { FaUser } from "react-icons/fa";

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="nav-links">
//         {/* <Link to="/">Login</Link> */}
//         <Link to="/alumni-list">Alumni List</Link>
//         <Link to="/notification-page">Events</Link>
//         <Link to="/job-notification-page">Job Section</Link>
//         <Link to="/admin-user-view">Users View</Link>
//       </div>

//       {/* Profile Icon */}
//       <Link to="/profile-page" className="profile-icon">
//         <FaUser />
//       </Link>
//     </nav>
//   );
// };

// export default Navbar;



//userbased navbar 
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Navbar.css"; // Import CSS
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const userRole = localStorage.getItem("userRole"); // Get stored role
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole"); // Clear role
    navigate("/"); // Redirect to login or home
    window.location.reload(); // Refresh to update Navbar
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/alumni-list">Alumni List</Link>
        <Link to="/notification-page">Events</Link>
        <Link to="/job-notification-page">Job Section</Link>
        <Link to="/chat">Chat</Link>

        {/* Show 'Users View' only for Admin */}
        {userRole === "Admin" && <Link to="/admin-user-view">Users View</Link>}
        {/* Show 'Students list' only for teacher and admin */}
        {userRole === "Admin" && <Link to="/students-list">Students List</Link>}
        {userRole === "Teacher" && <Link to="/students-list">Students List</Link>}
      </div>

      <div className="nav-right">
        {/* Profile Icon */}
        <Link to="/profile-page" className="profile-icon">
          <FaUser />
        </Link>

        {/* Logout Button */}
        {userRole && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
