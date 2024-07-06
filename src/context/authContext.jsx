import { createContext, useEffect, useState } from "react";
import DbHelper from "../utils/DbHelper";
import { addDataIntoCache, getDataFromLocalStorage } from "../utils/Utils";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const dbHelper = new DbHelper();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserType , setCurrentUserType] = useState('')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCurrentUser = async () => {
      const storedUser = getDataFromLocalStorage("userData");
      if (storedUser) {
        const userId = storedUser[0].user_id;
        console.log(userId)
        const user = await dbHelper.getAppUserByID(userId);
        setCurrentUserType(user.creator_mode)
        setCurrentUser(user);
      }
    };

    loadCurrentUser();
  }, []);

  const loginUser = async () => {
    const storedUser = getDataFromLocalStorage("userData"); // Retrieve userData again
    if (storedUser) {
      const user = await dbHelper.getAppUserByID(storedUser.user_id);
      if (user) {
        addDataIntoCache("userData", user);
        setCurrentUser(user);
      }
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("userData");
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
    <AuthContext.Provider value={{ currentUser,currentUserType, loginUser, logoutUser, updateCurrentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
