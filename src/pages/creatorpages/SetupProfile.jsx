import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormInput from "../../components/FormInput";
import Logo from "../../components/Logo";
import DbHelper from "../../utils/DbHelper";

import { ToastContainer, toast } from "react-toastify";
import AppUser from "../../models/AppUser";
import { AuthContext } from "../../context/authContext";

function SetupProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const dbHelper = new DbHelper();
  const { updateCurrentUser } = useContext(AuthContext);

  const user = location.state?.user || {};
  const [stage, setStage] = useState(1);
  const [countries, setCountries] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef();
  const profilePictureInputRef = useRef();

  const [formInput, setFormInput] = useState({
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    dob: user.dob || "",
    country: user.country || "",
    document: null,
    message: user.bio || "",
    profilePicture: user.profile_picture || null,
  });


  const calculateAge = (dob) => {
    const birthday = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const countryNames = data.map((country) => country.name.common);
      setCountries(countryNames);
    };
    fetchCountries();

    // Clear local storage and state on component mount
    localStorage.removeItem("ID");
    setFormInput((prev) => ({
      ...prev,
      document: null,
      profilePicture: null,
    }));
  }, []);

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const openProfilePictureDialog = () => {
    profilePictureInputRef.current.click();
  };

  const handleFileDrop = (files) => {
    const file = files[0];
    file && updateDocumentInState(file);
  };

  const handleProfilePictureDrop = (files) => {
    const file = files[0];
    file && updateProfilePictureInState(file);
  };

  const updateDocumentInState = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setFormInput((prev) => ({
        ...prev,
        document: dataUrl,
      }));
      localStorage.setItem("ID", dataUrl);
      fileInputRef.current.value = null; // Clear file input value
    };
    reader.readAsDataURL(file);
  };

  const updateProfilePictureInState = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setFormInput((prev) => ({
        ...prev,
        profilePicture: dataUrl,
      }));
      profilePictureInputRef.current.value = null; // Clear file input value
    };
    reader.readAsDataURL(file);
  };

  const handleDocumentChange = (event) => {
    const file = event.target.files[0];
    updateDocumentInState(file);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    updateProfilePictureInState(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleContinue = async () => {
    console.log("Current stage:", stage);
    if (stage === 1) {
      const selectedDate = formInput.dob;

      if (!selectedDate) {
        toast.error("DOB is required");
        return;
      }

      const dobDate = new Date(selectedDate);
      if (isNaN(dobDate.getTime())) {
        toast.error("Invalid DOB format");
        return;
      }

      const age = calculateAge(dobDate);

      if (!formInput.firstname) {
        toast.error("Firstname is required");
        return;
      }

      if (!formInput.lastname) {
        toast.error("Lastname is required");
        return;
      }

      if (age < 18) {
        toast.error("Minimum creator age is 18");
        return;
      }

      setStage(stage + 1);
    } else if (stage === 2) {
      if (!formInput.country) {
        toast.error("Country is required");
        return;
      }

      if (!formInput.document) {
        toast.error("Document is required");
        return;
      }

      setStage(stage + 1);
    } else if (stage === 3) {
      if (!formInput.message) {
        toast.error("Bio is required");
        return;
      }

      if (!formInput.profilePicture) {
        toast.error("Profile picture is required");
        return;
      }

      console.log("Submitting profile...");
      await submitProfile();
    }
  };

  const handleBackClick = () => {
    if (stage > 1) {
      if (stage === 2) {
        setFormInput((prev) => ({
          ...prev,
          document: null,
        }));
        localStorage.removeItem("ID");
        fileInputRef.current.value = null; // Clear file input value
      }
      setStage(stage - 1);
    } else {
      navigate("/signup");
    }
  };

  const handleRemoveDocument = () => {
    setFormInput((prev) => ({
      ...prev,
      document: null,
    }));
    localStorage.removeItem("ID");
    fileInputRef.current.value = null; // Clear file input value

  };

  const handleRemoveProfilePicture = () => {
    setFormInput((prev) => ({
      ...prev,
      profilePicture: null,
    }));
    profilePictureInputRef.current.value = null; // Clear file input value
  };

  const submitProfile = async () => {
    console.log("Submitting profile with data:", formInput);
    console.log("User state before update:", user);

    const data = {
      firstname: formInput.firstname,
      lastname: formInput.lastname,
      dob: formInput.dob,
      bio: formInput.message,
      profile_picture: formInput.profilePicture,
      document: formInput.document,
      country: formInput.country,
    };
    console.log("Input form data:", data);
    const user2 = new AppUser(
      null, user.user_id, user.username, user.email, null, user.password,
      data.firstname, data.lastname, data.dob, data.country, null, data.document,
      null, data.bio, user.date_joined, null, data.profile_picture, null, null,
      null, null, null, null, user.creator_mode, null, null, null, user.account_type, null
    );
    await updateCurrentUser(user2)


    console.log("Updated user data:", user2);

    try {
      const result = await dbHelper.updateUser(user2);
      console.log("Update result:", result);
      navigate("/home");
    } catch (error) {
      toast.error("Error updating user:", error);
    }
  };


  return (
    <section className="py-8 px-6 md:py-10 md:px-10 bg-offwhite">
      <Logo />
      <div className="max-w-lg mx-auto p-6 md:p-20 md:shadow-xl">
        <progress value={stage * 33} max="100" className="progress-bar w-full h-4" />

        {stage === 1 && (
          <div>
            <h1 className="font-bold text-[1.7rem] text-center">Set up your profile</h1>
            <form className="space-y-5 pr-4 pt-4">
              <div className="flex justify-between flex-col md:flex-row md:space-x-4">
                <div>
                  <label htmlFor="firstname" className="font-semibold">First name</label>
                  <FormInput type="text" name="firstname" placeholder="Your first name" value={formInput.firstname} onChange={handleInputChange} />
                </div>
                <div>
                  <label htmlFor="lastname" className="font-semibold">Last name</label>
                  <FormInput type="text" name="lastname" placeholder="Your last name" value={formInput.lastname} onChange={handleInputChange} />
                </div>
              </div>
              <div>
                <label htmlFor="dob" className="font-semibold">Date of birth</label>
                <FormInput type="date" name="dob" placeholder="MM/DD/YYYY" value={formInput.dob} onChange={handleInputChange} />
              </div>
            </form>
          </div>
        )}

        {stage === 2 && (
          <div className="space-y-5 pr-4 pt-4">
            <h1 className="font-bold text-[1.7rem]">Verify your identity</h1>
            <div>
              <label htmlFor="country" className="font-semibold text-sm">Country of Residence</label>
              <select name="country" className="w-full mt-3 p-1 rounded border-2 border-color-lightGrey outline-none text-color-grey text-sm bg-color-grey/10" value={formInput.country} onChange={handleInputChange}>
                <option value="" className="text-color-lightGrey text-sm">Nigeria</option>
                {countries.map((country) => (
                  <option className="text-color-grey text-sm" key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="font-semibold text-sm">Provide verification document</p>
              <div className={`bg-color-3/30 border border-dashed border-color-pink mt-2 ${isDragOver ? 'bg-color-white' : ''}`} onDragOver={handleDragOver} onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                handleFileDrop(e.dataTransfer.files);
              }} onDragLeave={() => setIsDragOver(false)}>
                <div className="relative">
                  {formInput.document ? (
                    <div className="relative">
                      <img src={formInput.document} alt="Uploaded document" className="w-full h-full" />
                      <button type="button" className="absolute top-0 right-0 m-2 bg-color-grey rounded-full p-2" onClick={handleRemoveDocument}>
                        <img src="/icons/close.png" alt="Remove document" className="w-2 h-2  " />
                      </button>
                    </div>
                  ) : (
                    <div className="py-6 flex flex-col justify-center items-center">
                      <img src="/icons/export.png" alt="upload" className="w-8 h-8 mb-4" />
                      <p className="flex font-bold text-color-black text-center text-md">Drag and drop file here or <span className="text-color-pink ml-1 cursor-pointer" onClick={openFileDialog}>Browse</span></p>
                      <p className="text-[12px] text-center w-full">Supported formats JPEG, PNG, PDF, WORD</p>
                    </div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" name="document" className="hidden" accept="image/*" onChange={handleDocumentChange} />
              </div>
            </div>
          </div>
        )}

        {stage === 3 && (
          <div className="space-y-5 pr-4 pt-2">
            <h1 className="font-bold text-[1.7rem] ">Almost done!</h1>
            <div className="space-y-3 flx flex-col justify-center items-center">

              <div className={`dropzone ${isDragOver ? 'drag-over' : ''}`} onDragOver={handleDragOver} onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                handleProfilePictureDrop(e.dataTransfer.files);
              }} onDragLeave={() => setIsDragOver(false)}>
                <div className="relative">
                  {formInput.profilePicture ? (
                    <div className="relative w-40 h-40 mx-auto">
                      <img src={formInput.profilePicture} alt="Uploaded profile picture" className="w-full h-full object-cover" />
                      <button type="button" className="absolute top-0 right-0 m-2 bg-color-grey rounded-full p-2" onClick={handleRemoveProfilePicture}>
                        <img src="/icons/close.png" alt="Remove document" className="w-2 h-2  " />
                      </button>
                    </div>
                  ) : (
                    <div className="w-full mx-auto text-cente cursor-pointer">
                      <div className="p-3 bg-color-3/20 rounded-full w-14 mx-auto">
                        <img onClick={openProfilePictureDialog} src="/icons/addImg.png" alt="upload" className="w-7 h-7 mx-auto" />
                      </div>
                      <label htmlFor="picture" className="font-medium text-[0.8rem] block mx-auto text-center">Upload a profile picture</label>
                    </div>


                  )}
                </div>
                <input ref={profilePictureInputRef} type="file" name="profilePicture" className="hidden" accept="image/*" onChange={handleProfilePictureChange} />
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="message" className="font-semibold text-sm">Add a bio</label>
              <textarea name="message" value={formInput.message} onChange={handleInputChange} className="w-full  p-3 border border-color-lightGrey bg-color-lighterGrey text-sm text-color-grey outline-none" rows="4"></textarea>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {stage >= 1 && (
            <div className="flex items-center space-x-2" onClick={handleBackClick}>
              <img src="/icons/back.png" alt="go back" className="w-3 h-3" />
              <button type="button" className="border-none rounded-md text-sm">
                Back
              </button>
            </div>
          )}
          <button type="button" className="text-sm py-1 px-2 border rounded-md bg-color-pink text-color-white" onClick={handleContinue}>
            {stage === 3 ? "Submit" : "Continue"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default SetupProfile;
