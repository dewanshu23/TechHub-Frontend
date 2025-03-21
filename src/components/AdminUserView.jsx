import React, { useState, useEffect } from "react";
import "../CSS/AdminUserView.css";

const AdminUserView = () => {
  // State to manage users, loading status, modal visibility, and errors
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  
  // State for new teacher details
  const [newTeacher, setNewTeacher] = useState({ name: "", email: "", password: "", stream: "IT/CS", userRole: "Teacher" });

  // Fetch users from API when the component mounts
  useEffect(() => {
    fetch("http://localhost:7070/getAllUsers")
      .then(res => res.json())
      .then(data => {
        // Map API response to set status as "Allowed" or "Blocked"
        setUsers(data?.alumni?.map(user => ({
          ...user,
          status: user.status === "a" ? "Allowed" : "Blocked"
        })) || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  // Show loading or error message if applicable
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Function to toggle user login access
const toggleLoginAccess = async (id, currentStatus) => {
  const newStatus = currentStatus === "Allowed" ? "b" : "a";
  
  try {
    const response = await fetch(`http://localhost:7070/updateUserStatus?id=${id}&status=${newStatus}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // Update user status in the state after API call
      setUsers(users.map(user => 
        user.id === id ? { ...user, status: newStatus === "a" ? "Allowed" : "Blocked" } : user
      ));
    }
  } catch (error) {
    console.error("Error updating status:", error);
  }
};


  // Handle input changes for the new teacher form
  const handleInputChange = e => setNewTeacher({ ...newTeacher, [e.target.name]: e.target.value });

  // Function to handle adding a new teacher
  const handleAddTeacher = async e => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:7070/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newTeacher, confirmPassword: newTeacher.password, userRole: "Teacher", passout: 0, year: "PO" }),
      });
      const result = await response.json();
      if (response.ok) {
        // Add new teacher to user list
        setUsers([...users, { id: result.id, ...newTeacher, profileType: "Teacher", status: "Allowed" }]);
        setShowModal(false);
        setNewTeacher({ name: "", email: "", password: "", stream: "IT/CS" });
      } else alert(result.message || "Failed to add teacher");
    } catch (error) {
      console.error("Error adding teacher:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin - User Management</h2>
      <button className="add-teacher-btn" onClick={() => setShowModal(true)}>Add Teacher</button>
      <table className="user-table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Profile Type</th><th>Login Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(({ id, name, email, userrole, status }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{email}</td>
              <td>{userrole}</td>
              <td><span className={`status ${status.toLowerCase()}`}>{status}</span></td>
              <td>
                <button className={`status-toggle-btn ${status === "Allowed" ? "restrict" : "allow"}`} onClick={() => toggleLoginAccess(id, status)}>
                  {status === "Allowed" ? "Block Login" : "Allow Login"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Teacher</h3>
            <form onSubmit={handleAddTeacher}>
              {["name", "email", "password"].map(field => (
                <>
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input type={field === "password" ? "password" : "text"} name={field} placeholder={field} value={newTeacher[field]} onChange={handleInputChange} required />
                </>
              ))}
              <label>Stream</label>
              <select name="stream" value={newTeacher.stream} onChange={handleInputChange}>
                <option value="IT/CS">IT/CS</option>
                <option value="BAF">BAF</option>
              </select>
              <button type="submit" className="submit-btn">Add Teacher</button>
              <button type="button" className="close-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserView;
