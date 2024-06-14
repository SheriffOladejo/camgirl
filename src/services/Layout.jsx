import React from 'react'
import Header from '../components/Header'
import LeftBar from '../components/LeftBar'
import { Outlet } from 'react-router-dom'
import RightBar from '../components/RightBar'
import MobileHeader from '../components/MobileHeader'
import { useMediaQuery } from 'react-responsive';
import MobileFooterNav from '../components/MobileFooterNav'
import FloatingButton from '../components/FloatingButton'
import { scrollToTop } from '../utils/Utils';
function Layout() {
  
  const isMobile = useMediaQuery({ maxWidth: 768 }); 
  // Define the breakpoint for mobile screens
  return (
    <section className="md:bg-color-lightGrey ">
      {isMobile ? <MobileHeader /> : <Header />}
      <div className="flex md:px-16  md:bg-color-lightGrey  ">
        <div className={` md:w-[35%]`}>
        <LeftBar className={` md:w-[100%] pr-10`}/>
        </div>
       
        <div className='md:w-[55%] md:px-[20px] md:pt-6 h-auto overflow-x-hidden md:overflow-x-visible w-full 
        '>
        <Outlet />
        </div>
       
        <RightBar className={` md:[25%] mt-[1.5rem]`} />
      </div>
      {isMobile && <FloatingButton /> }
      {isMobile && <MobileFooterNav /> }
    </section>
  )
}

export default Layout