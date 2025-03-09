import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Navbar.css"; // Import CSS
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Login</Link>
        <Link to="/alumni-list">Alumni List</Link>
        <Link to="/notification-page">Events</Link>
        <Link to="/job-notification-page">Job Section</Link>
        <Link to="/admin-user-view">Users View</Link>
      </div>

      {/* Profile Icon */}
      <Link to="/profile-page" className="profile-icon">
        <FaUser />
      </Link>
    </nav>
  );
};

export default Navbar;
