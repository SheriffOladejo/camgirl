
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {

  

  const isAuthenticated = localStorage.getItem('Loggedin');

  if (!isAuthenticated) {
    return <Navigate to="/login"  />;
  }

  // Determine user type (fan or creator)
  const userType = localStorage.getItem("userType"); // Assuming you store user type in local storage

  
  // Redirect users to different home pages based on user type
  switch (userType) {
 
    case "creator":
      return <Navigate to="/home" />;
    default:
      return <Outlet />;
  }
}

export default ProtectedRoutes;
