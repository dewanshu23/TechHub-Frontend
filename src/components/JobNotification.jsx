// import React, { useState, useRef, useEffect } from "react";
// import { FaBriefcase, FaCalendarAlt, FaPlus, FaTimes } from "react-icons/fa";
// import "../CSS/JobNotification.css"; // Import CSS

// const JobNotification = () => {
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       title: "Software Engineer - Google",
//       description: "Google is hiring freshers for a Software Engineer role. Required skills: React, Node.js, Python.",
//       type: "Job",
//       deadline: "March 5, 2025",
//     },
//     {
//       id: 2,
//       title: "Data Analyst - Microsoft",
//       description: "Microsoft is looking for Data Analysts. Required skills: SQL, Power BI, Python, Excel.",
//       type: "Job",
//       deadline: "April 5, 2025",
//     },
//     {
//       id: 3,
//       title: "Cloud Computing Workshop",
//       description: "AWS is conducting a workshop on Cloud Computing. Limited seats available!",
//       type: "Job",
//       date: "March 25, 2025",
//     },
//   ]);

//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [newJob, setNewJob] = useState({
//     title: "",
//     description: "",
//     type: "Job",
//     deadline: "",
//   });

//   const modalRef = useRef(null);

//   useEffect(() => {
//     if (selectedNotification || isAdding) {
//       modalRef.current?.focus();
//     }
//   }, [selectedNotification, isAdding]);

//   const handleNotificationClick = (notification) => {
//     setSelectedNotification(notification);
//   };

//   const handleAddJobClick = () => {
//     setIsAdding(true);
//   };

//   const handleFormChange = (e) => {
//     setNewJob({ ...newJob, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (newJob.title.trim() === "" || newJob.description.trim() === "") return;

//     setNotifications([...notifications, { ...newJob, id: notifications.length + 1 }]);
//     setIsAdding(false);
//     setNewJob({ title: "", description: "", type: "Job", deadline: "" });
//   };

//   return (
//     <div className="job-container">
//       <h1>Job Notifications</h1>

//       <button onClick={handleAddJobClick} className="add-job-btn">
//         <FaPlus /> Add Job Notification
//       </button>

//       <div className="job-list">
//         {notifications.map((item) => (
//           <div
//             key={item.id}
//             tabIndex="0"
//             onClick={() => handleNotificationClick(item)}
//             className="job-card"
//             aria-label={`View details for ${item.title}`}
//           >
//             {item.type === "Job" ? (
//               <FaBriefcase className="job-icon" />
//             ) : (
//               <FaCalendarAlt className="event-icon" />
//             )}
//             <div>
//               <h3>{item.title}</h3>
//               <p>{item.description}</p>
//               {item.deadline && <p><strong>Deadline:</strong> {item.deadline}</p>}
//               {item.date && <p><strong>Date:</strong> {item.date}</p>}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for Notification Details */}
//       {selectedNotification && (
//         <div className="modal-overlay">
//           <div className="modal-content" ref={modalRef} tabIndex="-1">
//             <button onClick={() => setSelectedNotification(null)} className="close-icon">
//               <FaTimes />
//             </button>
//             <h2>{selectedNotification.title}</h2>
//             <p>{selectedNotification.description}</p>
//             {selectedNotification.deadline && (
//               <p><strong>Application Deadline:</strong> {selectedNotification.deadline}</p>
//             )}
//             {selectedNotification.date && (
//               <p><strong>Event Date:</strong> {selectedNotification.date}</p>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Modal for Adding New Job */}
//       {isAdding && (
//         <div className="modal-overlay">
//           <div className="modal-content" ref={modalRef} tabIndex="-1">
//             <button onClick={() => setIsAdding(false)} className="close-icon">
//               <FaTimes />
//             </button>
//             <h2>Add New Job Notification</h2>
//             <form onSubmit={handleSubmit} className="job-form">
//               <label>Title:</label>
//               <input type="text" name="title" value={newJob.title} onChange={handleFormChange} required />

//               <label>Description:</label>
//               <textarea name="description" value={newJob.description} onChange={handleFormChange} required />

