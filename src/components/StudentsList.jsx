import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react"; // Placeholder icon
import "../CSS/StudentsList.css";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:7070/getAllStudents")
      .then((res) => res.json())
      .then((data) => setStudents(data.students))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  // Filter students based on search input
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.stream.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="students-container">
      <h2>Student List</h2>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or stream..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="students-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Stream</th>
            <th>Current Year</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id} onClick={() => navigate(`/profile/${student.id}`)}>
                <td>
                  {student.profilepic ? (
                    <img src={student.profilepic} alt="Profile" className="profile-pic" />
                  ) : (
                    <User className="profile-icon" /> // Placeholder icon
                  )}
                </td>
                <td>{student.name}</td>
                <td>{student.stream}</td>
                <td>{student.year}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-results">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;
