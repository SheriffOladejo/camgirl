import React from 'react'
import Header from '../components/Header'
import LeftBar from '../components/LeftBar'
import { Outlet } from 'react-router-dom'
import RightBar from '../components/RightBar'
import MobileHeader from '../components/MobileHeader'
import { useMediaQuery } from 'react-responsive';
import MobileFooterNav from '../components/MobileFooterNav'
import FloatingButton from '../components/FloatingButton'

function Layout() {
  const isMobile = useMediaQuery({ maxWidth: 768 }); 
  // Define the breakpoint for mobile screens
  return (
    <section className="md:bg-color-lightGrey ">
      {isMobile ? <MobileHeader /> : <Header />}
      <div className="flex md:px-16  bg-color-lightGrey  ">
        <LeftBar className={` md:w-[80%]`}/>
        <div className='md:w-3/5 px-[20px] pt-6 h-auto overflow-x-hidden md:overflow-x-visible '>
        <Outlet />
        </div>
       
        <RightBar className={` md:2/5`}/>
      </div>
      {isMobile && <FloatingButton /> }
      {isMobile && <MobileFooterNav /> }
    </section>
  )
}

export default Layout