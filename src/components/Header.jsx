import { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import ProfileMenu from "./ProfileMenu";

function Header({ placeholder }) {
  const navigate = useNavigate();
  const { currentUser, setCurrentUserType } = useContext(AuthContext);
  console.log(currentUser)



  const { creator_mode, profile_picture, username, firstname, lastname } = currentUser || {};
  // const usersname = (currentUser.firstname && currentUser.lastname) || null;
  // const handle = (currentUser.username) || null;


  const profilePic = profile_picture || null;

  const toggleMode = () => {
    const newMode = creator_mode === "creator" ? "fan" : "creator";
    if (newMode !== creator_mode) {
      setCurrentUserType(newMode);
      const homePageRoute = newMode === "creator" ? "/home" : "/home:fan";
      navigate(homePageRoute);
    }
  };


  const [profileClicked, setProfileClicked] = useState(false)

  const [searchItem, setSearchItem] = useState("");


  const toggleProfileMenu = () => setProfileClicked(!profileClicked);
  const closeProfileMenu = () => setProfileClicked(false);
  const handleChange = (e) => setSearchItem(e.target.value);

  return (
    <header className="text-[16px] px-4 pt-8 pb-6   md:flex md:justify-between md:items-center sticky top-0 z-20 bg-color-white md:shadow-md">
      <Logo color={"text-color-0"} />
      <div className={`flex  items-center justify-between  ${profileClicked === true && 'transition -translate-x-20 duration-300 ease-in-out '} md:relative  md:space-x-0 md:w-auto`} >
        <div className="md:mr-[10px] relative">
          <img className="w-4 h-4 cursor-text absolute top-2 left-2" src="../icons/search-normal.png" alt="search" />
          <input className="placeholder:text-color-pink text-[12px] outline-none border border-color-pink rounded pl-8 pr-4 py-2 " type="search"
            value={searchItem}
            onChange={handleChange}
            name="search"
            id="search"
            placeholder={placeholder || 'Search posts, creators...'}
          />
        </div>
        <div className="flex space-x-2 items-center">
          {/* dynamic home depending on type */}
          <Link to="/home">
            <img className="w-4 h-4" src="../icons/home.png" alt="home" />
          </Link>
          <Link to="/messages">
            <img className="w-4 h-4" src="../icons/message.png" alt="" />
          </Link>
          <Link to="/notifications">
            <img className="w-4 h-4" src="../icons/notification.png" alt="" />
          </Link>
          <div className={` relative bg-color-lightGrey rounded-xl cursor-pointer w-8 h-2 items-center transition-all duration-200 ease-in-out ${creator_mode === 'creator' ? 'justify-start' : 'justify-end'}`} onClick={toggleMode}>
            <div className={`absolute transform ${creator_mode === 'creator' ? 'left-0' : 'right-0'}`}>
              {creator_mode === 'creator' ? <img className="w-4 h-4 mt-[-4px]" src="../icons/people-frame.png" alt="" /> : <img className="w-4 h-4 p-1 mt-[-4px] bg-color-pink rounded-full" src="../icons/profile-white.png" alt="" />}
            </div>
          </div>


          <div>
            <ProfileMenu profilePic={profilePic} name={firstname && lastname} username={username} profileClicked={profileClicked} toggleProfileMenu={toggleProfileMenu} closeProfileMenu={closeProfileMenu} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;