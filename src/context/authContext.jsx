import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    return {
      creator: {
        picture: JSON.parse(localStorage.getItem("creatorProfileData"))?.picture || null,
      },
      fan: {
        picture: JSON.parse(localStorage.getItem("fanProfileData"))?.picture || null,
      },
      userType: localStorage.getItem("userType") || "fan", // Default to "fan" if not set
    };
  });

  useEffect(() => {
    localStorage.setItem("creatorProfileData", JSON.stringify(currentUser.creator));
    localStorage.setItem("fanProfileData", JSON.stringify(currentUser.fan));
    localStorage.setItem("userType", currentUser.userType); // Update user type in local storage
  }, [currentUser]);

  const setCurrentUserType = (userType) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      userType: userType,
    }));
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUserType }}>
      {children}
    </AuthContext.Provider>
  );
};
