import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "./Logo";
import { AuthContext } from "../context/authContext";

function MobileHeader() {
  const navigate = useNavigate();
  // const [loading, setLoading ] = useState()
  const { currentUser, setCurrentUserType } = useContext(AuthContext);

  const { creator_mode, profile_picture } = currentUser || {};

  const profilePic = profile_picture || null;

  const toggleMode = () => {
    const newMode = creator_mode === "creator" ? "fan" : "creator";
    if (newMode !== creator_mode) {
      setCurrentUserType(newMode);
      const homePageRoute = newMode === "creator" ? "/home" : "/home:fan";
      navigate(homePageRoute);
    }
  };

  return (
    <header className="px-5 py-5 flex justify-between items-center sticky top-0 z-20 bg-color-white shadow-md">

      <div className="p-[1px] bg-color-pink rounded-full">
        {profilePic ? (
          <img src={profilePic} alt="Profile Pic" className="w-6 h-6 rounded-full" />
        ) : (
          <img src="../profileImg.png" alt="Profile Pic" className="w-6 h-6 rounded-full" />
        )}
        
      </div>

      <Logo />



      <div
        className={`relative bg-color-lightGrey rounded-xl cursor-pointer w-8 h-2 items-center transition-all duration-200 ease-in-out ${creator_mode === "creator" ? "justify-start" : "justify-end"
          }`}
        onClick={toggleMode}
      >
        <div className={`absolute transform ${creator_mode === "creator" ? "left-0" : "right-0"}`}>
          {creator_mode === "creator" ? (
            <img className="w-4 h-4 mt-[-4px]" src="../icons/people-frame.png" alt="" />
          ) : (
            <img
              className="w-4 h-4 p-1 mt-[-4px] bg-color-pink rounded-full"
              src="../icons/profile-white.png"
              alt=""
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default MobileHeader;
