import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../CSS/Profile.module.css";

const Profile = () => {
  const { state } = useLocation(); // Access navigation state
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
          twittergithub: "",
        },
    });

  


  
  useEffect(() => {
    if (state) {
      // Populate from passed alumni data
      const updated = {
        name: state.name || "",
        role: state.userrole || "Alumni",
        aboutMe: state.aboutme || "",
        passout: state.passout || "",
        stream: state.stream || "",
        email: state.email || "",
        year: state.year, // Alumni doesn't use "year"
        profilePicture: state.profilepic || "/profile.png",
        socialMedia: {
          linkedin: state.linkedin || "",
          twitter: state.twitter || "",
         
        },
      };
      setProfileData((prev) => ({ ...prev, ...updated }));
    } else {
      // Fallback to logged-in user data
      const userData = JSON.parse(localStorage.getItem("user"));
      const storedProfile = JSON.parse(localStorage.getItem("profileData"));

      if (userData) {
        const updated = {
          name: userData.name || "",
          role: userData.userrole || "",
          passout: userData.passout || "",
          year: userData.year || "",
          stream: userData.stream || "",
          email: userData.email || "",
          profilePicture: userData.profilepic || "/profile.png",
          socialMedia: {
            linkedin: userData.linkedin || "",
            twitter: userData.twitter || "",
          },
        };
        setProfileData((prev) => ({ ...prev, ...updated }));
      }

      if (storedProfile) {
        setProfileData((prev) => ({ ...prev, ...storedProfile }));
      }
    }
  }, [state]);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.profilePicture}>
          <img
            src={profileData.profilePicture}
            alt="Profile"
            className={styles.profilePicture}
          />
        </div>

        <div className={styles.profileInfoDetails}>
          <div className={styles.lineOne}>
            <h2>{profileData.name}</h2>
            <span className={styles.chip}>{profileData.role}</span>
          </div>

          <div className={styles.lineTwo}>
            <p>{profileData.aboutMe || ""}</p>
          </div>

          <div className={styles.lineThree}>
            {profileData.role !== "Admin" && profileData.stream && (
              <div>
                <strong>Stream:</strong> {profileData.stream}
              </div>
            )}
            <div>
              <strong>
                {profileData.role === "Student"
                  ? "Year:"
                  : profileData.role === "Alumni"
                  ? "Passout:"
                  : ""}
              </strong>{" "}
              {profileData.role === "Student"
                ? profileData.year
                : profileData.role === "Alumni"
                ? profileData.passout
                : ""}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.personalInfo}>
        <h3>Personal Information</h3>
        <div>
          <strong>Email:</strong> {profileData.email}
        </div>

        {["linkedin", "twitter"].map((platform) => (
          <div key={platform}>
            <strong>
              {platform.charAt(0).toUpperCase() + platform.slice(1)}:
            </strong>{" "}
            <a
              href={profileData.socialMedia[platform]}
              target="_blank"
              rel="noreferrer"
            >
              {profileData.socialMedia[platform] || "Not Provided"}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
