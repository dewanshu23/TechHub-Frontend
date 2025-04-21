import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Register.css";

const Register = () => {
  const [isAlumni, setIsAlumni] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stream, setStream] = useState("BSc IT");
  const [yearOrPassout, setYearOrPassout] = useState("First Year");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error handling
  const navigate = useNavigate();
const [passwordError, setPasswordError] = useState("");
  const userTypeChanger = () => {
    setIsAlumni(!isAlumni);
    setYearOrPassout(isAlumni ? "First Year" : "2024"); // Default passout year
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:7070/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: fullName,
          stream,
          userRole: isAlumni ? "Alumni" : "Student",
          password,
          confirmPassword,
          passout: isAlumni ? yearOrPassout : 0,
          year: isAlumni ? "PO" : yearOrPassout,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Registration Error:", error);
      setErrorMessage("Failed to register. Please try again.");
    }
  };
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[\S]{8,}$/;
    return regex.test(password);
  };
  
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Clear error while typing
    setPasswordError("");
  };

  const handlePasswordBlur = () => {
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, special character. No spaces."
      );
    }
  };
  
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
  };
  return (
    <div className="register-container">
      <div className="register-box">
        <div className="flex mb-10 items-center">
          <b className="text-2xl flex-1">Register as</b>
          <div className="flex-1 ml-5 flex items-center">
            <span>Student</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={isAlumni}
                onChange={userTypeChanger}
              />
              <span className="slider"></span>
            </label>
            <span>Alumni</span>
          </div>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          {/* <div className="input-group">
            <label>Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div> */}
          <div className="input-group">
  <label>Full Name:</label>
  <input
    type="text"
    value={fullName}
    onChange={(e) => {
      const value = e.target.value;
      // Allow only letters and spaces
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFullName(value);
      }
    }}
    required
  />
</div>


          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Stream:</label>
            <select value={stream} onChange={(e) => setStream(e.target.value)}>
              <option value="BSc IT">BSc IT</option>
              <option value="BSc CS">BSc CS</option>
              <option value="BAF">BAF</option>
            </select>
          </div>

          <div className="input-group">
            <label>{isAlumni ? "Passout Year:" : "Year:"}</label>
            <select
              value={yearOrPassout}
              onChange={(e) => setYearOrPassout(e.target.value)}
            >
              {isAlumni ? (
                [...Array(10)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })
              ) : (
                ["First Year", "Second Year", "Third Year"].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

          </div> */}

<div className="input-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          required
        />
        {passwordError && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{passwordError}</p>
        )}
      </div>

      <div className="input-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
      </div>

          <button type="submit">Register</button>
        </form>
      </div>

      {showPopup && (
        <div className="popup">
          <p>Successfully Registered!</p>
        </div>
      )}
    </div>
  );
};

export default Register;
