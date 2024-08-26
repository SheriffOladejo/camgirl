import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
  const isAuthenticated = localStorage.getItem('Loggedin', true);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Allow the protected route's children to be rendered if authenticated
  return <Outlet />;
}

export default ProtectedRoutes;
