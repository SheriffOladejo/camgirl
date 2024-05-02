import { useState } from 'react';
import { Link } from 'react-router-dom';
import { profileMenu } from '.'

function ProfileMenu({ profilePic, username, handle }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);

  };
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="relative">
      {/* profile */}
      <div onClick={toggleMenu} className="flex justify-between items-center space-x-1 cursor-pointer">
        <div className="p-[1px] bg-color-pink rounded-full">
          {profilePic && <img src={profilePic} alt="Profile Pic" className="w-6 h-6 rounded-full" />}
        </div>
        <img src="../src/assets/icons/angle-down.png" alt="" className="w-3 h-3" />
      </div>
      {/* <div  className="flex items-center cursor-pointer">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img src={profilePic} alt="Profile Pic" className="w-full h-full" />
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div> */}
      {isOpen && (
        <>
          <div className='transition-all duration-300 top-10  w-[50%]'>
            <div className="absolute  top-0  flex justify-between items-center space-x-1 bg-color-white ">
              <div className="p-[1px] bg-color-pink rounded-full">
                {profilePic && <img src={profilePic} alt="Profile Pic" className="w-6 h-6 rounded-full" />}

              </div>
              <div>{username && <h4 alt="username" className="font-semibold ">{username}</h4>}
                {handle && <p alt="username" className="font-semibold ">{username}</p>}
              </div>

              <img onClick={toggleMenu} src="../src/assets/icons/angle-up.png" alt="awwow-up" className="w-2 h-1 cursor-pointer" />
            </div>
            <div className="absolute  right-0 mt-2 w-48 bg-color-white rounded-md shadow-lg z-10">
              <div className="py-2 ">
                {profileMenu.map((profile, index) => (
                  <Link
                    to={profile.url}
                    key={index}
                    className={`flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${index === activeIndex ? 'bg-color-pink/70  rounded-r-lg text-color-white ' : 'text-color-grey'}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)} // Consider resetting or not resetting on mouse leave
                  >
                   
                    <img src={profile.img} alt={profile.title} className="mr-2 w-5 h-5" />
                    <span className="text-[0.8rem]">{profile.title}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </>
      )}
    </div>


  );
};

export default ProfileMenu;
