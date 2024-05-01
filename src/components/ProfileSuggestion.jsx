import React from 'react'
// auth context, add info
function ProfileSuggestion({ username, handle, isCertified, subscriptionStatus, online, className }) {
  return (
      <div className={` ${ className && 'px-2 py-2'}`} >
    {/* mapping will occur here cause we need to get the details */}
    <div className='profileStyle flex w-full justify-between items-center rounded p-3 h-16'>
    
        <img src="../src/assets/profileImg.png" alt="profile image" className='w-12 h-12 p-[0.1rem] bg-gradient-to-t from-color-pink via-color-3 to-color-pink rounded-full' loading='lazy' />
      
{/* profile info */}
      <div className="text-color-white">
        <div className='flex items-center'>
          <h6 className='text-[0.8rem] font-semibold '>{username} </h6>
          {isCertified && <img src="../src/assets/icons/certified.png" alt="certified" loading='lazy' className='w-4 h-4' />}
        </div>
        {/* dynamic: handle created from sign up */}
        <p className='text-[0.8rem] '>@{handle}caseyii2</p>
      </div>
      {/* dynamic */}
      <p className='text-[0.7rem] text-color-pink '>{subscriptionStatus}</p>
    </div>
  </div>
  )
}

export default ProfileSuggestion