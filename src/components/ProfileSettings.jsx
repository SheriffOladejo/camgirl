import TextareaAutosize from 'react-textarea-autosize';
import FormInput from './FormInput'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MobileFooterNav from '../components/MobileFooterNav'
import { useMediaQuery } from 'react-responsive';
function ProfileSettings() {
  let headerImg = null
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [formInput, setFormInput] = useState({
    username: "",
    bio: "",
    websiteUrl: "",
    location: "",
    dob: 0 // Initialize with a default value
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput(prev => ({ ...prev, [name]: value }));
    validateInput(name, value);
  }
  
  return (
    <>
    <div

      className="flex flex-col right-bar overflow-y-scroll h-[135vh] bg-color-white  md:h-full md:sticky rounded shadow pb-6 md:pb-4 md:mt-7 w-full"
    >
      <div className='flex py-3  ml-4 justify-start items-center space-x-2'>
        <img src="../src/assets/icons/back-arrow.png" alt="go back" className='w-4 h-4' onClick={() => navigate("/settings")} />
        <h4 className='font-bold'>Profile Settings</h4>
      </div>
      <div className="w-full h-64">
        {/* header img */}
        {headerImg ? (
          <img src={headerImg} alt="Header" className=" " />
        ) : (
          <div className=' h-[30vh] relative cursor-pointer before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-color-black/30 before:z-10 before:pointer-events-none hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:w-full hover:before:h-full hover:before:bg-color-black/30 hover:before:z-10 hover:before:pointer-events-none'>
            <img
              src="../src/assets/background/bgimg.jpg"
              alt="Profile Pic"
              className="w-full h-full object-cover "
            />
            <img alt='add cover photo' className='profile-settings-gallery-add absolute top-[40%] left-[48%]   transition-opacity transition-visibility duration-300 ease-in-out hover:opacity-100 hover:visible z-20' src='../src/assets/icons/gallery-add.png' />
            {/* <div className='absolute z-40 w-full h-full  bg-color-black/30 left-4 top-0'></div> */}
          </div>
        )}

        {/* profile picture */}
        <div className='relative bottom-12 ml-2 w-24 h-24 rounded-full z-50  flex items-center justify-center cursor-pointer before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-color-black/30  before:rounded-full before:z-10 before:pointer-events-none hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:w-full hover:before:h-full hover:before:bg-color-black/30 hover:before:z-10 hover:before:pointer-events-none   transition-opacity transition-visibility duration-300 ease-in-out group-hover:opacity-100 group-hover:visible '>
          <img
            src="../src/assets/images/safari-adventure.jpg"
            alt="profile picture"
            className="  p-1 bg-color-pink w-full h-full object-cover rounded-full"
          />
          <img alt='add profile photo' className='profile-settings-gallery-add absolute top-[40%] left-[39%]   transition-opacity transition-visibility duration-300 ease-in-out hover:opacity-100 hover:visible z-20' src='../src/assets/icons/gallery-add.png' />


        </div>
      </div>
      <div className='px-2'>
        <form action="" method='GET' className=' flex flex-col space-y-4'>
          <div>
            <label htmlFor="username" className='text-[14px] font-semibold'>Display Name</label>
            <FormInput
              name="username"
              type="text"
              id="username"
              placeholder="Case Cert"
              value={formInput.username}
              onChange={handleInputChange} />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="bio" className='text-[14px] font-semibold'>Bio</label>
            <TextareaAutosize
              name="bio"
              
              id="bio"
              placeholder="I'm a 90s baby without a baby! - Just fur babies - 1 dog 🐶and 2 cats 😺😺 I Love Working Out 💪 Chilling at Home"
              value={formInput.bio}
              onChange={handleInputChange}
              className='border-2 border-color-lightGrey p-3 placeholder:text-[14px] outline-none resize-none text-[14px] text-color-grey' />
          </div>
          <div className=''>
            <label htmlFor="websiteUrl" className='text-[14px] font-semibold'>Website URL</label>
            <FormInput
              name="websiteUrl"
              type="text"
              id="websiteUrl"
              placeholder="www.casecert.io"
              value={formInput.websiteUrl}
              onChange={handleInputChange} />
          </div>
          <div className=''>
            <label htmlFor="location" className='text-[14px] font-semibold'>Location</label>
            <FormInput
              name="location"
              type="text"
              id="location"
              placeholder="Lagos Ng"
              value={formInput.location}
              onChange={handleInputChange} />
          </div>
          <div className=''>
            <label htmlFor="dob" className='text-[14px] font-semibold'>D.O.B</label>
            <FormInput
              name="dob"
              type="text"
              id="dob"
              placeholder="05/12/98"
              value={formInput.dob}
              onChange={handleInputChange} />
          </div>
        </form>
        <hr className='mt-4 border-color-lightGrey ' />
        <button className='flex items-center justify-start mt-4 text-[14px] text-color-grey font-semibold'>
          <img src="../src/assets/icons/profile.png" alt="" className='mr-2'/>
          switch to Creator
        </button>
      </div>

    </div>
     {isMobile && <MobileFooterNav active={'Home'}/>}
     </>
  );
}

export default ProfileSettings