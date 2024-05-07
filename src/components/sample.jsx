

import ProfileSuggestion from './ProfileSuggestion'
import { fauxUsers } from '.';
import Carousel from './Carousel';
import { liveUsers } from '.';
import LiveUser from './LiveUser';
function Sample() {

 
  // Group fauxUsers into arrays of 4 users each
  const groupedUsers = fauxUsers.reduce((acc, user, index) => {
    const groupIndex = Math.floor(index / 4);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(user);
    return acc;
  }, []);
  const groupedLiveUsers = liveUsers.reduce((acc, liveUser, index) => {
    const liveGroupIndex = Math.floor(index / 3);
    if (!acc[liveGroupIndex]) {
      acc[liveGroupIndex] = [];
    }
    acc[liveGroupIndex].push( liveUser);
    return acc;
  }, []);
 
  return (



    <div className='flex flex-col w-[40%] sticky  overflow-x-scroll right-bar pt-28 rounded'>
      <Carousel text="suggestion">
      {groupedUsers.map((group, index) => (
            <div key={index} className='w-full flex flex-col space-y-4'>
             
                {group.map((user, userIndex) => (
                  <ProfileSuggestion
                    key={userIndex}
                    username={user.username}
                    isCertified={user.isCertified}
                    subscriptionStatus={user.subscriptionStatus}
                  
                  />
                ))}
        
         </div>
         ))}
      
      </Carousel>
      
       
        
      
         
      <Carousel text="Join Live">
      {groupedLiveUsers.map((group, index) => (
            <div key={index} className='w-full flex flex-col  space-y-4'>
             <div className="flex space-x-2">
              <div> {group.map((user, ) => (
                  <LiveUser
                  key={user.id}
                  username={user.username}
                  avatar={user.avatar}
                  
                  />
                ))}</div>
              <div> {group.map((user, ) => (
                  <LiveUser
                  key={user.id}
                  username={user.username}
                  avatar={user.avatar}
                  
                  />
                ))}</div>
             </div>
              
        
         </div>
         ))}
      
      </Carousel>
      
      <div>
        <div>
          <p>Join Live</p>
          <div>
            <a  href="#">
              <img src="../src/assets/icons/arrow-left.png" alt="left click" />
            </a>
            <a href="#">
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

export default Sample