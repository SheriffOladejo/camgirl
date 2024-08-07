import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import MobileFooterNav from '../../components/MobileFooterNav';
import LeftBar from '../../components/LeftBar';
import RightBar from '../../components/RightBar';
import Header from '../../components/Header';
import Posts from '../../components/Posts';
import ProfileImageModal from '../../components/ProfileImageModal';
import DbHelper from '../../utils/DbHelper';
import MediaPosts from '../../components/MediaPosts';
import LoadingSpinner from '../../components/LoadingSpinner';
import { AuthContext } from '../../context/authContext';

function CreatorProfile() {
  const { user_id } = useParams();
  console.log('User ID from Params:', user_id);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const headerImg = null;
  const isVerified = true;
  const isOnline = true;
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('Posts');
  const [profileData, setProfileData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const { currentUser } = useContext(AuthContext);
  console.log('Current User:', currentUser);
  const currentUserId = currentUser ? currentUser.user_id : null;
  console.log('Current User ID:', currentUserId);
  const userId = user_id ? user_id : currentUserId;
  console.log('Resolved User ID:', userId);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        console.log('Fetching profile data for userId:', userId);
        const dbHelper = new DbHelper();
        const user = await dbHelper.getAppUserByID(userId);
        console.log('Fetched profile data:', user);
        setProfileData(user);
      } catch (error) {
        setError('Error fetching profile data');
        console.error('Error fetching profile data:', error);
      }
    }

    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        console.log('Fetching posts for userId:', userId);
        const dbHelper = new DbHelper();
        const usersPost = await dbHelper.getPostsByUserID(userId);
        console.log('Fetched posts:', usersPost);
        setPosts(usersPost);
      } catch (error) {
        setError('Error fetching posts');
        console.error('Error fetching posts:', error);
      }
    }

    if (userId) {
      fetchPosts();
    }
  }, [userId]);
  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div><LoadingSpinner /></div>;
  }

  const { profile_picture, firstname, lastname, username, bio, country, phone_number, subscribers } = profileData;
  const profilePic = profile_picture || '../../dist/images/safari-adventure.jpg';

  return (
    <>
      <section className="w-full">
        {!isMobile && <Header />}
        <div className="flex w-full px-0 h-auto md:space-x-4 md:px-16 overflow-y-visible bg-color-lightGrey">
          <LeftBar className="w-1/4" />
          <section className="md:w-7/12 w-full h-full md:mt-7">
            <div className="w-full relative bg-color-white">
              <div className="relative">
                {headerImg ? (
                  <img src={headerImg} alt="Header" className="w-full h-full object-cover" />
                ) : (
                  <img src="../../dist/background/bgimg.jpg" alt="Profile Pic" className="w-full h-[30vh] object-cover" />
                )}
                <button>
                  <img src="../../dist/icons/settings-icon.png" alt="settings" className="w-4 h-4 absolute top-4 right-4" />
                </button>
              </div>
              <div className="absolute left-4 top-20">
                <img
                  src={profilePic}
                  alt="Profile Pic"
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border-4 object-cover border-color-pink cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
            </div>
            {isModalOpen && (
              <ProfileImageModal isOpen={isModalOpen} imageSrc={profilePic} onClose={() => setIsModalOpen(false)} />
            )}
            <div className="bg-color-white space-y-2 pt-12">
              <div className="flex items-center px-4 justify-between">
                <div>
                  <h1 className="font-bold text-[16px] flex items-center">
                    {firstname && lastname ? `${firstname} ${lastname}` : 'Case Cert'}
                    {isVerified && <img src="../../dist/icons/verifiied.png" alt="is verified" className="w-4 h-4 ml-2" />}
                  </h1>
                  <p className="font-thin text-[12px]">@{username ? username : 'casecert'} {isOnline && <span>Online now</span>}</p>
                </div>
                <div className="flex justify-end items-center space-x-2 cursor-pointer z-100 bg-color-white">
                  <Link to="/messages" className="border px-2 border-color-pink cursor-pointer">
                    <img src="../../dist/icons/icon2.png" alt="direct message" className="w-6 h-6 md:w-8 md:h-8" />
                  </Link>
                  <button className="shadow text-[10px] py-2.5 px-4 bg-color-pink md:py-2 md:px-4 rounded-md text-color-white md:text-[12px] cursor-pointer">
                    Subscribe ₦3,000.00/month
                  </button>
                </div>
              </div>
              <div className="px-4 space-y-2">
                <p className="text-[12px] font-medium">{bio || "I'm a 90s baby without a baby! - Just fur babies - 1 dog 🐶 and 2 cats 😺😺 I Love Working Out 💪 Chilling at Home"}</p>
                <p className="text-[12px]">{country || "Nigeria"} <span><a href={`#${phone_number}`} className="text-color-pink">Contact info</a></span></p>
                <p className="text-[12px]">{subscribers ? `${subscribers} subscribers` : "20k subscribers"}</p>
              </div>
              <div>
                <div className="flex w-full justify-around text-[12px] mt-6">
                  <div
                    className={`cursor-pointer text-center w-1/2 font-medium ${activeTab === 'Posts' ? 'text-color-pink border-b-2 pb-4 border-color-pink' : 'text-color-grey'}`}
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
            <div className="mt-4">
              {activeTab === 'Posts' ? (
                     <Posts posts={posts} setPosts={setPosts} addPost={addPost} />
              ) : (
                <>
                  <h2>MediaPosts Component</h2>
                  <MediaPosts userId={userId} />
                </>
              )}
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
