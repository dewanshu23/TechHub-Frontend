// import React, { useState } from "react";
// import "../CSS/Profile.css";

// const ProfilePage = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: "Neeraj Chopra",
//     role: "Student",
//         email: "Neeraj@example.com",
//     phone: "+91 12345 67890",
//     gender: "Male",
//     address: "XYZ Street, City",
//     aboutMe: "I am a computer science student with a passion for web development.",
//     socialMedia: {
//       linkedin: "",
//       github: "",
//       instagram: "",
//     },
//     profilePicture: "https://via.placeholder.com/150",
//   });

//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//   };

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

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileData({ ...profileData, profilePicture: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="profile-container">
//       {/* Profile Header */}
//       <div className="profile-header">
//         <label htmlFor="imageUpload" className="upload-label">
//           <img
//             src={profileData.profilePicture}
//             alt="Profile"
//             className="profile-picture"
//           />
//           {isEditing && <span className="upload-text">Change Photo</span>}
//         </label>
//         <input
//           type="file"
//           id="imageUpload"
//           accept="image/*"
//           onChange={handleImageUpload}
//           style={{ display: "none" }}
//         />

//         <div className="profile-info">
//           {isEditing ? (
//             <>
//               <input
//                 type="text"
//                 name="name"
//                 value={profileData.name}
//                 onChange={handleChange}
//                 className="edit-input"
//               />
//               <input
//                 type="text"
//                 name="role"
//                 value={profileData.role}
//                 onChange={handleChange}
//                 className="edit-input"
//               />
//             </>
//           ) : (
//             <>
//               <h2>{profileData.name}</h2>
//               <p>{profileData.role}</p>
//             </>
//           )}
//         </div>
//       </div>

//       {/* About Me Section */}
//       <div className="about-me">
//         <h3>About Me</h3>
//         {isEditing ? (
//           <textarea
//             name="aboutMe"
//             value={profileData.aboutMe}
//             onChange={handleChange}
//             className="edit-textarea"
//           />
//         ) : (
//           <p>{profileData.aboutMe}</p>
//         )}
//       </div>

//       {/* Personal Information */}
//       <div className="personal-info">
//         <h3>Personal Information</h3>
//         <div>
//           <strong>Email: </strong>
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
//         <div>
//           <strong>Phone: </strong>
//           {isEditing ? (
//             <input
//               type="text"
//               name="phone"
//               value={profileData.phone}
//               onChange={handleChange}
//               className="edit-input"
//             />
//           ) : (
//             <span>{profileData.phone}</span>
//           )}
//         </div>
//       </div>

//       {/* Social Media Links */}
//       <div className="social-media">
//         <h3>Social Media Handles</h3>
//         {isEditing ? (
//           <>
//             <div>
//               <label>LinkedIn: </label>
//               <input
//                 type="text"
//                 name="linkedin"
//                 placeholder="LinkedIn URL"
//                 value={profileData.socialMedia.linkedin}
//                 onChange={handleSocialMediaChange}
//                 className="edit-input"
//               />
//             </div>
//             <div>
//               <label>GitHub: </label>
//               <input
//                 type="text"
//                 name="github"
//                 placeholder="GitHub URL"
//                 value={profileData.socialMedia.github}
//                 onChange={handleSocialMediaChange}
//                 className="edit-input"
//               />
//             </div>
//             <div>
//               <label>Instagram: </label>
//               <input
//                 type="text"
//                 name="instagram"
//                 placeholder="Instagram URL"
//                 value={profileData.socialMedia.instagram}
//                 onChange={handleSocialMediaChange}
//                 className="edit-input"
//               />
//             </div>
//           </>
//         ) : (
//           <ul>
//             <li>
//               LinkedIn:{" "}
//               <a
//                 href={profileData.socialMedia.linkedin}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {profileData.socialMedia.linkedin || "Not Provided"}
//               </a>
//             </li>
//             <li>
//               GitHub:{" "}
//               <a
//                 href={profileData.socialMedia.github}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {profileData.socialMedia.github || "Not Provided"}
//               </a>
//             </li>
//             <li>
//               Instagram:{" "}
//               <a
//                 href={profileData.socialMedia.instagram}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {profileData.socialMedia.instagram || "Not Provided"}
//               </a>
//             </li>
//           </ul>
//         )}
//       </div>

//       {/* Edit Profile Button */}
//       <div className="edit-button-container">
//         <button onClick={handleEditClick} className="edit-button">
//           {isEditing ? "Save Profile" : "Edit Profile"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;



import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import {getCroppedImg} from "../components/CropImage.jsx"; // Utility function to crop image
import "../CSS/Profile.css";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Neeraj Chopra",
    role: "Student",
    email: "Neeraj@example.com",
    phone: "+91 12345 67890",
    gender: "Male",
    address: "XYZ Street, City",
    aboutMe: "I am a computer science student with a passion for web development.",
    socialMedia: {
      linkedin: "",
      github: "",
      instagram: "",
    },
    profilePicture: "https://via.placeholder.com/150",
  });

  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropModalOpen, setCropModalOpen] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setCropModalOpen(true);
    }
  };

  const onCropComplete = useCallback(async (_, croppedAreaPixels) => {
    try {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(croppedImg);
    } catch (e) {
      console.error(e);
    }
  }, [image]);

  const saveCroppedImage = () => {
    setProfileData({ ...profileData, profilePicture: croppedImage });
    setCropModalOpen(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <label htmlFor="imageUpload" className="upload-label">
          <img src={profileData.profilePicture} alt="Profile" className="profile-picture" />
          {isEditing && <span className="upload-text">Change Photo</span>}
        </label>
        <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
        <div className="profile-info">
          {isEditing ? (
            <>
              <input type="text" name="name" value={profileData.name} className="edit-input" />
              <input type="text" name="role" value={profileData.role} className="edit-input" />
            </>
          ) : (
            <>
              <h2>{profileData.name}</h2>
              <p>{profileData.role}</p>
            </>
          )}
        </div>
      </div>

      {cropModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <button onClick={saveCroppedImage} className="save-btn">Save</button>
            <button onClick={() => setCropModalOpen(false)} className="close-btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
