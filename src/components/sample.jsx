import { useState, useEffect } from 'react';
import ProfileSuggestion from './ProfileSuggestion'
import { fauxUsers } from '.';
function sample() {
  // Group fauxUsers into arrays of 4 users each
  const groupedUsers = fauxUsers.reduce((acc, user, index) => {
    const groupIndex = Math.floor(index / 4);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(user);
    return acc;
  }, []);

  const handleSlide = (direction) => {
    const slider = document.getElementsByClassName('carousel')[0];
    direction === 'left' ? slider.scrollBy(-400, 0) : slider.scrollBy(400, 0)
  }

  const leftClick = () => {
    handleSlide('left')
  };

  const rightClick = () => {
    handleSlide('right')
  };
  return (



    <div className=' hidden md:flex flex-col md:w-[40%] sticky  overflow-x-scroll right-bar pt-28 rounded'>
      <div className=' bg-color-white w-full max-w-[1100px] px-3 py-4'>
        <div className='flex justify-between items-center '>
          <p className='font-semibold text-[0.8rem]'>Suggestion</p>
          <div className='flex items-center bg-color-lighterGrey rounded-full  w-90 px-2 py-1.5'>
            <button onClick={leftClick} >
              <img src="../src/assets/icons/arrow-left.png" alt="left click" className='w-5 h-5' />
            </button>
            <button onClick={rightClick}  className='pl-2'>
              <img src="../src/assets/icons/arrow-right.png" alt="right click" className='w-5 h-5' />
            </button>

          </div>
        </div>
        <div className='overflow-x-auto scroll-smooth flex carousel max:w-[100%] snap-x-mandatory'>
          {groupedUsers.map((group, index) => (
            <div key={index} className='w-full flex flex-col '>
             
                {group.map((user, userIndex) => (
                  <ProfileSuggestion
                    key={userIndex}
                    username={user.username}
                    isCertified={user.isCertified}
                    subscriptionStatus={user.subscriptionStatus}
                    className="suggestion-card" 
                    style={{ minWidth: `${cardWidth}px` }}
                  />
                ))}
        
         </div>
         ))}
      
     </div>
         {/* Pagination */}
         <div className="flex justify-center mt-4">
          {groupedUsers.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`pagination-dot ${currentPage === index ? 'active' : ''}`}
            ></span>
          ))}
        </div>
      </div>
      <div>
        <div>
          <p>Join Live</p>
          <div>
            <a onClick={leftClick} href="#">
              <img src="../src/assets/icons/arrow-left.png" alt="left click" />
            </a>
            <a onClick={rightClick} href="#">
              <img src="../src/assets/icons/arrow-right.png" alt="right click" />
            </a>

          </div>
        </div>
        <div>
          {/* mapping will occur here cause we need to get the details */}
          <div>
            <div
              className='relative'> <img src="../src/assets/profileImg.png" alt="" /></div>


            {/* dynamic */}
            <span className='absolute bottom-3'>Live</span>
          </div>
        </div>
        {/* pagination */}
        <div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul>
        <li>Contact us</li>
        <li>Terms of Services</li>
        <li>Privacy</li>
      </ul>
    </div>
  )
}

export default sample