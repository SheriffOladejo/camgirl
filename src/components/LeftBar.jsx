import { useState, useContext, useEffect } from "react";
import { navigation } from ".";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function LeftBar({ className }) {
  const { currentUser } = useContext(AuthContext);
  
  // Ensure currentUser is not null before accessing its properties
  const profilePic = currentUser?.profile_picture || '../public/profileImg.png';
  const username = currentUser?.username || 'Susan';

  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const index = navigation.findIndex((item) => item.url === location.pathname);
    setActiveIndex(index !== -1 ? index : -1);
  }, [location.pathname]);

  return (
    <div className={`hidden md:sticky top-[23%] z-10 md:flex flex-col rounded-xl bg-color-white h-[350px] pt-[30px] pr-4 pb-4 ${className} shadow`}>
      <nav>
        {/* profile */}
        <div className="flex space-x-2 p-2 items-center">
          <div className="p-[1px] rounded-full bg-color-4">
            <img src={profilePic} alt="Profile Pic" className="w-8 h-8 rounded-full" />
          </div>
          <p className="text-[12px] text-color-grey">@{username}</p>
        </div>

        {/* nav */}
        {navigation.map((item, id) => (
          <Link
            to={item.url}
            key={id}
            className={`flex items-center justify-start px-6 py-2 ${id === activeIndex ? 'bg-color-pink rounded-r-lg text-color-white' : 'text-color-grey'}`}
          >
            {id === activeIndex && (
              <img src="../public/icons/active.png" alt="Active" className="mr-2 w-1 h-2" />
            )}
            <img src={item.img} alt={item.title} className="mr-2 w-5 h-5" />
            <span className="text-[0.8rem]">{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default LeftBar;
