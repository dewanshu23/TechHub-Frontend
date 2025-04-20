// import React, { useState } from "react";
// import '../CSS/ResetPassword.css'

// const ResetPassword = () => {
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const handleReset = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:7070/resetPassword", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           otp,
//           newPassword,
//         }),
//       });

//       if (response.ok) {
//         alert("Password reset successfully!");
//         // Optionally redirect to login
//       } else {
//         alert("Invalid OTP or something went wrong.");
//       }
//     } catch (error) {
//       console.error("Reset error:", error);
//       alert("Error resetting password. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleReset}
//         className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
//       >
//         <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>

//         <label className="block mb-2 text-sm font-medium text-gray-700">
//           OTP
//         </label>
//         <input
//           type="text"
//           maxLength="6"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
//           required
//         />

//         <label className="block mb-2 text-sm font-medium text-gray-700">
//           New Password
//         </label>
//         <input
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
//         >
//           Reset Password
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;


import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import '../CSS/ResetPassword.css';
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
     const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // Get email from navigation state
  console.log(email)

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
console.log(otp);
console.log(newPassword);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email not found. Go back and request again.");
      return;
    }
    try {
      const response = await fetch("http://localhost:7070/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, new_password:newPassword }),
      });

      if (response.ok) {
        alert("Password reset successfully!");
        navigate('/')
      } else {
        alert("Invalid OTP or error resetting password.");
      }
    } catch (error) {
      console.error("Reset error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="reset-container">
      <form onSubmit={handleReset} className="reset-form">
        <h2>Reset Password</h2>

        <label>OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
