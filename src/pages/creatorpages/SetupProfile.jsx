import FormInput from "../../components/FormInput";
import { useState} from "react";
import Logo from "../../components/Logo";
import { useNavigate } from "react-router-dom";

function SetupProfile() {
  const navigate = useNavigate()
  const [formInput, setFormInput] = useState({
    firstname: "",
   lastname: "",
    username: "",
    DOB: ""
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    username: "",
    DOB: ""
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


  const validateForm = () => {
    const errorsCopy = { ...errors };
    let isValid = true;

    if (!formInput.firstname) {
      errorsCopy.firstname = "Please enter your first name.";
      isValid = false;
    } else {
      errorsCopy.firstname = "";
    }

    if (!formInput.lastname) {
      errorsCopy.lastname = "Please enter your last name.";
      isValid = false;
    } else {
      errorsCopy.lastname = "";
    }

    if (!formInput.username) {
      errorsCopy.username = "Please choose a username.";
      isValid = false;
    } else {
      errorsCopy.username = "";
    }

    // Validate Date of Birth for age restriction
    if (!formInput.DOB) {
      errorsCopy.DOB = "Please enter your date of birth.";
      isValid = false;
    } else {
      const age = calculateAge(formInput.DOB);
      if (age < 18) {
        errorsCopy.DOB = "You must be at least 18 years old to continue.";
        isValid = false;
      } else {
        errorsCopy.DOB = "";
      }
    }


    setErrors(errorsCopy);
    return isValid;
  };
  const handleInputChange = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value
    });
  };



  const submitProfile = (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      localStorage.setItem("creatorSetupData", JSON.stringify(formInput));
      
      alert("Profile setup completed successfully!");
      navigate('/verify-id')
    } else {
      alert("Please fill in all the required fields.");
    }
  };
  return (
    <section className="py-8 px-6 md:py-10 md:px-10 bg-offwhite">
      <Logo />
      <div className="max-w-lg mx-auto p-6 md:p-20 md:shadow-xl">
       
         <progress value="35" max="100" className="progress-bar w-full h-4 "/>
      
        <h1 className="font-bold text-[1.7rem] text-center">Set up your profile</h1>
       
        <form action="/verify-id" onSubmit={submitProfile} method="post" className="space-y-5 pr-4 pt-4">
          <div className="flex justify-between flex-col md:flex-row md:space-x-4 ">
          <div>
            <label htmlFor="firstname" className="font-medium text-[0.8rem]">First name</label>
            <FormInput
              name="firstname"
              type="text"
              id="firstname"
              placeholder="Enter first name"
              value={formInput.firstname}
              onChange={handleInputChange}
            />
             {errors.firstname && <p className="text-color-red text-[0.7rem]">{errors.firstname}</p>}
          </div>
          <div>
            <label htmlFor="lastname" className="font-medium text-[0.8rem]">Last name</label>
            <FormInput
              name="lastname"
              type="text"
              id="lastname"
              placeholder="Enter last name"
              value={formInput.lastname}
              onChange={handleInputChange}
            />
             {errors.lastname && <p className="text-color-red text-[0.7rem]">{errors.lastname}</p>}
          </div>
          </div>
          <div>
            <label htmlFor="username" className="font-medium text-[0.8rem]">Display name</label>
            <FormInput
              name="username"
              type="text"
              id="username"
              placeholder="Choose a username"
              value={formInput.username}
              onChange={handleInputChange}
            />
             {errors.username && <p className="text-color-red text-[0.7rem]">{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="dateofbirth" className="font-medium text-[0.8rem]">First name</label>
            <FormInput
              name="DOB"
              type="date"
              id="dateofbirth"
              
              value={formInput.DOB}
              onChange={handleInputChange}
            />
             {errors.DOB && <p className="text-color-red text-[0.7rem]">{errors.DOB}</p>}
          </div>
          <div className="flex justify-between">
            <div className="flex cursor-pointer space-x-2 items-center" onClick={() => window.history.back()}>
              <img src="../src/assets/icons/back.png" alt="Go back" className="w-4 h-4" />
              <p className="font-medium text-[0.8rem]">Back</p>
            </div>
            <button type="submit" className="bg-color-pink text-color-white rounded-lg text-[0.8rem] px-4 py-2 font-medium">
              Continue
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SetupProfile;
