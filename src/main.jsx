import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './services/ProtectedRoutes';
import './index.css';
import Error404page from './pages/Error404page';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FanHome from './pages/fanPages/Home';
import ProfileSetup from './pages/fanPages/ProfileSetup';
import SetupProfile from './pages/creatorpages/SetupProfile';
import Layout from './services/Layout';

import VerifyId from './pages/creatorpages/VerifyId';
import AlmostDone from './pages/creatorpages/AlmostDone';
import Home from './pages/creatorpages/Home'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* fan */}

        <Route path="/profile-setup" element={<ProfileSetup />} />

        {/* create */}
        <Route path="/setup-profile" element={<SetupProfile />} />
        <Route path="/verify-id" element={<VerifyId />} />
        <Route path="/almost-done" element={<AlmostDone />} />
        {/* protected routes */}
        {/* we should check if its a fan or creator profile to know what to bring up */}
        {/* <Route path='/' element={<ProtectedRoutes />}> */}
        <Route element={<Layout />} >
          <Route path="fanhome" element={<FanHome />} />
          <Route path='/home' element={<Home/>}/>
        </Route>

        {/* </Route> */}
        {/* 404 */}
        <Route path="*" element={<Error404page />} />
      </Routes>
    </Router>
  </React.StrictMode>,

);
