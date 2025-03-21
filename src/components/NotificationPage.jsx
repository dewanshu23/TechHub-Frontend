// // import React, { useState } from "react";
// // import NotificationForm from "./NotificationForm";
// // import { FaCalendarAlt, FaBullhorn, FaTrash } from "react-icons/fa";
// // import '../CSS/Notification.css'
// // const NotificationPage = () => {
// //   const [notifications, setNotifications] = useState([
// //     {
// //       type: "Event",
// //       title: "Tech Fest 2025",
// //       description: "Annual college tech festival with various competitions.",
// //       eventStart: "2025-03-10",
// //       eventEnd: "2025-03-12",
// //     },
// //     {
// //       type: "Announcement",
// //       title: "Exam Schedule Released",
// //       description: "Semester 6 exam dates have been published on the website.",
// //     },
// //   ]);

// //   const [showForm, setShowForm] = useState(false);
// //   const [selectedNotification, setSelectedNotification] = useState(null);

// //   // Add Notification
// //   const handleAddNotification = (newNotification) => {
// //     setNotifications([...notifications, newNotification]);
// //     setShowForm(false);
// //   };

// //   // Remove Notification
// //   const handleRemoveNotification = (index) => {
// //     const updatedNotifications = notifications.filter((_, i) => i !== index);
// //     setNotifications(updatedNotifications);
// //   };

// //   return (
// //     <div className="notification-container">
// //       <h1 className="notification-title">College Notifications</h1>

// //       {/* Button to Open Notification Form */}
// //       <button className="add-notification-btn" onClick={() => setShowForm(true)}>
// //         + Add Notification
// //       </button>

// //       {/* Modal for Notification Form */}
// //       {showForm && (
// //         <div className="modal-overlay">
// //           <div className="modal-content">
// //             <h2 className="modal-title">Create Notification</h2>
// //             <NotificationForm onAddNotification={handleAddNotification} />
// //             <button className="close-btn" onClick={() => setShowForm(false)}>
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Notifications List */}
// //       <div className="notification-list">
// //         {notifications.map((item, index) => (
// //           <div className="notification-card" key={index}>
// //             {/* Notification Icon */}
// //             {item.type === "Event" ? (
// //               <FaCalendarAlt className="notification-icon event-icon" />
// //             ) : (
// //               <FaBullhorn className="notification-icon announcement-icon" />
// //             )}

// //             {/* Notification Details */}
// //             <div className="notification-details" onClick={() => setSelectedNotification(item)}>
// //               <h3 className="notification-title-text">{item.title}</h3>
// //               {item.eventStart && item.eventEnd && (
// //                 <p className="event-dates">
// //                   {item.eventStart} - {item.eventEnd}
// //                 </p>
// //               )}
// //             </div>

// //             {/* Remove Button */}
// //             <FaTrash className="remove-btn" onClick={() => handleRemoveNotification(index)} />
// //           </div>
// //         ))}
// //       </div>

// //       {/* Modal for Notification Details */}
// //       {selectedNotification && (
// //         <div className="modal-overlay">
// //           <div className="modal-content">
// //             <h2 className="modal-title">{selectedNotification.title}</h2>
// //             <p>{selectedNotification.description}</p>
// //             {selectedNotification.eventStart && selectedNotification.eventEnd && (
// //               <p>
// //                 <strong>Event Duration:</strong> {selectedNotification.eventStart} to{" "}
// //                 {selectedNotification.eventEnd}
// //               </p>
// //             )}
// //             <button className="close-btn" onClick={() => setSelectedNotification(null)}>
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default NotificationPage;


// import React, { useState } from "react";
// import NotificationForm from "./NotificationForm";
// import { FaCalendarAlt, FaBullhorn, FaTrash } from "react-icons/fa";
// import "../CSS/Notification.css";

// const NotificationPage = () => {
//   const [notifications, setNotifications] = useState([
//     {
//       type: "Event",
//       title: "Tech Fest 2025",
//       description: "Annual college tech festival with various competitions.",
//       eventStart: "2025-03-10",
//       eventEnd: "2025-03-12",
//     },
//     {
//       type: "Announcement",
//       title: "Exam Schedule Released",
//       description: "Semester 6 exam dates have been published on the website.",
//     },
//   ]);

//   const [showForm, setShowForm] = useState(false);
//   const [selectedNotification, setSelectedNotification] = useState(null);

//   const userRole = localStorage.getItem("userRole"); // Get user role

//   // Add Notification
//   const handleAddNotification = (newNotification) => {
//     setNotifications([...notifications, newNotification]);
//     setShowForm(false);
//   };

//   // Remove Notification (Only Admins)
//   const handleRemoveNotification = (index) => {
//     if (userRole === "Admin") {
//       const updatedNotifications = notifications.filter((_, i) => i !== index);
//       setNotifications(updatedNotifications);
//     } else {
//       alert("You are not authorized to delete notifications.");
//     }
//   };

//   return (
//     <div className="notification-container">
//       <h1 className="notification-title">College Notifications</h1>

