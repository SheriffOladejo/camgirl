import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { profileMenu } from '.'
import DbHelper from '../utils/DbHelper';
import { AuthContext } from '../context/authContext';

function ProfileMenu({ profilePic, username, name, profileClicked, toggleProfileMenu, closeProfileMenu , profile}) {
  const [isOpen, setIsOpen] = useState(false);

  const { logoutUser } = useContext(AuthContext)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    toggleProfileMenu()

  };
  const handleCloseMenu = () => {
    setIsOpen(false);
    closeProfileMenu()
  };

  const logOut = () => {
    logoutUser()
  }
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="relative">
      {/* profile */}
      <div onClick={toggleMenu} className="flex justify-between items-center space-x-1 cursor-pointer">
        <div className="p-[1px] bg-color-pink rounded-full">
          {profilePic ? <img src={profilePic} alt="Profile Pic" className="w-6 h-6 rounded-full" /> : <img src='../profileImg.png' alt="Profile Pic" className="w-6 h-6 rounded-full" />}
        </div>
        <img src="../icons/angle-down.png" alt="" className="w-3 h-3" />
      </div>

      {isOpen && (
        <>
          <div className='transition-all duration-100 top-10  w-[50%] '>
            <div className="absolute  top-0  flex justify-between items-center space-x-2 bg-color-white ">
              {/* profile img */}
              <div className="p-[1px] bg-color-pink rounded-full w-10 h-8 flex items-center justify-center">
                {profilePic ? <img src={profilePic} alt="Profile Pic" className="w-8 h-7 rounded-full" /> : <img src='../profileImg.png' alt="Profile Pic" className="w-6 h-6 rounded-full" />}
              </div>
              <div className=''>
                {name ?
                  <h4 alt="username" className="font-semibold text-[13px] flex">{name}</h4>
                  : <h5 alt="username" className="font-semibold text-[10px] text-nowrap">Sarah White</h5>
                }
                {username && <p alt="username" className="font-semibold text-[10px]">@{username} </p>}
              </div>

              <img onClick={toggleMenu} src="../icons/angle-up.png" alt="arrow-up" className="w-2 h-1 cursor-pointer" />
            </div>
            <div className="absolute mt-2 w-48 -translate-x-14  bg-color-white rounded-md shadow-lg z-10">
              <div className="py-2 ">
                {profileMenu.map((profile, index) => (
                  <Link
                    to={profile.url}
                    key={index}

                    className={`flex px-4 py-2 text-sm text-color-grey transition-all hover:bg-color-pink ${index === activeIndex ? 'bg-color-pink/70  rounded-r-lg text-color-white ' : 'text-color-grey'}`}
                    onClick={() => {
                      setActiveIndex(index);
                      handleCloseMenu();

                    }}

                  >

                    <img src={profile.img} alt={profile.title} className="mr-2 w-5 h-5" />
                    <span className="text-[0.8rem]">{profile.title}</span>
                  </Link>
                ))}
                <a
             


                  className={`flex px-4 py-2 text-sm text-color-grey transition-all bg-color-white hover:bg-color-pink active:bg-color-pink/70  rounded-r-lg active:text-color-white text-color-grey'}`}
                  onClick={() => {
                   logOut()
                    handleCloseMenu();

                  }}

                >

                  <img src="../icons/logout.png" alt="logout" className="mr-2 w-5 h-5" />
                  <span className="text-[0.8rem]">Log out</span>
                </a>
              </div>
            </div>

          </div>
        </>
      )}
    </div>


  );
};

export default ProfileMenu;
