import React from 'react'
import Header from '../components/Header'
import LeftBar from '../components/LeftBar'
import { Outlet } from 'react-router-dom'
import RightBar from '../components/RightBar'

function Layout() {
  return (
    <>
      <Header />
      <div className="flex justify-between px-20 bg-color-lightGrey py-10">
        <LeftBar />
        <div className='flex-6'>
        <Outlet />
        </div>
       
        <RightBar />
      </div>
    </>
  )
}

export default Layout