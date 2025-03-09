import React, { useState } from "react";
import "../CSS/AdminUserView.css";

const AdminUserView = () => {
  // Dummy Data for Users
  const [users, setUsers] = useState([
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", profileType: "Alumni", status: "Pending" },
    { id: 2, name: "Priya Verma", email: "priya@gmail.com", profileType: "Student", status: "Approved" },
    { id: 3, name: "Amit Patel", email: "amit@gmail.com", profileType: "Alumni", status: "Pending" },
    { id: 4, name: "Neha Singh", email: "neha@gmail.com", profileType: "Student", status: "Disapproved" }
  ]);

  // Handle Status Change (Approve/Disapprove)
  const updateStatus = (id, newStatus) => {
    setUsers(users.map(user => (user.id === id ? { ...user, status: newStatus } : user)));
  };

  return (
    <div className="admin-container">
      <h2>Admin - User Management</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Profile Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.profileType}</td>
              <td>
                <span className={`status ${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
              </td>
              <td>
                <button className="approve-btn" onClick={() => updateStatus(user.id, "Approved")}>Approve</button>
                <button className="disapprove-btn" onClick={() => updateStatus(user.id, "Disapproved")}>Disapprove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserView;
