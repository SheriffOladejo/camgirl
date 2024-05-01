

import ProfileSuggestion from './ProfileSuggestion'
import { fauxUsers } from '.';
import Carousel from './Carousel';
import { liveUsers } from '.';
import LiveUser from './LiveUser';
function  RightBar() {

 
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



    <div className='hidden md:flex flex-col md:w-[20%] md:sticky  h-auto overflow-y-scroll right-4 right-bar pt-28 rounded space-y-4'>
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
            <div key={index} className='w-full flex flex-col  space-y-4 '>
             <div className="flex justify-center">
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
      
     
      <ul className='flex text-[0.7rem] text-color-grey justify-between list-disc '>
        <li>  <a href='#'>Contact us</a></li>
        <li> <a href='#'>Terms of Services</a></li>
        <li> <a href='#'>Privacy</a></li>
      
       
       
      </ul>
    </div>
  )
}

export default RightBar