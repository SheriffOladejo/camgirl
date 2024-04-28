import React from 'react'
import Header from '../components/Header'
import LeftBar from '../components/LeftBar'
import { Outlet } from 'react-router-dom'
import RightBar from '../components/RightBar'

function Layout() {
  return (
    <section className="bg-color-lightGrey ">
      <Header />
      <div className="flex justify-between md:px-20 ">
        <LeftBar />
        <div className='md:w-[50%] pt-6'>
        <Outlet />
        </div>
       
        <RightBar />
      </div>
    </section>
  )
}

export default Layout