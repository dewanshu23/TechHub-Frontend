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
  const user = JSON.parse(localStorage.getItem("user")); // Convert string to object
const userRole = user ? user.userrole : null; // Get userrole or return null if user is not found

// console.log(userRole); // Output: "Admin"
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("user"); // Clear role
  //   navigate("/"); // Redirect to login or home
  //   window.location.reload(); // Refresh to update Navbar
  // };

  const handleLogout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id; // Assuming 'id' is stored in localStorage under 'user'
  
      if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
      }
  
      // Call the logout API
      const response = await fetch("http://localhost:7070/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });
  
      if (response.ok) {
        console.log("Logged out successfully.");
      } else {
        console.error("Failed to log out.");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage and refresh regardless of API success/failure
      localStorage.removeItem("user");
      navigate("/");
      window.location.reload();
    }
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
