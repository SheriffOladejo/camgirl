import  { useState, useContext } from "react"
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
function Header({ placeholder }) {
  const {currentUser} = useContext(AuthContext)
    // Check if currentUser is null before accessing its properties
    const profilePic = currentUser ? currentUser.profilePic : null;


  const [isCreator, setIsCreator] = useState(true)
  const toggleMode = () => {
    setIsCreator(!isCreator)
  }

  const [searchItem, setSearchItem] = useState("");

  const handleChange = (e) => setSearchItem(e.target.value)

  // search logic


  return (
    <header className="text-[16px] px-10 pt-8 pb-6   md:flex md:justify-between md:items-center sticky top-0 z-20 bg-color-white md:shadow-md">
      <Logo color={"text-color-0"} />
      <div className=" md:flex w-80 items-center justify-between hidden">
        {/* search bar */}
        <div className="relative">
          <img className="w-4 h-4 cursor-text absolute top-2 left-2" src="../src/assets/icons/search-normal.png" alt="search" />
          <input className="placeholder:text-color-pink text-[12px] outline-none border border-color-pink rounded pl-8 pr-4 py-2 " type="search"
            value={searchItem}
            onChange={ handleChange}
            name="search"
            id="search"
            placeholder={placeholder || 'Search posts, creators...'}
          />
        </div>
        {/* icons */}
        <div className="flex space-x-2 items-center">
          <Link to="#">
            <img className="w-4 h-4" src="../src/assets/icons/home.png" alt="home" />
          </Link>
          <Link to="#">
            <img className="w-4 h-4" src="../src/assets/icons/message.png" alt="" />
          </Link>

          <Link to="#">
            <img className="w-4 h-4" src="../src/assets/icons/notification.png" alt="" />
          </Link>
         {/* toggle mode */}
          <div className={` relative bg-color-lightGrey rounded-xl cursor-pointer w-8 h-2 items-center transition-all duration-200 ease-in-out ${isCreator ? 'justify-start' : 'justify-end'}`} onClick={toggleMode}>
            <div className={`absolute transform ${isCreator ? 'left-0' : 'right-0'}`}>
              {isCreator ? <img className="w-4 h-4 mt-[-4px]" src="../src/assets/icons/people-frame.png" alt="" /> : <img className="w-4 h-4 p-1 mt-[-4px] bg-color-pink rounded-full" src="../src/assets/icons/profile-white.png" alt="" />

              }
            </div>


          </div>

          {/* profile */}
          <div className="flex">
            <div>
            {profilePic && <img src={profilePic} alt="Profile Pic" />}
            </div>
            <img src="../src/assets/icons/Icons.png" alt="" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header