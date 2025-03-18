// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import ForgotPassword from './components/ForgotPassword';
// import Navbar from './components/Navbar';
// import NotificationPage from './components/NotificationPage';
// import ProfilePage from "./components/ProfilePage";
// import AlumniListPage from "./components/AlumniListPage";
// import JobNotification from "./components/JobNotification";
// import Register from "./components/Register";
// import AdminUserView from "./components/AdminUserView";


// import './style.css'
// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/notification-page" element={<NotificationPage />} />
//         <Route path="/job-notification-page" element={<JobNotification />} />
//         <Route path="/profile-page" element={<ProfilePage />} />
//         <Route path="/alumni-list" element={<AlumniListPage />} />
//         <Route path="/registration-page" element={<Register />} />
//         <Route path="/admin-user-view" element={<AdminUserView />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// changes 2
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Login from './components/Login';
// import ForgotPassword from './components/ForgotPassword';
// import Navbar from './components/Navbar';
// import NotificationPage from './components/NotificationPage';
// import ProfilePage from "./components/ProfilePage";
// import AlumniListPage from "./components/AlumniListPage";
// import JobNotification from "./components/JobNotification";
// import Register from "./components/Register";
// import AdminUserView from "./components/AdminUserView";

// import './style.css'

// const AppContent = () => {
//   const location = useLocation();  
//   const hideNavbarRoutes = ["/","/registration-page","/forgot-password"]; // Add more paths if needed

//   return (
//     <>
//       {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/notification-page" element={<NotificationPage />} />
//         <Route path="/job-notification-page" element={<JobNotification />} />
//         <Route path="/profile-page" element={<ProfilePage />} />
//         <Route path="/alumni-list" element={<AlumniListPage />} />
//         <Route path="/registration-page" element={<Register />} />
//         <Route path="/admin-user-view" element={<AdminUserView />} />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;


// changes 3

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Navbar from './components/Navbar';
import NotificationPage from './components/NotificationPage';
import ProfilePage from "./components/ProfilePage";
import AlumniListPage from "./components/AlumniListPage";
import JobNotification from "./components/JobNotification";
import Register from "./components/Register";
import AdminUserView from "./components/AdminUserView";
import ProtectedRoute from "./components/ProtectedRoute";  // Import ProtectedRoute
import StudentsList from "./components/StudentsList";
import ChatPage from "./components/ChatPage";
import './style.css'
import { AuthProvider } from "./context/AuthContext";

const AppContent = () => {
  const location = useLocation();  
  const hideNavbarRoutes = ["/", "/registration-page", "/forgot-password"]; 

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/notification-page" element={<NotificationPage />} />
        <Route path="/job-notification-page" element={<JobNotification />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/alumni-list" element={<AlumniListPage />} />
        <Route path="/registration-page" element={<Register />} />
        <Route path="/chat" element={<ChatPage />} />
        
        {/* Protected Pages */}
        <Route 
          path="/students-list" 
          element={
            <ProtectedRoute allowedRoles={["Teacher", "Admin"]}>
              <StudentsList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin-user-view" 
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminUserView />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
    
  );
}

function App() {
  return (
    <AuthProvider>
    <Router>
      <AppContent />
    </Router>
    </AuthProvider>
  );
}

export default App;