//       {/* Show Add Notification Button ONLY for Admins */}
//       {userRole === "Admin" && (
//         <button className="add-notification-btn" onClick={() => setShowForm(true)}>
//           + Add Notification
//         </button>
//       )}

//       {/* Modal for Notification Form */}
//       {showForm && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2 className="modal-title">Create Notification</h2>
//             <NotificationForm onAddNotification={handleAddNotification} />
//             <button className="close-btn" onClick={() => setShowForm(false)}>Close</button>
//           </div>
//         </div>
//       )}

//       {/* Notifications List */}
//       <div className="notification-list">
//         {notifications.map((item, index) => (
//           <div className="notification-card" key={index}>
//             {/* Notification Icon */}
//             {item.type === "Event" ? (
//               <FaCalendarAlt className="notification-icon event-icon" />
//             ) : (
//               <FaBullhorn className="notification-icon announcement-icon" />
//             )}

//             {/* Notification Details */}
//             <div className="notification-details" onClick={() => setSelectedNotification(item)}>
//               <h3 className="notification-title-text">{item.title}</h3>
//               {item.eventStart && item.eventEnd && (
//                 <p className="event-dates">
//                   {item.eventStart} - {item.eventEnd}
//                 </p>
//               )}
//             </div>

//             {/* Remove Button (Only Admins) */}
//             {userRole === "Admin" && (
//               <FaTrash className="remove-btn" onClick={() => handleRemoveNotification(index)} />
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Modal for Notification Details */}
//       {selectedNotification && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2 className="modal-title">{selectedNotification.title}</h2>
//             <p>{selectedNotification.description}</p>
//             {selectedNotification.eventStart && selectedNotification.eventEnd && (
//               <p>
//                 <strong>Event Duration:</strong> {selectedNotification.eventStart} to{" "}
//                 {selectedNotification.eventEnd}
//               </p>
//             )}
//             <button className="close-btn" onClick={() => setSelectedNotification(null)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationPage;




import React, { useState, useEffect } from "react";
import NotificationForm from "./NotificationForm";
import { FaCalendarAlt, FaBullhorn, FaTrash } from "react-icons/fa";
import "../CSS/Notification.css";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      type: "Event",
      title: "Tech Fest 2025",
      description: "Annual college tech festival with various competitions.",
      eventStart: "2025-03-10",
      eventEnd: "2025-03-12",
    },
    {
      type: "Announcement",
      title: "Exam Schedule Released",
      description: "Semester 6 exam dates have been published on the website.",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [userRole, setUserRole] = useState("");
  const user = JSON.parse(localStorage.getItem("user")); // Convert string to object
  // const\ userRole = user ? user.userrole : null; // Get userrole or return null if user is not found


  useEffect(() => {
    setUserRole(user.userrole); // Default to Student if not found
  }, []);

  // Add Notification
  const handleAddNotification = (newNotification) => {
    setNotifications([...notifications, newNotification]);
    setShowForm(false);
  };

  // Remove Notification with Confirmation (Only Admins)
  const handleRemoveNotification = (index) => {
    if (userRole !== "Admin") {
      alert("You are not authorized to delete notifications.");
      return;
    }
    const confirmDelete = window.confirm("Are you sure you want to delete this notification?");
    if (confirmDelete) {
      setNotifications(notifications.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="notification-container">
      <h1 className="notification-title">College Notifications</h1>

      {/* Show Add Notification Button ONLY for Admins and Teachers */}
      {(userRole === "Admin" || userRole === "Teacher") && (
        <button className="add-notification-btn" onClick={() => setShowForm(true)}>
          + Add Notification
        </button>
      )}

      {/* Modal for Notification Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Create Notification</h2>
            <NotificationForm onAddNotification={handleAddNotification} />
            <button className="close-btn" onClick={() => setShowForm(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="notification-list">
        {notifications.map((item, index) => (
          <div className={`notification-card ${item.type.toLowerCase()}`} key={index}>
            {/* Notification Icon */}
            {item.type === "Event" ? (
              <FaCalendarAlt className="notification-icon event-icon" />
            ) : (
              <FaBullhorn className="notification-icon announcement-icon" />
            )}

            {/* Notification Details */}
            <div className="notification-details" onClick={() => setSelectedNotification(item)}>
              <h3 className="notification-title-text">{item.title}</h3>
              {item.eventStart && item.eventEnd && (
                <p className="event-dates">
                  {item.eventStart} - {item.eventEnd}
                </p>
              )}
            </div>

            {/* Remove Button (Only Admins) */}
            {userRole === "Admin" && (
              <FaTrash className="remove-btn" onClick={() => handleRemoveNotification(index)} />
            )}
          </div>
        ))}
      </div>

      {/* Modal for Notification Details */}
      {selectedNotification && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">{selectedNotification.title}</h2>
            <p>{selectedNotification.description}</p>
            {selectedNotification.eventStart && selectedNotification.eventEnd && (
              <p>
                <strong>Event Duration:</strong> {selectedNotification.eventStart} to{" "}
                {selectedNotification.eventEnd}
              </p>
            )}
            <button className="close-btn" onClick={() => setSelectedNotification(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
