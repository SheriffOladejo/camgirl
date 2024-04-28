import React, { useState } from "react"
import Logo from "./Logo";
import { Link } from "react-router-dom";
function Header({ placeholder }) {

  
    const [searchItem, setSearchItem] = useState("");

    const handleChange = (e) => setSearchItem(e.target.value)

    // search logic
  

  return (
    <header className="text-[16px] px-10 pt-8 pb-6   md:flex md:justify-between md:items-center sticky top-0 z-20 bg-color-white md:shadow-md">
     <Logo color={"text-color-0"}/>
      <div className=" md:flex w-80 items-center justify-between hidden">
        {/* search bar */}
        <div className="relative">
          <img className="w-4 h-4 cursor-text absolute top-2 left-2" src="../src/assets/icons/search-normal.png" alt="search" />
          <input className="placeholder:text-color-pink text-[12px] outline-none border border-color-pink rounded pl-8 pr-4 py-2 " type="search"
            value={searchItem}
            onChange={() => handleChange()}
            name="search"
            id="search"
            placeholder={placeholder ? placeholder : 'Search posts, creators...'}
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
        
          <Link  to="#">
            <img className="w-4 h-4" src="../src/assets/icons/notification.png" alt="" />
          </Link>
          {/*  users can click between fan or creator mode and they should be able to slide to the left or right, if they slide right or click and it slides right the imge should change to the creator image and the bg as well, also they would have different info showing  */}
          <div  >

            <img className="w-4 h-4" src="../src/assets/icons/people-frame.png" alt="" />
            <div></div>
          </div>

          {/* profile : clicking on the menu would drop down and show links to other parts of the website, and the profile picture is dynamic*/}
          <div className="flex">
            <div>
              <img src="" alt="" />
            </div>
            <img src="../src/assets/icons/Icons.png" alt="" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header