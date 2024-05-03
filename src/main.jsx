import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './services/ProtectedRoutes';
import './index.css';
import Error404page from './pages/Error404page';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FanHome from './pages/fanPages/FanHome';
import ProfileSetup from './pages/fanPages/ProfileSetup';
import SetupProfile from './pages/creatorpages/SetupProfile';
import Layout from './services/Layout';

import VerifyId from './pages/creatorpages/VerifyId';
import AlmostDone from './pages/creatorpages/AlmostDone';
import Home from './pages/creatorpages/Home';
import PostContent from './pages/PostContent';
import { AuthContext, AuthContextProvider } from './context/authContext';
import { LiveUsersProvider } from './context/liveUserContext';
import Messages from './pages/Messages';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <LiveUsersProvider>
      <App />
      </LiveUsersProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

function App() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // loading code

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/setup-profile" element={<SetupProfile />} />
        <Route path="/verify-id" element={<VerifyId />} />
        <Route path="/almost-done" element={<AlmostDone />} />
        <Route path="/post" element={<PostContent />} />

        {/* Protected routes */}
        {/* <Route path="/" element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}> */}
        
          <Route element={<Layout />}>
          
            <Route path="fanhome" element={<FanHome />} />
     
            <Route path="/home" element={<Home />} />
      
          </Route>
          
        {/* </Route> */}

        {/* Redirect root to login if not authenticated */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 404 */}
        <Route path="*" element={<Error404page />} />
      </Routes>
    </Router>
  );
}
