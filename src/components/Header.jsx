import React, { useState } from "react"

function Header({ placeholder }) {

  
    const [searchItem, setSearchItem] = useState("");

    const handleChange = (e) => setSearchItem(e.target.value)

    // search logic
  

  return (
    <header className="text-[16px] px-10 pt-8 pb-6   md:flex md:justify-between">
      <div >
        {/* logo */}
        <p className="text-color-0 font-bold ">Just<span className="text-color-8">fans</span>.ng</p>
      </div>
      <div className=" md:flex w-80 items-center justify-between hidden">
        {/* search bar */}
        <div className="relative">
          <img className="w-4 h-4 cursor-text absolute top-2 left-2" src="../src/assets/icons/search-normal.png" alt="search" />
          <input className="placeholder:text-color-8 text-[12px] outline-none border border-color-8 rounded pl-8 pr-4 py-2 " type="search"
            value={searchItem}
            onChange={() => handleChange()}
            name="search"
            id="search"
            placeholder={placeholder ? placeholder : 'Search posts, creators...'}
          />
        </div>
        {/* icons */}
        <div className="flex space-x-2 items-center">
          <a href="#">
            <img className="w-4 h-4" src="../src/assets/icons/home.png" alt="home" />
          </a>
          <a href="#">
            <img className="w-4 h-4" src="../src/assets/icons/message.png" alt="" />
          </a>
        
          <a  href="#">
            <img className="w-4 h-4" src="../src/assets/icons/notification.png" alt="" />
          </a>
          {/*  i do not understand what is going on here, slide left and right  */}
          <a href="#" >

            <img className="w-4 h-4" src="../src/assets/icons/people-frame.png" alt="" />
            <div></div>
          </a>

          {/* profile */}
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