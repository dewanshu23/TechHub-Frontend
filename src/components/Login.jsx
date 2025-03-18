import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Login.css"; // Import CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Login Successful");
  //   navigate("/alumni-list"); // Redirect to Home Page
  // };


  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // Prevent default form submission

  //   try {
  //     const response = await fetch("http://localhost:7070/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       console.log("Login Successful");
  //       navigate("/alumni-list"); // Redirect on success
  //     } else {
  //       setError(data.message || "Invalid credentials");
  //     }
  //   } catch (error) {
  //     console.error("Login Error:", error);
  //     setError("Something went wrong. Please try again.");
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const response = await fetch("http://localhost:7070/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         password, // Make sure it's exactly what the backend expects
  //       }),
  //     });
  
  //     const data = await response.json();
  //     console.log("API Response:", data);
  
  //     if (response.ok) {
  //       console.log("Login Successful");
  //       navigate("/alumni-list"); // Redirect after successful login
  //     } else {
  //       alert(data.message || "Login failed!");
  //     }
  //   } catch (error) {
  //     console.error("Login Error:", error);
  //     alert("Something went wrong. Try again!");
  //   }
  // };
  

  //changing handle submit to save userrole in localstorage

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:7070/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password, // Ensure it matches the backend's expected format
        }),
      });
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (response.ok) {
        console.log("Login Successful");
  
        // Assuming the API response contains `role`, store it in localStorage
        if (data.user_data.userrole) {
          localStorage.setItem("userRole", data.user_data.userrole);
        } else {
          console.warn("Role not found in API response");
        }
  
        navigate("/alumni-list"); // Redirect after storing role
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Try again!");
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <label>Email:</label>
          <input
            type="email"
            value={email}
            // value="test@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <label>Password:</label>
          <input
            type="password"
            value={password}
            // value="password123"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Forgot Password Link */}
          <p className="forgot-password" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </p>

          {/* Login Button */}
          <button type="submit">Login</button>
        </form>

        {/* Signup Option */}
        <p className="signup-text">
          Don't have an account? <span onClick={() => navigate("/registration-page")}>Sign up</span>
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
