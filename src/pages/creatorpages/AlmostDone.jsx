
import { useState, useEffect, useRef } from "react";
import Logo from "../../components/Logo";
import DragAndDrop from "../../components/DragAndDrop";
import { useNavigate } from "react-router-dom";
function AlmostDone() {
  const navigate = useNavigate()
  const [formInput, setFormInput] = useState({
  
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
  // useEffect(() => {
  //   const storedImageDataUrl = localStorage.getItem("creatorprofileimg");
  //   if (storedImageDataUrl) {
  //     setImageDataUrl(storedImageDataUrl);
  //   }
  // }, []);
  const [errors, setErrors] = useState({
    picture: "",
    message: ""
  });

  const validateForm = () => {
    const errorsCopy = { ...errors };
    let isValid = true;

    if (!formInput.picture) {
      errorsCopy.picture = alert("Please upload a profile picture.");
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

  const submitProfile = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      localStorage.setItem("creatorprofileData", JSON.stringify(formInput));
      alert("Account created successfully!");
      navigate('/home')
     
    } 
  };

  return (
    <section className="py-8 px-6 md:py-10 md:px-10 bg-offwhite">
      <Logo />
      <div className="max-w-lg mx-auto p-6 md:p-20 md:shadow-xl">
      <progress value="95" max="100" className="progress-bar w-full h-4"></progress>
        <h1 className="font-bold text-[1.7rem] ">Almost done!</h1>
        <div className="flex flex-col justify-center items-center pt-4 space-y-2">
          
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
            {errors.picture && <p className="text-red-500">{errors.picture}</p>}
       
            {imageDataUrl  && <img src={imageDataUrl} alt="Uploaded document" className="w-full h-40" />}
            <label htmlFor="picture" className="font-medium text-[0.8rem]">Upload a profile picture</label>
          </div>
         
        </div>
        <form action="/home" onSubmit={submitProfile} method="post" className="space-y-5 pr-4 pt-4">
          
          <div>
            <label htmlFor="message" className="font-medium text-[0.8rem] ">Add a bio</label>
            <textarea
            name="message"
              id="message"
              value={formInput.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows='4'
              className="text-color-black placeholder:text-color-lightGrey border-2 border-color-lightGrey placeholder:text-[0.8rem] w-[100%] outline-none rounded-xl px-4 py-2"
            />
              {errors.message && <p className="text-color-red text-[0.7rem]">{errors.message}</p>}
          </div>
          <div className="flex justify-between">
            <div className="flex cursor-pointer space-x-2 items-center" onClick={() => window.history.back()}>
              <img src="../src/assets/icons/back.png" alt="Go back" className="w-4 h-4" />
              <p className="font-medium text-[0.8rem]">Back</p>
            </div>
            <button type="submit" className="bg-color-pink text-color-white  rounded-lg text-[0.8rem] px-4 py-2 font-medium">
             Let's Go
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AlmostDone;
