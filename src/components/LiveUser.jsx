import { useLiveUsers } from '../context/liveUserContext';
function LiveUser({userId, avatar}) {
  // const {currentUser} = useContext(AuthContext)
  // const profilePic = currentUser ? currentUser.profilePic : null;
  const { liveUsers} = useLiveUsers();
  const isLive = liveUsers.some(user => user.id === userId);
    // Render nothing if the user is not live
    // if (!isLive) {
    //   return null;
    // }
  
  return (
    <div className=' p-1 w-17 h-17 bg-gradient-to-t from-color-pink via-color-3 to-color-pink rounded-full relative items-center overflow-hidden cursor-pointer'>
      <img src='../src/assets/profileImg.png' alt="profile image" className='w-16 h-16 '  />
      <div className='absolute bg-color-pink w-[90%] h-4 text-color-white bottom-2 text-center text-[0.7rem] overflow-x-hidden'>Live</div>

       {/* <img src={avatar} alt="profile image" className='w-16 h-16 '  /> */}
      {/* {profilePic && <img src={profilePic} alt="Profile Pic" className='bg-gradient-to-t from-color-pink via-color-3 to-color-pink rounded-full'/>} */}
    </div>
  )
}

export default LiveUser;