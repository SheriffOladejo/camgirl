import React from "react"

function Header() {
  return (
    <header>
      <div className="text-[24px] px-[100px] pt-[48px] pb-[24px] hidden md:flex md:justify-between">
        {/* logo */}
        <p className="text-color-0 font-bold ">Just<span className="text-color-8">fans</span>.ng</p>
      </div>
      <div className="">
        <div className="search">
          <img src="../" alt="" />
          <input type="search" name="search" id="search" placeholder="Search posts, creators..." />
        </div>
        <div className="icons">
          <a href="#">
          <img src="../assets/icons/home.png" alt="" />
          </a>
          <a href="#">
          <img src="../assets/icons/home.png" alt="" />
          </a>
          <a href="#">
          <img src="../assets/icons/home.png" alt="" />
          </a>
          <a href="#">
          <img src="../assets/icons/home.png" alt="" />
          </a>
          <a href="#">
          <img src="../assets/icons/home.png" alt="" />
          </a>
          
        </div>
      </div>
    </header>
  )
}

export default Header