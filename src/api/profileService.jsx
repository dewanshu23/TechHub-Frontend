import axios from "axios";

export const updateProfileAPI = async (profileData) => {
  try {
    const response = await axios.put(
      "http://localhost:7070/updateProfile", // API URL
      profileData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Use this if the backend requires authentication cookies
      }
    );
    console.log("Profile updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
};
