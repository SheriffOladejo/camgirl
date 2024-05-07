import ProfileSuggestion from './ProfileSuggestion';
import { fauxUsers } from '.';
import Carousel from './Carousel';
import { liveUsers } from '.';
import LiveUser from './LiveUser';

function RightBar({ className }) {
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
    acc[liveGroupIndex].push(liveUser);
    return acc;
  }, []);

  return (
    <div
      className={
        className &&
        ` pt-[20px] md:sticky mt-[5.7rem]  rounded-xl overflow-y-auto messages-chat-list space-y-4 hidden md:flex md:flex-col h-[220%]`
      }
      style={{
       
        maxHeight: 'calc(100vh - 31%)', // Adjusted to fill remaining viewport height below top 20%
        
      }}
    >
      <Carousel className="p-4" text="suggestion">
        {groupedUsers.map((group, index) => (
          <div key={index} className="w-full flex flex-col space-y-4">
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

      <Carousel className="mt-4" text="Join Live">
        {groupedLiveUsers.map((group, index) => (
          <div key={index} className="w-full flex flex-col space-y-4 ">
            <div className="flex justify-center">
              <div>
                {' '}
                {group.map((user) => (
                  <LiveUser key={user.id} username={user.username} avatar={user.avatar} />
                ))}
              </div>
              <div>
                {' '}
                {group.map((user) => (
                  <LiveUser key={user.id} username={user.username} avatar={user.avatar} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <ul className="flex text-[0.7rem] text-color-grey justify-between list-disc ">
        <li>
          {' '}
          <a href="#">Contact us</a>
        </li>
        <li>
          {' '}
          <a href="#">Terms of Services</a>
        </li>
        <li>
          {' '}
          <a href="#">Privacy</a>
        </li>
      </ul>
    </div>
  );
}

export default RightBar;
