import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Profile.css";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    role: "",
    aboutMe: "",
    passout: "",
    stream: "",
    email: "",
    year: "",
    profilePicture: "/profile.png",
    socialMedia: {
      linkedin: "",
      github: "",
      instagram: "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setProfileData((prev) => ({
        ...prev,
        name: userData.name || "",
        role: userData.userrole || "",
        passout: userData.passout || "",
        year: userData.year || "",
        stream: userData.stream || "",
        email: userData.email || "",
        socialMedia: {
          linkedin: userData.linkedin || "",
          github: userData.github || "",
          instagram: userData.instagram || "",
        },
      }));
    }

    const storedProfile = JSON.parse(localStorage.getItem("profileData"));
    if (storedProfile) {
      setProfileData((prev) => ({ ...prev, ...storedProfile }));
    }
  }, []);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("/api/updateProfile", profileData);
      if (response.status === 200) {
        localStorage.setItem("profileData", JSON.stringify(profileData));
        alert("Profile updated successfully");
        setIsEditing(false);
      }
    } catch (error) {
      alert("Error updating profile");
    }
  };
  console.log(profileData);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture">
          <label htmlFor="imageUpload" className="upload-label">
            <img
              src={profileData.profilePicture}
              alt="Profile"
              className="profile-picture"
            />
            {isEditing && (
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            )}
          </label>
        </div>

        <div className="profile-info-details">
          <div className="line-one">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="edit-input"
              />
            ) : (
              <h2>{profileData.name}</h2>
            )}
            <span className="chip">{profileData.role}</span>
          </div>

          <div className="line-two">
            {isEditing ? (
              <textarea
                name="aboutMe"
                value={profileData.aboutMe}
                onChange={handleChange}
                className="edit-textarea"
              />
            ) : (
              <p>{profileData.aboutMe || "No description provided."}</p>
            )}
          </div>

          <div className="line-three">
            <span>
              <strong>{profileData.role === "Student" ? "Year" : "Passout"}:</strong>{" "}
              {/* <strong>:</strong>{" "} */}
              {profileData.year}
              
              
            </span>
            <span>
              <strong>Stream:</strong> {profileData.stream}
            </span>
          </div>
        </div>
      </div>

      <div className="personal-info">
        <h3>Personal Information</h3>

        <div>
          <strong>Email:</strong>{" "}
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="edit-input"
            />
          ) : (
            <span>{profileData.email}</span>
          )}
        </div>

        {["linkedin", "github", "instagram"].map((platform) => (
          <div key={platform}>
            <strong>{platform.charAt(0).toUpperCase() + platform.slice(1)}:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name={platform}
                value={profileData.socialMedia[platform]}
                onChange={handleSocialMediaChange}
                className="edit-input"
              />
            ) : (
              <a
                href={profileData.socialMedia[platform]}
                target="_blank"
                rel="noreferrer"
              >
                {profileData.socialMedia[platform] || "Not Provided"}
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="button-row">
        <button onClick={isEditing ? handleSave : handleEditToggle}>
          {isEditing ? "Save" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;

