import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Register.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stream, setStream] = useState("BSc IT");
  const [year, setYear] = useState("First Year");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Show success popup
    setShowPopup(true);

    // After 2 seconds, navigate to "/alumni-list"
    setTimeout(() => {
      setShowPopup(false);
      navigate("/alumni-list");
    }, 2000);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
            <label>Year:</label>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
              <option value="Third Year">Third Year</option>
            </select>
          </div>

          <div className="input-group">
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
          </div>

          <button type="submit">Register</button>
        </form>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="popup">
          <p>Successfully Registered!</p>
        </div>
      )}
    </div>
  );
};

export default Register;
