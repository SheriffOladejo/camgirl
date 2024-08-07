import React, { createContext, useEffect, useState } from "react";
import DbHelper from "../utils/DbHelper";
import { getDataFromLocalStorage, updateUserOnlineStatus } from "../utils/Utils";
import axiosInstance from "../api/axiosInstance";
export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const dbHelper = new DbHelper();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserType, setCurrentUserType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect is running'); // Debugging statement

    const loadCurrentUser = async () => {
      const storedUsers = getDataFromLocalStorage("users");
      console.log('Stored users:', storedUsers); // Debugging statement

      if (storedUsers && storedUsers.length > 0) {
        const user_id = storedUsers[0].user_id;
        console.log('Retrieved user ID from local storage:', user_id); // Debugging statement
        const user = await dbHelper.getAppUserByID(user_id);
        console.log('Retrieved user from DB:', user); // Debugging statement
        if (user) {
          setCurrentUserType(user.creator_mode);
          setCurrentUser(user);
          
        }

      }
      setLoading(false);
    };

    loadCurrentUser();
  }, []);

  const loginUser = async (id) => {
    if (id) {
      const loggedInUser = await dbHelper.getAppUserById(id);
      console.log(`Logging in user with id: ${loggedInUser}`); // Debugging statement
      if (loggedInUser) {
        localStorage.setItem("users", JSON.stringify([loggedInUser]));
        // setCurrentUser(loggedInUser);
        await updateUserOnlineStatus(loggedInUser.id, true); 
      }
    }
  };

  const logoutUser = async () => {
    if (currentUser) {
      await updateUserOnlineStatus(currentUser.user_id, false); // Set online status to false on logout
    }
    localStorage.removeItem("users");
    localStorage.removeItem("Loggedin");
    setCurrentUser(null);
  };

  const updateCurrentUser = async (user) => {
    const response = await dbHelper.updateUser(user);
    if (response.success) {
      setCurrentUser(user);
    }
    return response;
  };

  return (
    <AuthContext.Provider value={{ currentUser, currentUserType, loginUser, logoutUser, updateCurrentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
