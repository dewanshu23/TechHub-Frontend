import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../CSS/ChangePassword.css';

const ChangePasswordPage = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Set email from navigation state
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      setError('Email not provided. Redirect from Profile Page.');
    }
}, [location]);

const handleChangePassword = async (email, oldPassword, newPassword) => {
    const payload = {
        email,
        old_password: oldPassword,
        new_password: newPassword
    };
    console.log(payload);
    
    try {
        const response = await fetch("http://localhost:7070/changePassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(payload),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert("Password changed successfully.");
        } else {
        setError(data.message || 'Failed to change password');
    }
} catch (error) {
    console.error("Error occurred:", error);
    setError('An error occurred while changing the password');
} finally {
    setLoading(false);
}
};

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password must match.');
      setLoading(false);
      return;
    }

    if (!email) {
      setError('Email not available.');
      setLoading(false);
      return;
    }

    handleChangePassword(email, currentPassword, newPassword);
  };

  return (
    <div className="change-password-page">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
