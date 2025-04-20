// import React, { useState } from 'react';
// import '../style.css'

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const email = user?.email;

//     if (!email) {
//       console.error("Email not found in localStorage.");
//       return;
//     }

//     const response = await fetch("http://localhost:7070/forgotPassword", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email }),
//     });

//     if (response.ok) {
//       console.log("Password reset link sent to", email);
//       // Optionally show a success message to the user
//     } else {
//       console.error("Failed to send password reset link.");
//       // Optionally show an error message
//     }
//   } catch (error) {
//     console.error("Error sending reset link:", error);
//   }
// };


//   return (
//     <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input 
//             type="email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//         </div>
//         <button type="submit">Send Reset Link</button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:7070/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {

        alert("Password reset otp sent!");
        // setEmail(""); // clear input
        navigate("/reset-password", { state: { email } });
      } else {
        console.error("Failed to send password reset otp.");
        alert("Failed to send reset link. Try again.");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="forgot-password-form" style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
