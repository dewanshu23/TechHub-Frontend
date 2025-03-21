// import React, { useState } from "react";
// import "../CSS/AlumniListPage.css";

// const AlumniListPage = () => {
//   const [selectedYear, setSelectedYear] = useState("All");

//   // Dummy data for alumni
//   const alumniData = [
//     { name: "John Doe", year: 2020, id: 1 },
//     { name: "Jane Smith", year: 2021, id: 2 },
//     { name: "Michael Johnson", year: 2020, id: 3 },
//     { name: "Emily Davis", year: 2022, id: 4 },
//     { name: "Chris Brown", year: 2021, id: 5 },
//     { name: "Patricia Wilson", year: 2022, id: 6 },
//   ];

//   // Extract unique years for filtering
//   const uniqueYears = [
//     "All",
//     ...Array.from(new Set(alumniData.map((alumni) => alumni.year))),
//   ];

//   // Filter alumni based on selected year
//   const filteredAlumni =
//     selectedYear === "All"
//       ? alumniData
//       : alumniData.filter((alumni) => alumni.year === selectedYear);

//   const handleNameClick = (id) => {
//     alert(`Navigate to profile page of alumni with ID: ${id}`);
//   };

//   return (
//     <div className="alumni-container">
//       <h1>Alumni List</h1>

//       {/* Year Filter Dropdown */}
//       <div className="filter-container">
//         <label htmlFor="yearFilter">Filter by Year:</label>
//         <select
//           id="yearFilter"
//           value={selectedYear}
//           onChange={(e) => setSelectedYear(e.target.value)}
//         >
//           {uniqueYears.map((year) => (
//             <option key={year} value={year}>
//               {year}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Alumni List */}
//       <ul className="alumni-list">
//         {filteredAlumni.map((alumni) => (
//           <li
//             key={alumni.id}
//             onClick={() => handleNameClick(alumni.id)}
//             className="alumni-item"
//           >
//             {alumni.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AlumniListPage;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const UserList = ({ type }) => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("");
//   const navigate = useNavigate();

//   const apiUrl =
//     type === "alumni"
//       ? "http://localhost:7070/getAllAlumnis"
//       : "http://localhost:7070/getAllStudents";

//   useEffect(() => {
//     axios
//       .get(apiUrl)
//       .then((response) => {
//         setUsers(type === "alumni" ? response.data.alumni : response.data.students);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError("Failed to load data");
//         setLoading(false);
//       });
//   }, [apiUrl, type]);

//   const handleRowClick = (id) => {
//     navigate(`/profile/${id}`);
//   };

//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(search.toLowerCase()) &&
//     (filter ? (type === "alumni" ? user.passout === parseInt(filter) : user.year === filter) : true)
//   );

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">{type === "alumni" ? "Alumni List" : "Students List"}</h2>
//       <div className="mb-4 flex gap-4">
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded w-1/3"
//         />
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">All</option>
//           {type === "alumni"
//             ? [...new Set(users.map((user) => user.passout))].map((year) => (
//                 <option key={year} value={year}>{year}</option>
//               ))
//             : [...new Set(users.map((user) => user.year))].map((year) => (
//                 <option key={year} value={year}>{year}</option>
//               ))}
//         </select>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">Profile</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Stream</th>
//               <th className="border p-2">{type === "alumni" ? "Passout Year" : "Current Year"}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => (
//               <tr
//                 key={user.id}
//                 className="cursor-pointer hover:bg-gray-100"
//                 onClick={() => handleRowClick(user.id)}
//               >
//                 <td className="border p-2 text-center">
//                   <img
//                     src={user.profilepic || "https://via.placeholder.com/50"}
//                     alt="Profile"
//                     className="w-10 h-10 rounded-full mx-auto"
//                   />
//                 </td>
//                 <td className="border p-2">{user.name}</td>
//                 <td className="border p-2">{user.stream}</td>
//                 <td className="border p-2">{type === "alumni" ? user.passout : user.year}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default UserList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react"; // Placeholder icon
import "../CSS/AlumniListPage.css";

const AlumniListPage = () => {
  const [alumni, setAlumni] = useState([]); // Renamed state
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:7070/getAllAlumnis")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data); // Debugging log
        if (Array.isArray(data.alumni)) {
          setAlumni(data.alumni); // Corrected from `setStudents`
        } else {
          setAlumni([]); // Handle unexpected response format
        }
      })
      .catch((err) => {
        console.error("Error fetching alumni:", err);
        setAlumni([]); // Prevent undefined errors
      });
  }, []);

  // Filter alumni based on search input
  const filteredAlumni = alumni.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.stream.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="alumni-container">
      <h2>Alumni List</h2>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or stream..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="alumni-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Stream</th>
            <th>Passout Year</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map((person) => (
              <tr key={person.id} onClick={() => navigate(`/profile/${person.id}`)}>
                <td>
                  {person.profilepic ? (
                    <img src={person.profilepic} alt="Profile" className="profile-pic" />
                  ) : (
                    <User className="profile-icon" /> // Placeholder icon
                  )}
                </td>
                <td>{person.name}</td>
                <td>{person.stream}</td>
                <td>{person.passout}</td> {/* Updated to show passout year */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-results">No alumni found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AlumniListPage;
