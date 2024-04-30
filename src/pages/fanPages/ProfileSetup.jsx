import FormInput from "../../components/FormInput";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import DragAndDrop from "../../components/DragAndDrop";
function ProfileSetup() {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    username: "",
    message: "",
    picture: null
  });

  const [imageDataUrl, setImageDataUrl] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    message: "",
    picture: ''
  });


  const handleInputChange = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value
    });
  };
  const fileInputRef = useRef();

  const openFileDialog = () => {
    fileInputRef.current.click();
  };
  const handleFileDrop = (files) => {
    // Handle dropped files
    const file = files[0];  // Assuming only one file is dropped
   file && updateImageInState(file);
  };
  const updateImageInState = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setImageDataUrl(dataUrl);
      setFormInput(prev => ({
        ...prev,
        picture: dataUrl
      }));
      localStorage.setItem("creatorprofileimg", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    updateImageInState(file);
  };
  useEffect(() => {
    const storedImageDataUrl = localStorage.getItem("fanprofileImage");
    if (storedImageDataUrl) {
      setImageDataUrl(storedImageDataUrl);
    }
  }, []);
  const validateForm = () => {
    const errorsCopy = { ...errors };
    let isValid = true;

    if (!formInput.username) {
      errorsCopy.username = "Please choose a username.";
      isValid = false;
    } else {
      errorsCopy.username = "";
    }

    
    if (!formInput.picture) {
      errorsCopy.picture = alert("Add an image.");
      isValid = false;
    } else {
      errorsCopy.picture = "";
    }
    if (!formInput.message) {
      errorsCopy.message = "Please add a bio.";
      isValid = false;
    } else {
      errorsCopy.message = "";
    }

    setErrors(errorsCopy);
    return isValid;
  };

  const submitProfile = (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      localStorage.setItem("fanprofileData", JSON.stringify(formInput));
      navigate("/fanhome")
    } else {
      alert("Please fill in all the required fields.");
    }
  };

  

  return (
    <section className="py-8 px-6 md:py-10 md:px-10 bg-offwhite">
      <Logo />
      <div className="max-w-lg mx-auto p-6 md:p-20 md:shadow-xl">
        <h1 className="font-bold text-[1.7rem] text-center">Set up your profile</h1>
        <div className="flex flex-col justify-center items-center">
           
           {/* hide when a file is in */}
           <DragAndDrop
            onFileDrop={handleFileDrop} onChange={handlePictureChange} className={`flex justify-center items-center cursor-pointer bg-color-2 rounded-full w-14 h-14   ${imageDataUrl ? 'hidden' : 'flex'}`} >
               <input
                 ref={fileInputRef}
                 type="file"
                 style={{ display: 'none' }}
                 onChange={handlePictureChange}
               />
             <img onClick={openFileDialog} src="../src/assets/icons/addImg.png" alt="upload" className="w-7 h-7 " />
            
            
           </DragAndDrop>
           {imageDataUrl  && <img src={imageDataUrl} alt="Uploaded document" className="w-40 h-20" />}
           <label htmlFor="picture" className="font-medium text-[0.8rem]">Upload a profile picture</label>
         </div>
        <form action="/fanhome" onSubmit={submitProfile} method="post" className="space-y-5 pr-4 pt-4">
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
              {errors.username && <p className="text-color-red text-[0.7rem]">{errors.username}</p>}
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
            {errors.message && <p className="text-color-red text-[0.7rem]">{errors.message}</p>}

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
