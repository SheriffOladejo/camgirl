import { useRef } from 'react'
import Slider from 'react-slick';
import ProfileSuggestion from './ProfileSuggestion'
import { fauxUsers } from '.';
function RightBar() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  const leftClick = () => {
    sliderRef.current.slickNext();
  }
  const rightClick = () => {
    sliderRef.current.slickPrev();
  }
  return (



    <div className='flex-3 '>
      <div className='bg-color-white px-3 py-4'>
        <div className='flex justify-between items-center '>
          <p className='font-semibold text-[0.8rem]'>Suggestion</p>
          <div className='flex items-center bg-color-lighterGrey rounded-full  w-90 px-2 py-1.5'>
            <a onClick={leftClick} href="#">
              <img src="../src/assets/icons/arrow-left.png" alt="left click" className='w-5 h-5' />
            </a>
            <a onClick={rightClick} href="#" className='pl-2'>
              <img src="../src/assets/icons/arrow-right.png" alt="right click" className='w-5 h-5' />
            </a>

          </div>
        </div>
        {fauxUsers && fauxUsers.length > 0 ? (
          <Slider {...settings} ref={sliderRef}>
            {fauxUsers.map((user, index) => (
              <ProfileSuggestion
                key={index}
                username={user.username}
                isCertified={user.isCertified}
                subscriptionStatus={user.subscriptionStatus}
              />
            ))}
          </Slider>
        ) : (
          <p>No users available</p>
        )}
     
        {/* pagination */}
        <div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
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

export default RightBar