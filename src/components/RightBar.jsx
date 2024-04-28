
import ProfileSuggestion from './ProfileSuggestion'
import { fauxUsers } from '.';
function RightBar() {
  // Group fauxUsers into arrays of 4 users each
  const groupedUsers = fauxUsers.reduce((acc, user, index) => {
    const groupIndex = Math.floor(index / 4);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(user);
    return acc;
  }, []);


  const leftClick = () => {
   
  }
  const rightClick = () => {
   
  }
  return (



    <div className=' hidden md:flex flex-col md:w-[40%] sticky top-[30%] overflow-y-scroll right-bar pt-24 rounded'>
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
        <div>
          {groupedUsers.map((group, index) => (
            <div key={index} >
              <div className="flex flex-col gap-4">
                {group.map((user, userIndex) => (
                  <ProfileSuggestion
                    key={userIndex}
                    username={user.username}
                    isCertified={user.isCertified}
                    subscriptionStatus={user.subscriptionStatus}
                  />
                ))}
         </div>
         </div>
         ))}
      
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