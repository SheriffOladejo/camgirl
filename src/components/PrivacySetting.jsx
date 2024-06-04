
import ToggleBtn from './ToggleBtn'
import { useNavigate } from "react-router-dom";
import MobileFooterNav from '../components/MobileFooterNav'
import { useMediaQuery } from 'react-responsive';
function PrivacySetting() {
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <>
      <div className="flex flex-col h-[100vh] bg-color-white messages-convo-list rounded w-full shadow pb-6 md:h-[90vh] md:sticky   md:pb-4   md:mt-7 ">

        <div className='flex py-3  ml-4 justify-start items-center space-x-2'>
          <img src="../src/assets/icons/back-arrow.png" alt="go back" className='w-4 h-4' onClick={() => navigate('/settings')} />
          <h4 className='font-bold'>Privacy And Safety</h4>
        </div>
        <div className='py-4 space-y-6'>
          <div className='space-y-6 px-4'>
            <div className='flex   items-start justify-between'>
              <div className='block'>
                <h2 className='font-bold text-[14px]'>Audience and tagging</h2>
                <h6 className='font-semibold text-color-7 text-[14px]'>Allow others to mention me in their posts and comments</h6>
              </div>
              <div className='mt-2'>
                <ToggleBtn />
              </div>
            </div>
            <div className='flex   items-start justify-between'>
              <div className='block'>
                <h2 className='font-bold text-[14px]'>Appear in live suggestion</h2>
                <h6 className='font-semibold text-color-7 text-[14px]'>Let people know when you’re live</h6></div>
              <div className='mt-2'>
                <ToggleBtn />
              </div>
            </div>
            <div className='flex   items-start justify-between'>
              <div className='block'>
                <h2 className='font-bold  text-[14px]'>Show activity status</h2> <h6 className='font-semibold text-color-7 text-[14px]'>Let others know when you're online</h6></div>
              <div className='mt-2'>
                <ToggleBtn />
              </div>
            </div>
          </div>
          {/* clickable */}
          <div className='space-y-6 px-4' >
            {/*  */}
            <div className='flex justify-between items-center'>
              <div ><h2 className='font-semibold  text-[14px]'>Direct messages</h2> <h6 className='font-semibold text-color-7 text-[12px]'>Manage who can message you directly</h6></div>
              <div  className='w-2 h-3'>
                <img src="../src/assets/icons/active-black.png" alt='' />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div ><h2 className='font-semibold  text-[14px]'>Mute & Block</h2> <h6 className='font-semibold text-color-7 text-[12px]'>Manage the accounts, words, and notifications that you’ve muted or blocked</h6></div>
              <div className='w-2 h-3'>
                <img src='../src/assets/icons/active-black.png' alt='' />
              </div>
            </div>
          </div>

          {/* privacy policies clickable*/}
          <div>
            <div className='flex justify-between border-y border-y-color-lightGrey py-2 cursor-pointer'>
              <span className='flex space-x-2 items-center px-4'> <img src="../src/assets/icons/document.png" alt="" className='w-4 h-4'/>
                <h6 className='text-color-grey text-[12px]  font-semibold'>Privacy policy</h6></span>

              <div className='px-4'>
                <img src='../src/assets/icons/active-black.png' alt='' className='w-2 h-2'  />
              </div>
            </div>
            <div className='flex justify-between  py-2 cursor-pointer'>
              <span className='flex space-x-2 items-center px-4'> <img src="../src/assets/icons/sms.png" alt="" className='w-4 h-4'/>
                <h6 className='text-color-grey text-[12px]  font-semibold'>Contact Support</h6></span>

              <div className='px-4'>
                <img src='../src/assets/icons/active-black.png' alt='' className='w-2 h-2'  />
              </div>
            </div>
        
          </div>
        </div>
      </div>
      {isMobile && <MobileFooterNav active={'Home'}/>}
    </>
  )
}

export default PrivacySetting