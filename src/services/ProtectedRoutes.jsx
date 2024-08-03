
import {  Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {



  const isAuthenticated = localStorage.getItem('Loggedin');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }


  return <Outlet />;


}

export default ProtectedRoutes;
