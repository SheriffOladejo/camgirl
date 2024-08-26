import TextareaAutosize from 'react-textarea-autosize';
import FormInput from './FormInput';
import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFooterNav from '../components/MobileFooterNav';
import { useMediaQuery } from 'react-responsive';
import { AuthContext } from "../context/authContext";

function ProfileSettings() {

  const [countries, setCountries] = useState([]);
  const { currentUser, updateCurrentUser } = useContext(AuthContext);
  const { profile_picture, cover_picture, username, bio, location, dob } = currentUser || {};
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [profileImage, setProfileImage] = useState(profile_picture || null);
  const [coverImage, setCoverImage] = useState(cover_picture || null);
  const [formInput, setFormInput] = useState({
    username: currentUser?.username || "",
    bio: currentUser?.bio || "",
    websiteUrl: currentUser?.websiteUrl || "",
    location: currentUser?.location || "Nigeria",
    dob: currentUser?.dob || "",
  });

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const countryNames = data.map((country) => country.name.common);
      setCountries(countryNames);
    };
    fetchCountries();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput(prev => ({ ...prev, [name]: value }));
  };

  const profileImageInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

  const openProfileImageDialog = () => {
    profileImageInputRef.current.click();
  };

  const openCoverImageDialog = () => {
    coverImageInputRef.current.click();
  };

  const updateProfileImage = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setProfileImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const updateCoverImage = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setCoverImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) updateProfileImage(file);
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) updateCoverImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userUpdate = {
      ...currentUser,
      ...formInput,
      profile_picture: profileImage,
      cover_picture: coverImage,
    };
    // Make sure at least one field is different before submitting
  if (JSON.stringify(userUpdate) === JSON.stringify(currentUser)) {
    alert("No changes detected.");
    return;
  }
    const response = await updateCurrentUser(userUpdate);
    if (response.success) {
      alert("Profile updated successfully!");
      navigate("/settings")
    } else {
      alert(response.message || "An error occurred while updating the profile.");
    }
  };

  return (
    <>
      <div className="flex flex-col right-bar overflow-y-scroll h-[135vh] bg-color-white md:h-full md:sticky rounded shadow pb-6 md:pb-4 md:mt-7 w-full">
        <div className='flex py-3 ml-4 justify-start items-center space-x-2'>
          <img src="../icons/back-arrow.png" alt="go back" className='w-4 h-4' onClick={() => navigate("/settings")} />
          <h4 className='font-bold'>Profile Settings</h4>
        </div>
        <div className="w-full h-64">
          {/* header img */}
          <div className='h-[30vh] relative cursor-pointer before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-color-black/30 before:z-10 before:pointer-events-none hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:w-full hover:before:h-full hover:before:bg-color-black/30 hover:before:z-10 hover:before:pointer-events-none' onClick={openCoverImageDialog}>
            <img src={coverImage || "../background/bgimg.jpg"} alt="Header" className="w-full h-full object-cover" />
            <img alt='add cover photo' className='profile-settings-gallery-add absolute top-[40%] left-[48%] transition-opacity transition-visibility duration-300 ease-in-out hover:opacity-100 hover:visible z-20' src='../icons/gallery-add.png' />
            <input
              ref={coverImageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverImageChange}
            />
          </div>
          <div className='relative bottom-12 ml-2 w-24 h-24 rounded-full z-50 flex items-center justify-center cursor-pointer before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-color-black/30 before:rounded-full before:z-10 before:pointer-events-none hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:w-full hover:before:h-full hover:before:bg-color-black/30 hover:before:z-10 hover:before:pointer-events-none transition-opacity transition-visibility duration-300 ease-in-out group-hover:opacity-100 group-hover:visible' onClick={openProfileImageDialog}>
            <img src={profileImage || "../images/safari-adventure.jpg"} alt="profile picture" className="p-1 bg-color-pink w-full h-full object-cover rounded-full" />
            <img alt='add profile photo' className='profile-settings-gallery-add absolute top-[40%] left-[39%] transition-opacity transition-visibility duration-300 ease-in-out hover:opacity-100 hover:visible z-20' src='../icons/gallery-add.png' />
            <input
              ref={profileImageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImageChange}
            />
          </div>
        </div>
        <div className='px-2'>
          <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
            <div>
              <label htmlFor="username" className='text-[14px] font-semibold'>Display Name</label>
              <FormInput
                name="username"
                type="text"
                id="username"
                placeholder={username}
                value={formInput.username}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="bio" className='text-[14px] font-semibold'>Bio</label>
              <TextareaAutosize
                name="bio"
                id="bio"
                placeholder={bio}
                value={formInput.bio}
                onChange={handleInputChange}
                className='border-2 border-color-lightGrey p-3 placeholder:text-[14px] outline-none resize-none text-[14px] text-color-grey'
              />
            </div>
            <div>
              <label htmlFor="websiteUrl" className='text-[14px] font-semibold'>Website URL</label>
              <FormInput
                name="websiteUrl"
                type="text"
                id="websiteUrl"
                placeholder="www.casecert.io"
                value={formInput.websiteUrl}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="location" className='text-[14px] font-semibold'>Location</label>
              <select
                name="location"
                className="w-full mt-3 p-1 rounded border-2 border-color-lightGrey outline-none text-color-grey text-sm"
                value={formInput.location || "Nigeria"} // Ensure default is set correctly
                onChange={handleInputChange}
              >
                <option value="" className="text-color-lightGrey text-sm">Select a location</option> {/* Placeholder */}
                {countries.map((country) => (
                  <option className="text-color-grey text-sm" key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dob" className='text-[14px] font-semibold'>D.O.B</label>
              <FormInput
                name="dob"
                type="date"
                id="dob"
                placeholder={dob}
                value={formInput.dob}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className='bg-color-pink p-2 rounded text-color-white font-semibold text-[16px]'>Save</button>
          </form>
        </div>
        {isMobile && <MobileFooterNav />}
      </div>
    </>
  );
}

export default ProfileSettings;
