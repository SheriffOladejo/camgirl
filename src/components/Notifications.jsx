import React from 'react'

function Notifications() {

  const markAllAsRead = () => {

  }

  return (
    <div>
      <div className='p-4 bg-color-white'>
        <div className='flex items-center justify-between'>
          <h2 className='font-bold text-[14px]'>Notifications</h2>
          <p className='font-normal text-[12px]' onClick={markAllAsRead}>Mark all as read</p>
        </div>

        <div >
          {/* profile picture */}
          <img src="../assets/profileImg.png" alt="" className='rounded-full w-4 h-4 p-1  bg-color-4 ' />
          {/* profile details */}
          <div className='flex justify-start items-start '>
            <div className='flex justify-evenly'>
              {/* name */}
              <a href="#" className='font-bold text-[14px] '>Case Cert</a>
              {/* username */}
              <p className='text-color-grey text-[10px] '>@username</p>
            </div>
            <p className='font-semibold text-[14px]'>Uploaded a new picture</p>
          </div>
          {/* time */}
          <p className='text-color-grey text-[12px]'>08:00am</p>
        </div>

        <div className='text-center border-t border-t-color-lightGrey'>
          <button>View all</button>
        </div>
      </div>
    </div>
  )
}

export default Notifications