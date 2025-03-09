import React, { useState } from "react";

const NotificationForm = ({ onAddNotification }) => {
  const [formData, setFormData] = useState({
    type: "Event",
    title: "",
    description: "",
    eventStart: "",
    eventEnd: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNotification(formData);

    setFormData({
      type: "Event",
      title: "",
      description: "",
      eventStart: "",
      eventEnd: "",
    });
  };

  return (
    <form className="notification-form" onSubmit={handleSubmit}>
      <label>Type:</label>
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="Event">Event</option>
        <option value="Announcement">Announcement</option>
      </select>

      <label>Title:</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required />

      <label>Description:</label>
      <textarea name="description" value={formData.description} onChange={handleChange} required />

      {formData.type === "Event" && (
        <>
          <label>Start Date:</label>
          <input type="date" name="eventStart" value={formData.eventStart} onChange={handleChange} required />

          <label>End Date:</label>
          <input type="date" name="eventEnd" value={formData.eventEnd} onChange={handleChange} required />
        </>
      )}

      <button className="submit-btn" type="submit">Submit</button>
    </form>
  );
};

export default NotificationForm;
