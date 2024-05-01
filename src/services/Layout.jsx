import React from 'react'
import Header from '../components/Header'
import LeftBar from '../components/LeftBar'
import { Outlet } from 'react-router-dom'
import RightBar from '../components/RightBar'
import MobileHeader from '../components/MobileHeader'
import { useMediaQuery } from 'react-responsive';

function Layout() {
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Define the breakpoint for mobile screens
  return (
    <section className="md:bg-color-lightGrey ">
      {isMobile ? <MobileHeader /> : <Header />}
      <div className="flex justify-between md:px-20 w-[100%] ">
        <LeftBar />
        <div className='md:w-[60%] pt-6'>
        <Outlet />
        </div>
       
        <RightBar />
      </div>
    </section>
  )
}

export default Layout