import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Login.css"; // Import CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Successful");
    navigate("/"); // Redirect to Home Page
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <label>Password:</label>
          <input
            type="password"
            value={password}
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
      </div>
    </div>
  );
};

export default Login;
