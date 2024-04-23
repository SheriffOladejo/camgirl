import FormInput from "../../components/FormInput";
import { useState, useEffect } from "react";
import Logo from "../../components/Logo";

function ProfileSetup() {
  const [formInput, setFormInput] = useState({
    username: "",
    message: "",
    picture: null
  });

  const [imageDataUrl, setImageDataUrl] = useState("");

  const handleInputChange = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value
    });
  };

  const handlePictureChange = (event) => {
    const pictureFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setImageDataUrl(dataUrl);
      localStorage.setItem("profileImageDataUrl", dataUrl);
    };

    reader.readAsDataURL(pictureFile); // Convert the uploaded image to a data URL
  };

  useEffect(() => {
    const storedImageDataUrl = localStorage.getItem("profileImageDataUrl");
    if (storedImageDataUrl) {
      setImageDataUrl(storedImageDataUrl);
    }
  }, []);

  const submitProfile = () => {
    localStorage.setItem('profileData', JSON.stringify(formInput));
    alert('Profile picture uploaded successfully!');
  };

  return (
    <section className="py-8 px-6 md:py-10 md:px-10 bg-offwhite">
      <Logo />
      <div className="max-w-lg mx-auto p-6 md:p-20 md:shadow-xl">
        <h1 className="font-bold text-[1.7rem] text-center">Set up your profile</h1>
        <div className="flex flex-col justify-center items-center pt-4 space-y-2">
          <div className="relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className="bg-color-2 rounded-full w-20 h-20 z-20 relative opacity-0 cursor-pointer"
            />
            <img src="../src/assets/icons/addImg.png" alt="upload image" className="w-16 h-16 absolute top-2 left-0" />
            <img src={imageDataUrl} alt="upload" className="w-16 h-16 absolute top-2 left-0 opacity-0" />
          </div>
          <p className="text-[0.8rem] font-medium">Upload a profile picture</p>
        </div>
        <form action="#" onSubmit={submitProfile} method="post" className="space-y-5 pr-4 pt-4">
          <div>
            <label htmlFor="username" className="font-medium text-[0.8rem]">Display name</label>
            <FormInput
              name="username"
              type="text"
              id="username"
              placeholder="Choose a Username"
              value={formInput.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="message" className="font-medium text-[0.8rem] ">Add a bio</label>
            <textarea
              id="message"
              value={formInput.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows='4'
              className="text-color-black placeholder:text-color-lightGrey border-2 border-color-lightGrey placeholder:text-[0.8rem] w-[100%] outline-none rounded px-4 py-2"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex cursor-pointer space-x-2 items-center" onClick={() => window.history.back()}>
              <img src="../src/assets/icons/back.png" alt="Go back" className="w-4 h-4" />
              <p className="font-medium text-[0.8rem]">Back</p>
            </div>
            <button type="submit" className="bg-color-pink text-color-white  rounded-lg text-[0.8rem] px-4 py-2 font-medium">
              Continue
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProfileSetup;