//               {newJob.type === "Job" && (
//                 <>
//                   <label>Deadline:</label>
//                   <input type="date" name="deadline" value={newJob.deadline} onChange={handleFormChange} />
//                 </>
//               )}

//               {newJob.type === "Event" && (
//                 <>
//                   <label>Event Date:</label>
//                   <input type="date" name="date" value={newJob.date || ""} onChange={handleFormChange} />
//                 </>
//               )}

//               <button type="submit" className="submit-btn">Add</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobNotification;


import React, { useState, useRef, useEffect } from "react";
import { FaBriefcase, FaCalendarAlt, FaPlus, FaTimes } from "react-icons/fa";
import "../CSS/JobNotification.css"; // Import CSS

const JobNotification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Software Engineer - Google",
      description: "Google is hiring freshers for a Software Engineer role. Required skills: React, Node.js, Python.",
      type: "Job",
      deadline: "March 5, 2025",
    },
    {
      id: 2,
      title: "Data Analyst - Microsoft",
      description: "Microsoft is looking for Data Analysts. Required skills: SQL, Power BI, Python, Excel.",
      type: "Job",
      deadline: "April 5, 2025",
    },
    {
      id: 3,
      title: "Cloud Computing Workshop",
      description: "AWS is conducting a workshop on Cloud Computing. Limited seats available!",
      type: "Job",
      date: "March 25, 2025",
    },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    type: "Job",
    deadline: "",
  });

  const modalRef = useRef(null);

  // Fetch user role from local storage
  const user = JSON.parse(localStorage.getItem("user")); // Convert string to object
  const userRole = user ? user.userrole : null; // Get userrole or return null if user is not found



  useEffect(() => {
    if (selectedNotification || isAdding) {
      modalRef.current?.focus();
    }
  }, [selectedNotification, isAdding]);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleAddJobClick = () => {
    setIsAdding(true);
  };

  const handleFormChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newJob.title.trim() === "" || newJob.description.trim() === "") return;

    setNotifications([...notifications, { ...newJob, id: notifications.length + 1 }]);
    setIsAdding(false);
    setNewJob({ title: "", description: "", type: "Job", deadline: "" });
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

      <div className="job-list">
        {notifications.map((item) => (
          <div
            key={item.id}
            tabIndex="0"
            onClick={() => handleNotificationClick(item)}
            className="job-card"
            aria-label={`View details for ${item.title}`}
          >
            {item.type === "Job" ? (
              <FaBriefcase className="job-icon" />
            ) : (
              <FaCalendarAlt className="event-icon" />
            )}
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.deadline && <p><strong>Deadline:</strong> {item.deadline}</p>}
              {item.date && <p><strong>Date:</strong> {item.date}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Notification Details */}
      {selectedNotification && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef} tabIndex="-1">
            <button onClick={() => setSelectedNotification(null)} className="close-icon">
              <FaTimes />
            </button>
            <h2>{selectedNotification.title}</h2>
            <p>{selectedNotification.description}</p>
            {selectedNotification.deadline && (
              <p><strong>Application Deadline:</strong> {selectedNotification.deadline}</p>
            )}
            {selectedNotification.date && (
              <p><strong>Event Date:</strong> {selectedNotification.date}</p>
            )}
          </div>
        </div>
      )}

      {/* Modal for Adding New Job */}
      {isAdding && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef} tabIndex="-1">
            <button onClick={() => setIsAdding(false)} className="close-icon">
              <FaTimes />
            </button>
            <h2>Add New Job Notification</h2>
            <form onSubmit={handleSubmit} className="job-form">
              <label>Title:</label>
              <input type="text" name="title" value={newJob.title} onChange={handleFormChange} required />

              <label>Description:</label>
              <textarea name="description" value={newJob.description} onChange={handleFormChange} required />

              {newJob.type === "Job" && (
                <>
                  <label>Deadline:</label>
                  <input type="date" name="deadline" value={newJob.deadline} onChange={handleFormChange} />
                </>
              )}

              {newJob.type === "Event" && (
                <>
                  <label>Event Date:</label>
                  <input type="date" name="date" value={newJob.date || ""} onChange={handleFormChange} />
                </>
              )}

              <button type="submit" className="submit-btn">Add</button>
            </form>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default JobNotification;
