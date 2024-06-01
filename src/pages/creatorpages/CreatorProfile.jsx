
import MobileFooterNav from '../../components/MobileFooterNav'
import { useMediaQuery } from 'react-responsive';
import LeftBar from '../../components/LeftBar'
import RightBar from '../../components/RightBar'
import Header from '../../components/Header'
function CreatorProfile() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const headerImg = null
  let isVerified = true
  let isOnline = true
  return (
    <>
      <section className="w-[100%]  ">
        {isMobile ? '' : <Header />}
        <div className="flex w-full space-x-4 md:px-16 overflow-y-visible bg-color-lightGrey md:h-[135vh]">
          <LeftBar className={`w-[25%] `} />
          <section className="md:w-[55%] h-full mt-7 bg-color-white">
            <div className="w-full h-[30%] relative">

              {/* header img */}
              {headerImg ? <img src={headerImg} alt=" Header" className=" " /> : <img src="../src/assets/background/bgimg.jpg" alt="Profile Pic" className="w-full h-full  object-cover " />}


              <div>
                {/* profile picture */}
                <img src="../src/assets/images/safari-adventure.jpg" alt="profile picture" className="rounded-full w-24 h-24 absolute top-[78%] left-4 border-2 border-color-9 after:p-2 " />
              </div>

            </div>

            <div className='bg-color-white'>
              {/* profile details */}
              <div className='mt-[15%] flex items-center justify-between  md:px-4'>
                <div>
                  <h1 className="font-bold text-[18px] flex items-center ">Case Cert {isVerified && <span><img src="../src/assets/icons/verifiied.png" alt="is verified" className="w-4 h-4 ml-2" /></span>}</h1>
                  <p className="font-thin text-[12px]">@handle {isOnline && <span>Online now</span>}</p>
                </div>
                <div className="flex">
                  {/* direct message */}
                  <a href="#"><img src="../src/assets/icons/icon2.png" alt="direct message" className="w-10 h-10 " /></a>

                  {/* subscribe btn */}
                  <button className="shadow bg-color-pink px-2 rounded-md text-color-white">Subscribe</button>
                </div>
              </div>
              {/* bio */}
              <div className='md:px-4'>
                <p>I'm a 90s baby without a baby! - Just fur babies - 1 dog 🐶and 2 cats 😺😺 I Love Working Out 💪 Chilling at Home</p>
                {/* location */}
                <p>Lagos State, Nigeria <span><a href="#">Contact info</a></span></p>
                {/* amount of subscribers */}
                <p>20k subscribers</p>
              </div>

              <div  className='md:px-4'>
                <div>
                  <div><p>Posts</p></div>
                  <div><p>Media</p></div>
                </div>
              </div>
            </div>
          </section>
          <RightBar className={`md:w-[25%]  mt-0`} showGallery={window.location.pathname === '/profile'} />
        </div>
      </section>

      {isMobile && <MobileFooterNav active={'Home'} />}
    </>

  )
}

export default CreatorProfile