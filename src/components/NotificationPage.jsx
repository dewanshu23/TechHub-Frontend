import React, { useState } from "react";
import NotificationForm from "./NotificationForm";
import { FaCalendarAlt, FaBullhorn, FaTrash } from "react-icons/fa";
import '../CSS/Notification.css'
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

  // Add Notification
  const handleAddNotification = (newNotification) => {
    setNotifications([...notifications, newNotification]);
    setShowForm(false);
  };

  // Remove Notification
  const handleRemoveNotification = (index) => {
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);
  };

  return (
    <div className="notification-container">
      <h1 className="notification-title">College Notifications</h1>

      {/* Button to Open Notification Form */}
      <button className="add-notification-btn" onClick={() => setShowForm(true)}>
        + Add Notification
      </button>

      {/* Modal for Notification Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Create Notification</h2>
            <NotificationForm onAddNotification={handleAddNotification} />
            <button className="close-btn" onClick={() => setShowForm(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="notification-list">
        {notifications.map((item, index) => (
          <div className="notification-card" key={index}>
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

            {/* Remove Button */}
            <FaTrash className="remove-btn" onClick={() => handleRemoveNotification(index)} />
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
            <button className="close-btn" onClick={() => setSelectedNotification(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
