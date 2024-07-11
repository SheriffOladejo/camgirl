
import ToggleBtn from './ToggleBtn'
import { useNavigate } from "react-router-dom";
import MobileFooterNav from '../components/MobileFooterNav'
import { useMediaQuery } from 'react-responsive';
function NotificationSettings() {
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <>
    <div className="flex flex-col h-[100vh] bg-color-white messages-convo-list rounded w-full shadow pb-6 md:h-[71vh] md:sticky   md:pb-4 md:mt-7  ">

      <div className='flex py-3  ml-4 justify-start items-center space-x-2'>
        <img src="../icons/back-arrow.png" alt="go back" className='w-4 h-4' onClick={() => navigate('/settings')} />
        <h4 className='font-bold'>Notifications</h4>
      </div>
      <div className='p-4 space-y-6'>
        <div className='space-y-6'>
          <div className='flex   items-start justify-between'>
            <div className='block'>
              <h2 className='font-bold text-[14px]'>Login Notifications</h2>
              <h6 className='font-semibold text-color-7 text-[14px]'>Get notified every time login occurs on this account</h6>
            </div>
            <div className='mt-2'>
              <ToggleBtn />
            </div>
          </div>
          <div className='flex   items-start justify-between'>
            <div className='block'>
              <h2 className='font-bold text-[14px]'>New Post Notifications</h2>
              <h6 className='font-semibold text-color-7 text-[14px]'>Get notified twice a day with new posts from followed creators.</h6></div>
            <div className='mt-2'>
              <ToggleBtn initialToggle={false}/>
            </div>
          </div>
          <div className='flex   items-start justify-between'>
            <div className='block'>
              <h2 className='font-bold  text-[14px]'>Live Notifications</h2> <h6 className='font-semibold text-color-7 text-[14px]'>Get notified each time a person you follow is live</h6></div>
            <div className='mt-2'>
              <ToggleBtn />
            </div>
          </div>
          <div className='flex   items-start justify-between'>
            <div className='block'>
              <h2 className='font-bold  text-[14px]'>New Message Notifications</h2> <h6 className='font-semibold text-color-7 text-[14px]'>Get notified when you receive a new message</h6></div>
            <div className='mt-2'>
              <ToggleBtn />
            </div>
          </div>
        </div>
       
      </div>
    </div>
    {isMobile && <MobileFooterNav active={'Home'}/>}
  </>
  )
}

export default NotificationSettings