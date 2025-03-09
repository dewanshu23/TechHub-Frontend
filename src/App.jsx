import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Navbar from './components/Navbar';
import NotificationPage from './components/NotificationPage';
import ProfilePage from "./components/ProfilePage";
import AlumniListPage from "./components/AlumniListPage";
import JobNotification from "./components/JobNotification";
import Register from "./components/Register";
import AdminUserView from "./components/AdminUserView";


import './style.css'
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/notification-page" element={<NotificationPage />} />
        <Route path="/job-notification-page" element={<JobNotification />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/alumni-list" element={<AlumniListPage />} />
        <Route path="/registration-page" element={<Register />} />
        <Route path="/admin-user-view" element={<AdminUserView />} />
      </Routes>
    </Router>
  );
}

export default App;
