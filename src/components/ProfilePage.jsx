import React, { useState, useEffect } from "react";
import "../CSS/Profile.css";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    aboutMe: "",
    socialMedia: {
      linkedin: "",
      github: "",
      instagram: "",
    },
    profilePicture: "https://via.placeholder.com/150",
  });

  useEffect(() => {
    fetch("http://localhost:7070/getUserProfile") // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setProfileData({
          name: data.name,
          role: data.userrole,
          email: data.email,
          phone: data.mobile || "Not Provided",
          gender: data.gender || "Not Provided",
          address: data.address || "Not Provided",
          aboutMe: data.aboutme || "",
          socialMedia: {
            linkedin: data.linkedin || "",
            github: data.github || "",
            instagram: data.instagram || "",
          },
          profilePicture: "https://via.placeholder.com/150", // Keeping unchanged as per request
        });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleEditClick = () => {
    if (isEditing) {
      fetch("http://localhost:7070/updateUserProfile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      })
        .then((response) => response.json())
        .then((data) => console.log("Profile updated successfully:", data))
        .catch((error) => console.error("Error updating profile:", error));
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      socialMedia: { ...profileData.socialMedia, [name]: value },
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <label htmlFor="imageUpload" className="upload-label">
          <img
            src={profileData.profilePicture}
            alt="Profile"
            className="profile-picture"
          />
        </label>
        <div className="profile-info">
          {isEditing ? (
            <>
              <input type="text" name="name" value={profileData.name} onChange={handleChange} className="edit-input" />
            </>
          ) : (
            <>
              <h2>{profileData.name}</h2>
              <p>{profileData.role}</p>
            </>
          )}
        </div>
      </div>

      <div className="about-me">
        <h3>About Me</h3>
        {isEditing ? (
          <textarea name="aboutMe" value={profileData.aboutMe} onChange={handleChange} className="edit-textarea" />
        ) : (
          <p>{profileData.aboutMe}</p>
        )}
      </div>

      <div className="personal-info">
        <h3>Personal Information</h3>
        <div><strong>Email: </strong>{isEditing ? <input type="email" name="email" value={profileData.email} onChange={handleChange} className="edit-input" /> : <span>{profileData.email}</span>}</div>
        <div><strong>Phone: </strong>{isEditing ? <input type="text" name="phone" value={profileData.phone} onChange={handleChange} className="edit-input" /> : <span>{profileData.phone}</span>}</div>
      </div>

      <div className="social-media">
        <h3>Social Media Handles</h3>
        {isEditing ? (
          <>
            <div><label>LinkedIn: </label><input type="text" name="linkedin" placeholder="LinkedIn URL" value={profileData.socialMedia.linkedin} onChange={handleSocialMediaChange} className="edit-input" /></div>
            <div><label>GitHub: </label><input type="text" name="github" placeholder="GitHub URL" value={profileData.socialMedia.github} onChange={handleSocialMediaChange} className="edit-input" /></div>
            <div><label>Instagram: </label><input type="text" name="instagram" placeholder="Instagram URL" value={profileData.socialMedia.instagram} onChange={handleSocialMediaChange} className="edit-input" /></div>
          </>
        ) : (
          <ul>
            <li>LinkedIn: <a href={profileData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">{profileData.socialMedia.linkedin || "Not Provided"}</a></li>
            <li>GitHub: <a href={profileData.socialMedia.github} target="_blank" rel="noopener noreferrer">{profileData.socialMedia.github || "Not Provided"}</a></li>
            <li>Instagram: <a href={profileData.socialMedia.instagram} target="_blank" rel="noopener noreferrer">{profileData.socialMedia.instagram || "Not Provided"}</a></li>
          </ul>
        )}
      </div>

      <div className="edit-button-container">
        <button onClick={handleEditClick} className="edit-button">{isEditing ? "Save Profile" : "Edit Profile"}</button>
      </div>
    </div>
  );
};

export default ProfilePage;
