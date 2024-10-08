import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './services/ProtectedRoutes';
import './index.css';

import { AuthContextProvider } from './context/authContext';
import { LiveUsersProvider } from './context/liveUserContext';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './utils/Constants';

// Pages and Components
import Error404page from './pages/Error404page';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Messages from './pages/Messages';
import MobileCreatePost from './pages/MobileCreatePost';
import PostComment from './pages/PostComment';
import CreatorProfile from './pages/creatorpages/CreatorProfile';
import ProfileSetup from './pages/fanPages/ProfileSetup';
import SetupProfile from './pages/creatorpages/SetupProfile';
import Layout from './services/Layout';
import ProfileSettings from './components/ProfileSettings';
import NotificationSettings from './components/NotificationSettings';
import PrivacySetting from './components/PrivacySetting';
import AccountSettings from './components/AccountSettings';
import Settings from './pages/Settings';
import Explore from './pages/Explore';
import Dashboard from './pages/Dashboard';
import Stories from './pages/Stories';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/setup-profile" element={<SetupProfile />} />
          <Route path="/create-post" element={<MobileCreatePost />} />
          <Route path="/post-comment" element={<PostComment />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/profile" element={<ProfileSettings />} />
          <Route path="/settings/account" element={<AccountSettings />} />
          <Route path="/settings/privacy" element={<PrivacySetting />} />
          <Route path="/settings/notifications" element={<NotificationSettings />} />
          <Route path="/discover" element={<Explore />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/profile" element={<CreatorProfile />} />
          <Route path="/profile/:user_id" element={<CreatorProfile />} />

        </Route>

        {/* Redirect root to login if not authenticated */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 404 */}
        <Route path="*" element={<Error404page />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <LiveUsersProvider>
          <App />
        </LiveUsersProvider>
      </GoogleOAuthProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
