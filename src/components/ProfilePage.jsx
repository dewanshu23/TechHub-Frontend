// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../CSS/Profile.css";

// const Profile = () => {
//   const [profileData, setProfileData] = useState({
//     name: "",
//     role: "",
//     aboutMe: "",
//     passout: "",
//     stream: "",
//     email: "",
//     year: "",
//     profilePicture: "/profile.png",
//     socialMedia: {
//       linkedin: "",
//       twitter: "",
//       instagram: "",
//     },
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("user"));

//     if (userData) {
//       setProfileData((prev) => ({
//         ...prev,
//         name: userData.name || "",
//         role: userData.userrole || "",
//         passout: userData.passout || "",
//         year: userData.year || "",
//         stream: userData.stream || "",
//         email: userData.email || "",
//         socialMedia: {
//           linkedin: userData.linkedin || "",
//           github: userData.github || "",
//           instagram: userData.instagram || "",
//         },
//       }));
//     }

//     const storedProfile = JSON.parse(localStorage.getItem("profileData"));
//     if (storedProfile) {
//       setProfileData((prev) => ({ ...prev, ...storedProfile }));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({ ...profileData, [name]: value });
//   };

//   const handleSocialMediaChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({
//       ...profileData,
//       socialMedia: { ...profileData.socialMedia, [name]: value },
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileData({ ...profileData, profilePicture: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.post("/api/updateProfile", profileData);
//       if (response.status === 200) {
//         localStorage.setItem("profileData", JSON.stringify(profileData));
//         alert("Profile updated successfully");
//         setIsEditing(false);
//       }
//     } catch (error) {
//       alert("Error updating profile");
//     }
//   };
//   console.log(profileData);

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <div className="profile-picture">
//           <label htmlFor="imageUpload" className="upload-label">
//             <img
//               src={profileData.profilePicture}
//               alt="Profile"
//               className="profile-picture"
//             />
//             {isEditing && (
//               <input
//                 type="file"
//                 id="imageUpload"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 style={{ display: "none" }}
//               />
//             )}
//           </label>
//         </div>

//         <div className="profile-info-details">
//           <div className="line-one">
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="name"
//                 value={profileData.name}
//                 onChange={handleChange}
//                 className="edit-input"
//               />
//             ) : (
//               <h2>{profileData.name}</h2>
//             )}
//             <span className="chip">{profileData.role}</span>
//           </div>

//           <div className="line-two">
//             {isEditing ? (
//               <textarea
//                 name="aboutMe"
//                 value={profileData.aboutMe}
//                 onChange={handleChange}
//                 className="edit-textarea"
//               />
//             ) : (
//               <p>{profileData.aboutMe || "No description provided."}</p>
//             )}
//           </div>

//           <div className="line-three">
//             <span>
//               <strong>{profileData.role === "Student" ? "Year" : "Passout"}:</strong>{" "}
//               {/* <strong>:</strong>{" "} */}
//               {profileData.year}

//             </span>
//             <span>
//               <strong>Stream:</strong> {profileData.stream}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="personal-info">
//         <h3>Personal Information</h3>

//         <div>
//           <strong>Email:</strong>{" "}
//           {isEditing ? (
//             <input
//               type="email"
//               name="email"
//               value={profileData.email}
//               onChange={handleChange}
//               className="edit-input"
//             />
//           ) : (
//             <span>{profileData.email}</span>
//           )}
//         </div>

//         {["linkedin", "github", "instagram"].map((platform) => (
//           <div key={platform}>
//             <strong>{platform.charAt(0).toUpperCase() + platform.slice(1)}:</strong>{" "}
//             {isEditing ? (
//               <input
//                 type="text"
//                 name={platform}
//                 value={profileData.socialMedia[platform]}
//                 onChange={handleSocialMediaChange}
//                 className="edit-input"
//               />
//             ) : (
//               <a
//                 href={profileData.socialMedia[platform]}
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 {profileData.socialMedia[platform] || "Not Provided"}
//               </a>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="button-row">
//         <button onClick={isEditing ? handleSave : handleEditToggle}>
//           {isEditing ? "Save" : "Edit Profile"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../CSS/Profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    id: "",
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
      twitter: "",
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(profileData);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const storedProfile = JSON.parse(localStorage.getItem("profileData"));
console.log(profileData);

    if (userData) {
      const updated = {
        id: userData.id,
        name: userData.name || "",
        role: userData.userrole || "",
        passout: userData.passout || "",
        year: userData.year || "",
        stream: userData.stream || "",
        email: userData.email || "", 
        socialMedia: {
          linkedin: userData.linkedin || "",
          twitter: userData.twitter || "",
         
        },
      
      };
      // console.log(updated.linkedin)
      setProfileData((prev) => ({ ...prev, ...updated }));
      setFormData((prev) => ({ ...prev, ...updated }));
    }

    if (storedProfile) {
      setProfileData((prev) => ({ ...prev, ...storedProfile }));
      setFormData((prev) => ({ ...prev, ...storedProfile }));
    }
  });
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialMedia: { ...formData.socialMedia, [name]: value },
    });
  };
  // console.log(formData);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  // const handleChangePassword = async ()=>{
  //   navigate('/change-password', { state: { email: profileData.email  } });
  // }

  const handleSave = async () => {
    try {
      const response = await axios.post("/api/updateProfile", formData);
      if (response.status === 200) {
        localStorage.setItem("profileData", JSON.stringify(formData));
        setProfileData(formData);
        setShowModal(false);
        alert("Profile updated successfully");
      }
    } catch (error) {
      alert("Error updating profile");
    }
  };

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
            <p>{profileData.aboutMe}</p>
          </div>

          <div className={styles.lineThree}>
              {/* <strong>{profileData.role === "Student" ? "Year" : "Passout"}:</strong> {profileData.year || profileData.passout} */}
            
            <span>
              {/* <strong>Stream:</strong> {profileData.stream} */}
              {profileData.role !== "Admin" && (
                <div>
                  <strong>Stream :</strong> {profileData.stream}
                </div>
              )}
            </span>
            <span>
              <strong>
                {profileData.role === "Student"
                  ? `Year : `
                  : profileData.role === "Alumni"
                  ? "Passout : "
                  : null}
                
              </strong>
              {profileData.role === "Student"
                ? profileData.year
                : profileData.role === "Alumni"
                ? profileData.passout
                : null}
            </span>
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

      <div className={styles.buttonRow}>
        {/* <button onClick={() => setShowModal(true)}>Edit Profile</button>
        <button onClick={handleChangePassword}>Change Password</button> */}
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Profile</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Name"
            />
            <textarea
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleFormChange}
              placeholder="About Me"
            />
            <input
              type="text"
              name="stream"
              value={formData.stream}
              onChange={handleFormChange}
              placeholder="Stream"
            />
            {formData.role === "Student" ? (
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleFormChange}
                placeholder="Year"
              />
            ) : (
              <input
                type="text"
                name="passout"
                value={formData.passout}
                onChange={handleFormChange}
                placeholder="Passout"
              />
            )}

            <input
              type="text"
              name="linkedin"
              value={formData.socialMedia.linkedin}
              onChange={handleSocialChange}
              placeholder="LinkedIn"
            />
            <input
              type="text"
              name="twitter"
              value={formData.socialMedia.twitter}
              onChange={handleSocialChange}
              placeholder="twitter"
            />

            <label>
              Upload Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>

            <div className={styles.modalButtons}>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
