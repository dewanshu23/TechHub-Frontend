import React, { useState } from "react";
import "../CSS/AlumniListPage.css";

const AlumniListPage = () => {
  const [selectedYear, setSelectedYear] = useState("All");

  // Dummy data for alumni
  const alumniData = [
    { name: "John Doe", year: 2020, id: 1 },
    { name: "Jane Smith", year: 2021, id: 2 },
    { name: "Michael Johnson", year: 2020, id: 3 },
    { name: "Emily Davis", year: 2022, id: 4 },
    { name: "Chris Brown", year: 2021, id: 5 },
    { name: "Patricia Wilson", year: 2022, id: 6 },
  ];

  // Extract unique years for filtering
  const uniqueYears = [
    "All",
    ...Array.from(new Set(alumniData.map((alumni) => alumni.year))),
  ];

  // Filter alumni based on selected year
  const filteredAlumni =
    selectedYear === "All"
      ? alumniData
      : alumniData.filter((alumni) => alumni.year === selectedYear);

  const handleNameClick = (id) => {
    alert(`Navigate to profile page of alumni with ID: ${id}`);
  };

  return (
    <div className="alumni-container">
      <h1>Alumni List</h1>

      {/* Year Filter Dropdown */}
      <div className="filter-container">
        <label htmlFor="yearFilter">Filter by Year:</label>
        <select
          id="yearFilter"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Alumni List */}
      <ul className="alumni-list">
        {filteredAlumni.map((alumni) => (
          <li
            key={alumni.id}
            onClick={() => handleNameClick(alumni.id)}
            className="alumni-item"
          >
            {alumni.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlumniListPage;
