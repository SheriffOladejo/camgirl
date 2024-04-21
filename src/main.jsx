import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './services/ProtectedRoutes';
import './index.css';
import Error404page from './pages/Error404page';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProfileSetup from './pages/ProfileSetup';
import Layout from './services/Layout';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         
        <Route path="/profilesetup" element={<ProfileSetup />} />
       
        {/* protected routes */}
        {/* we should check if its a fan or creator profile to know what to bring up */}
        {/* <Route path='/' element={<ProtectedRoutes />}> */}
          <Route path='/' element={<Layout />} >
          <Route path="" element={<Home />} />
          </Route>

        {/* </Route> */}
        {/* 404 */}
        <Route path="*" element={<Error404page />} />
      </Routes>
    </Router>
  </React.StrictMode>,

);
