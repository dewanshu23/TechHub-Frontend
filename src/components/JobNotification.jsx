import React, { useState, useRef, useEffect } from "react";
import { FaBriefcase, FaCalendarAlt, FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";
import "../CSS/JobNotification.css";

const JobNotification = () => {
  // State to store job notifications
  const [notifications, setNotifications] = useState([]);
  // State to track selected notification for modal display
  const [selectedNotification, setSelectedNotification] = useState(null);
  // State to control the add job modal
  const [isAdding, setIsAdding] = useState(false);
  // State for new job form inputs
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    end_date: "",
  });
  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reference for modal focus handling
  const modalRef = useRef(null);
  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user ? user.userrole : null;

  // Fetch job notifications on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Function to fetch job notifications from API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:7070/getAllPosts");
      // Filter notifications to only include job-related posts
      const jobs = response.data.data.filter((post) => post.type === "j");
      setNotifications(jobs);
    } catch (err) {
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  // Open add job modal
  const handleAddJobClick = () => {
    setIsAdding(true);
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  // Handle form submission to add new job
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newJob.title.trim() === "" || newJob.description.trim() === "") return;

    const user = JSON.parse(localStorage.getItem("user")); // Get user details
    const userId = user ? user.id : 1; // Fallback user_id (adjust as needed)

    try {
        await axios.post("http://localhost:7070/post", {
            user_id: userId, // Ensure correct user_id
            title: newJob.title,
            description: newJob.description,
            content: newJob.description, // Assuming content is same as description
            start_date: "", // Keeping it empty as per API
            end_date: newJob.end_date,
            type: "j", // Fixed type for job notifications
            status: "r", // Default status
            for_user: "all", // Default visibility
        });

        setIsAdding(false);
        setNewJob({ title: "", description: "", end_date: "" });
        fetchJobs(); // Refresh job list after successful submission
    } catch (err) {
        setError("Failed to add job notification");
    }
};

  return (
    <div className="job-container">
      <h1>Job Notifications</h1>

      {/* Show "Add Job Notification" button only for Admin and Teacher */}
      {(userRole === "Admin" || userRole === "Teacher") && (
        <button onClick={handleAddJobClick} className="add-job-btn">
          <FaPlus /> Add Job Notification
        </button>
      )}

      {/* Show loading state or error messages */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="job-list">
          {notifications.map((item) => (
            <div
              key={item.id}
              tabIndex="0"
              onClick={() => setSelectedNotification(item)}
              className="job-card"
            >
              <FaBriefcase className="job-icon" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.end_date && <p><strong>Deadline:</strong> {new Date(item.end_date).toLocaleDateString()}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for viewing job details */}
      {selectedNotification && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef} tabIndex="-1">
            <button onClick={() => setSelectedNotification(null)} className="close-icon">
              <FaTimes />
            </button><br /><br />
            <h2>{selectedNotification.title}</h2>
            <p>{selectedNotification.description}</p>
            {selectedNotification.end_date && (
              <p><strong>Application Deadline:</strong> {new Date(selectedNotification.end_date).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      )}

      {/* Modal for adding a new job */}
      {isAdding && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef} tabIndex="-1">
            <button onClick={() => setIsAdding(false)} className="close-icon">
              <FaTimes />
            </button><br /><br />
            <h2>Add New Job Notification</h2>
            <form onSubmit={handleSubmit} className="job-form">
              <label>Title:</label>
              <input type="text" name="title" value={newJob.title} onChange={handleFormChange} required />

              <label>Description:</label>
              <textarea name="description" value={newJob.description} onChange={handleFormChange} required />

              <label>Deadline:</label>
              <input type="date" name="end_date" value={newJob.end_date} onChange={handleFormChange} required />

              <button type="submit" className="submit-btn">Add</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobNotification;