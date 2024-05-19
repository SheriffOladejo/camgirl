import { useState } from 'react'
import { mobileNav } from '.'
import { Link } from 'react-router-dom'

function MobileFooterNav({ active }) {


  return (
    <div className='flex justify-between items-center fixed bottom-0 w-full px-10 backdrop-blur-2xl bg-color-lightGrey'>
      {mobileNav.map((nav, index) => (

        <div key={index}>

          <Link to={nav.url}

            className={`flex flex-col w-full items-center justify-between p-2 text-color-grey active:text-color-pink     rounded-r-lg hover:text-color-pink  ${active === nav.title && 'text-color-pink'}`} >
            <img src={nav.img} alt={nav.title} className="mr-2 w-5 h-5 hover:accent-color-pink active:accent-color-pink" />
            <span className="text-[0.8rem]">{nav.title}</span>
          </Link>
        </div>
      ))
      }
    </div>
  )
}

export default MobileFooterNav