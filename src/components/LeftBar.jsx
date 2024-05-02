import { useState, useContext } from "react"
import { navigation } from "."
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
function LeftBar() {

  const { currentUser } = useContext(AuthContext);
  const { userType } = currentUser;
  const profilePic = (currentUser[userType]?.picture) || null;
  const username = (currentUser[userType]?.username) || null;

  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className='h-[60%] hidden md:sticky top-[20%] z-10  md:flex flex-col rounded-xl bg-color-white md:w-[20%] pt-5 pr-4 pb-4 '>

      <nav >
        {/* profile */}
        <div className="flex">
        <div className="p-[1px] rounded-full bg-color-4">{profilePic && <img src={profilePic} alt="Profile Pic"  className="w-8 h-8 rounded-full"/>}</div>
        <p>{username}</p>
        </div>
        
        {/* nav */}

        {navigation.map((item, index) => (
          <Link
            to={item.url}
            key={index}
            className={`flex items-center justify-start p-2 ${index === activeIndex ? 'bg-color-pink  rounded-r-lg text-color-white ' : 'text-color-grey'}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)} // Consider resetting or not resetting on mouse leave
          >
            {index === activeIndex && (
              <img src="../src/assets/icons/active.png" alt="Active" className="mr-2 w-1 h-2" />
            )}
            <img src={item.img} alt={item.title} className="mr-2 w-5 h-5" />
            <span className="text-[0.8rem]">{item.title}</span>
          </Link>
        ))}

      </nav>

    </div>
  )
}

export default LeftBar