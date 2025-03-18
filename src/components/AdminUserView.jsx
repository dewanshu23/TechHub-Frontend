// import React, { useState } from "react";
// import "../CSS/AdminUserView.css";

// const AdminUserView = () => {
//   // Dummy Data for Users
//   const [users, setUsers] = useState([
//     { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", profileType: "Alumni", status: "Pending" },
//     { id: 2, name: "Priya Verma", email: "priya@gmail.com", profileType: "Student", status: "Approved" },
//     { id: 3, name: "Amit Patel", email: "amit@gmail.com", profileType: "Alumni", status: "Pending" },
//     { id: 4, name: "Neha Singh", email: "neha@gmail.com", profileType: "Student", status: "Disapproved" }
//   ]);

//   // Handle Status Change (Approve/Disapprove)
//   const updateStatus = (id, newStatus) => {
//     setUsers(users.map(user => (user.id === id ? { ...user, status: newStatus } : user)));
//   };

//   return (
//     <div className="admin-container">
//       <h2>Admin - User Management</h2>
//       <table className="user-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Profile Type</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.profileType}</td>
//               <td>
//                 <span className={`status ${user.status.toLowerCase()}`}>
//                   {user.status}
//                 </span>
//               </td>
//               <td>
//                 <button className="approve-btn" onClick={() => updateStatus(user.id, "Approved")}>Approve</button>
//                 <button className="disapprove-btn" onClick={() => updateStatus(user.id, "Disapproved")}>Disapprove</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminUserView;


import React, { useState, useEffect } from "react";
import "../CSS/AdminUserView.css";

const AdminUserView = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    password: "",
    stream: "IT/CS",
  });

  // Fetch users from API when component mounts
  useEffect(() => {
    fetch("http://localhost:7070/getAllStudents") // Adjust the endpoint as per your backend
      .then((response) => response.json())
      .then((data) => setUsers(data.students))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle Login Restriction Toggle
  const toggleLoginAccess = async (id, currentStatus) => {
    const newStatus = currentStatus === "Restricted" ? "Allowed" : "Restricted";

    try {
      const response = await fetch(`http://localhost:7070/users/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setUsers(users.map((user) => (user.id === id ? { ...user, status: newStatus } : user)));
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle Input Change in Modal Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher({ ...newTeacher, [name]: value });
  };

  // Handle Form Submission - Add New Teacher
  const handleAddTeacher = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:7070/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newTeacher,
          confirmPassword: newTeacher.password, // Set confirmPassword same as password
          userRole: "Teacher",
          passout: 0,
          year: "PO",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setUsers([...users, { id: result.id, ...newTeacher, profileType: "Teacher", status: "Allowed" }]);
        setShowModal(false); // Close the modal
        setNewTeacher({ name: "", email: "", password: "", stream: "IT/CS", passout: 0, year: "" });
      } else {
        alert(result.message || "Failed to add teacher");
      }
    } catch (error) {
      console.error("Error adding teacher:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin - User Management</h2>

      {/* Add Teacher Button */}
      <button className="add-teacher-btn" onClick={() => setShowModal(true)}>
        Add Teacher
      </button>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Profile Type</th>
            <th>Login Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.userrole}</td>
              <td>
                <span className={`status ${user.status ? user.status.toLowerCase() : "pending"}`}>
                  {user.status || "Pending"}
                </span>
              </td>
              <td>
                <button
                  className={`status-toggle-btn ${user.status === "Allowed" ? "restrict" : "allow"}`}
                  onClick={() => toggleLoginAccess(user.id, user.status || "Pending")}
                >
                  {user.status === "Allowed" ? "Restrict Login" : "Allow Login"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Form for Adding Teacher */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Teacher</h3>
            <form onSubmit={handleAddTeacher}>
              <label>Name</label>
              <input type="text" name="name" placeholder="Name" value={newTeacher.name} onChange={handleInputChange} required />

              <label>Email</label>
              <input type="email" name="email" placeholder="Email" value={newTeacher.email} onChange={handleInputChange} required />

              <label>Password</label>
              <input type="password" name="password" placeholder="Password" value={newTeacher.password} onChange={handleInputChange} required />

              {/* Stream Dropdown */}
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
