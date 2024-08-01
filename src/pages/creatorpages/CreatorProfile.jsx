import React, { useState, useEffect, useContext} from 'react';
import MobileFooterNav from '../../components/MobileFooterNav';
import { useMediaQuery } from 'react-responsive';
import LeftBar from '../../components/LeftBar';
import RightBar from '../../components/RightBar';
import Header from '../../components/Header';
import Posts from '../../components/Posts';
import { Link, useParams } from 'react-router-dom';
import ProfileImageModal from '../../components/ProfileImageModal';
import { AuthContext } from '../../context/authContext'; // Import your AuthContext
import DbHelper from '../../utils/DbHelper';
import MediaPosts from '../../components/MediaPosts';
import LoadingSpinner from '../../components/LoadingSpinner';

function CreatorProfile() {
  const { user_id } = useParams();
  console.log(user_id)
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const headerImg = null;
  const isVerified = true;
  const isOnline = true;

  const [activeTab, setActiveTab] = useState('Posts');
  const [profileData, setProfileData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const { currentUser } = useContext(AuthContext);

  // const { profile_picture  } = currentUser || {};
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.user_id : null;
  const userId = user_id || currentUserId; 


  useEffect(() => {
    async function fetchProfileData() {
      try {
        const dbHelper = new DbHelper()
        const user = await dbHelper.getAppUserByID(userId);
        setProfileData(user);
        console.log(user); // Check the fetched user data
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  if (!profileData) {
    return <div><LoadingSpinner/></div>; // Display a loading state while fetching the data
  }

  const { profile_picture, firstname, lastname, username, bio, location, subscribers, country, phone_number } = profileData;
  const profilePic = profile_picture || null;
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
                  <img src="../background/bgimg.jpg" alt="Profile Pic" className="w-full h-[30vh]  object-cover" />
                )}
                {/* click event */}
                <button >
                  <img src="../icons/settings-icon.png" alt="settings" className="w-4 h-4 absolute top-4 right-4" />
                </button>
              </div>
              <div className='absolute left-4 top-28'>
                {/* profile picture */}

                {profilePic ? (
                  <img src={profilePic} alt="Profile Pic" className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border-4  cover border-color-pink cursor-pointer object-cover " onClick={() => setIsModalOpen(true)} />
                ) : (
                  <img src="../images/safari-adventure.jpg" alt="profile picture" className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border-4  cover top-10 border-color-pink cursor-pointer object-cover" onClick={() => setIsModalOpen(true)} />
                )}
              </div>
            </div>
            {isModalOpen && (
              <ProfileImageModal isOpen={isModalOpen} imageSrc={profilePic} onClose={() => setIsModalOpen(false)} />
            )}
            <div className="bg-color-white  space-y-2 pt-8">
              {/* profile details */}
              <div className="flex items-center px-4 justify-between ">
                <div>
                  <h1 className="font-bold text-[16px] flex items-center">
                  {firstname && lastname ? `${firstname} ${lastname}` : 'Case Cert'} {isVerified && <span><img src="../icons/verifiied.png" alt="is verified" className="w-4 h-4 ml-2" /></span>}
                  </h1>
                  <p className="font-thin text-[12px]">@{username? username : 'casecert'} {isOnline && <span>Online now</span>}</p>
                </div>
                <div className="flex justify-end items-center space-x-2  cursor-pointer z-100 bg-color-white">
                  {/* direct message */}
                  <Link to="/messages" className="border px-2 border-color-pink cursor-pointer">
                    <img src="../icons/icon2.png" alt="direct message" className="w-6 h-6 md:w-8 md:h-8" />
                  </Link>
                  {/* subscribe btn */}
                  <button className="shadow text-[10px] py-2.5 px-4 bg-color-pink md:py-2 md:px-4 rounded-md text-color-white md:text-[12px] cursor-pointer">Subscribe ₦3,000.00/month</button>
                </div>
              </div>
              {/* bio */}
              <div className="px-4 space-y-2">
                <p className="text-[12px] font-medium">{bio ? bio : "I'm a 90s baby without a baby! - Just fur babies - 1 dog 🐶 and 2 cats 😺😺 I Love Working Out 💪 Chilling at Home"}</p>
                {/* location */}
                <p className="text-[12px]"> {country ? country : " Nigeria"} <span><a href={`#${phone_number}`} className="text-color-pink">Contact info</a></span></p>
                {/* amount of subscribers */}
                <p className="text-[12px]">{subscribers ? `${subscribers} subscribers` : "20k subscribers"}</p>
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
              {activeTab === 'Posts' ? <Posts /> :  <MediaPosts userId={userId} />}
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
