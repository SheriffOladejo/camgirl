import React, { useState } from 'react';
import MobileFooterNav from '../../components/MobileFooterNav';
import { useMediaQuery } from 'react-responsive';
import LeftBar from '../../components/LeftBar';
import RightBar from '../../components/RightBar';
import Header from '../../components/Header';
import Posts from '../../components/Posts';

function CreatorProfile() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const headerImg = null;
  const isVerified = true;
  const isOnline = true;

  const [activeTab, setActiveTab] = useState('Posts');

  return (
    <>
      <section className="w-full">
        {!isMobile && <Header />}
        <div className="flex w-full px-0 h-auto md:space-x-4 md:px-16 overflow-y-visible bg-color-lightGrey ">
          <LeftBar className="w-1/4" />
          <section className="md:w-7/12 w-full h-full md:mt-7 ">
            <div className="w-full  relative bg-color-white ">
              {/* header img */}
              <div className="relative  ">
                {headerImg ? (
                  <img src={headerImg} alt="Header" className="w-full h-full object-cover" />
                ) : (
                  <img src="../src/assets/background/bgimg.jpg" alt="Profile Pic" className="w-full h-[30vh]  object-cover" />
                )}
                <img src="../src/assets/icons/settings-icon.png" alt="settings" className="w-4 h-4 absolute top-4 right-4" />
              </div>
              <div>
                {/* profile picture */}
                <img src="../src/assets/images/safari-adventure.jpg" alt="profile picture" className="rounded-full w-20 h-20 absolute  left-4 transform -translate-y-1/2 border-2 border-color-pink" />
              </div>
            </div>

            <div className="bg-color-white  space-y-2 pt-16">
              {/* profile details */}
              <div className="flex items-center px-4 justify-between ">
                <div>
                  <h1 className="font-bold text-[16px] flex items-center">
                    Case Cert {isVerified && <span><img src="../src/assets/icons/verifiied.png" alt="is verified" className="w-4 h-4 ml-2" /></span>}
                  </h1>
                  <p className="font-thin text-[12px]">@handle {isOnline && <span>Online now</span>}</p>
                </div>
                <div className="flex justify-end items-center space-x-2  cursor-pointer z-100 bg-color-white">
                  {/* direct message */}
                  <a href="#" className="border px-2 border-color-pink cursor-pointer">
                    <img src="../src/assets/icons/icon2.png" alt="direct message" className="w-8 h-8" />
                  </a>
                  {/* subscribe btn */}
                  <button className="shadow bg-color-pink py-2 px-4 rounded-md text-color-white text-[12px] cursor-pointer">Subscribe ₦3,000.00/month</button>
                </div>
              </div>
              {/* bio */}
              <div className="px-4 space-y-2">
                <p className="text-[12px] font-medium">I'm a 90s baby without a baby! - Just fur babies - 1 dog 🐶 and 2 cats 😺😺 I Love Working Out 💪 Chilling at Home</p>
                {/* location */}
                <p className="text-[12px]">Lagos State, Nigeria <span><a href="#" className="text-color-pink">Contact info</a></span></p>
                {/* amount of subscribers */}
                <p className="text-[12px]">20k subscribers</p>
              </div>
              <div className="">
                <div className="flex w-full justify-around text-[12px] mt-6">
                  <div
                    className={`cursor-pointer text-center  w-1/2 font-medium ${activeTab === 'Posts' ? 'text-color-pink border-b-2 pb-4 border-color-pink' : 'text-color-grey'}`}
                    onClick={() => setActiveTab('Posts')}
                  >
                    <p>Posts</p>
                  </div>
                  <div
                    className={`cursor-pointer font-medium text-center w-1/2 ${activeTab === 'Media' ? 'text-color-pink border-b-2 border-color-pink pb-4' : 'text-color-grey'}`}
                    onClick={() => setActiveTab('Media')}
                  >
                    <p>Media</p>
                  </div>
                </div>

              </div>

            </div>
            <div className='mt-4'>
              {activeTab === 'Posts' && <Posts />}
            </div>
          </section>
          <RightBar className="w-1/4 mt-0" showGallery={window.location.pathname === '/profile'} />
        </div>
      </section>
      {isMobile && <MobileFooterNav active="Home" />}
    </>
  );
}

export default CreatorProfile;
