
import Logo from "../components/Logo"
import FormInput from "../components/FormInput"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import DbHelper from '../utils/DbHelper'
// check if the user has a profile
// send the form data to a database
 {/* check if username is available */}
function Signup() {
  const navigate = useNavigate();
  const dbHelper = new DbHelper()
  const [termsChecked, setTermsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };
 
  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (name, value) => {
    setFormInput(prev => ({ ...prev, [name]: value }));
    validateInput(name, value);
  }
  const validateInput = (name, value) => {
    let errorMsg = '';
    if (name === "email") {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        errorMsg = "Invalid email address";
      }
    } else if (name === "password" && value.length < 6) {
      errorMsg = "Password must be at least 6 characters long";
    } else if (name === "confirmPassword" && value !== formInput.password) {
      errorMsg = "Passwords do not match";
    }
    setFormErrors(prev => ({ ...prev, [name]: errorMsg }));
  };
   // signup type toggle
   const [signUpType, setSignUpType] = useState('fan')

   const handleSignupFan = () => setSignUpType('fan')
 
   const handleSignupCreator = () => setSignUpType('creator')
   
  const handleSubmit = (e) => {
    e.preventDefault();
     


    let errors = {};

    if (!formInput.email) {
      errors.email = 'Email is required';
    }
    if (!formInput.username) {
      errors.username = 'Username is required';
    }
    if (!formInput.password) {
      errors.password = 'Password is required';
    }
    if (formInput.confirmPassword !== formInput.password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Update form errors
    setFormErrors(errors);
 // Check if the checkbox is checked  
 if (!termsChecked) {
  alert("Please accept the terms and conditions to create an account.");
  return;
}
 // If there are no errors, submit the form
 if (Object.keys(errors).length === 0) {
  console.log('Form submitted:', formInput);
  
  // Set user type based on signup type
  localStorage.setItem("userType", JSON.stringify(signUpType));
   // Store form data in local storage based on signup type
   if (signUpType === 'fan') {
    dbHelper.updateUser('userData', formInput)
    localStorage.setItem('fanProfileData', JSON.stringify(formInput));
  } else if (signUpType === 'creator') {
    localStorage.setItem('creatorProfileData', JSON.stringify(formInput));
  }
 // Redirect to different profile setup pages based on signup type
if (signUpType === 'fan') {
  navigate('/profile-setup');
} else if (signUpType === 'creator') {
  navigate('/setup-profile');
}
  
}

};
   
  // password visibility toggle

  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => {
    setShowPassword((prev) => !prev)
  }

 
  

  return (
    <section className="w-full h-[105vh] flex ">

      <div className="hidden md:flex md:w-[50%] signup py-8 px-4 relative" >

        <div className="absolute inset-0 bg-color-black opacity-60"></div>
        <Logo color="text-color-white" className="fixed" />
        <div className="flex flex-col justify-center items-center h-[80%] fixed pl-10 lg:pl-[10%]">

          <h1 className="text-color-white font-bold text-[4rem] text-center">Just<span className="text-color-pink">fans</span>.ng</h1>
          <p className="text-[1rem] text-color-white">Join and support your favorite creators today.</p>
        </div>
      </div>
      <div className="px-6 pt-6 md:px-20 md:pt-0 w-full md:w-[50%]">
        <Logo className="text-[1.5rem] md:hidden" />
        <div className="w-full py-8 md:py-13  items-center justify-center md:flex-col md:flex md:text-left ">

          <div className="w-full space-y-2 md:w-[80%] ">
            <h3 className="text-color-black text-[1.5rem] font-bold">Create <span className="text-color-pink">Your Account</span></h3>
            <p className="text-[0.8rem] text-color-grey font-semibold">Already have an account?
              <span> <Link to="/login" className="text-color-pink ">Log In</Link></span>
            </p>

            <div className=" flex pt-4" >
              <button className={`${signUpType === 'fan' ? 'bg-color-pink text-color-white ' : 'bg-color-lightGrey text-color-grey'} flex px-8 py-2 rounded justify-center items-center space-x-2`}
                onClick={handleSignupFan}
              >
                <img className="w-4 h-4" src="../src/assets/icons/people.png" alt="fan profile" />
                <p className="text-[0.8rem]">
                  fan
                </p>
              </button>
              <button className={`${signUpType === 'creator' ? 'bg-color-pink  text-color-white' : 'bg-color-lightGrey text-color-grey'} flex px-8 py-2 rounded justify-center items-center space-x-2`}
                onClick={handleSignupCreator}>
                <img className="w-4 h-4" src="../src/assets/icons/profile-white.png" alt="fan profile" />
                <p className="text-[0.8rem]">
                  Creator
                </p>
              </button>


            </div>

       

            <form action="/fanprofilesetup" onSubmit={handleSubmit} method="post" className="space-y-4 pr-4 pt-4" >
              {/* check if username is available */}
              <FormInput name="username" type="text" placeholder="Enter Username"
                value={formInput.username}
                onChange={handleInputChange}
                error={formErrors.username}
              />
              <FormInput name="email" type="text" placeholder="Email address or phone number"
                value={formInput.email}
                onChange={handleInputChange}
                error={formErrors.email}
              />

              <div className="relative"> <FormInput
                name="password"
                type={showPassword ?
                  'text' : 'password'
                }
                placeholder=" Password"
                value={formInput.password}
                onChange={handleInputChange}
                error={formErrors.password}
              />


                <button type="button" onClick={togglePassword} className="absolute inset-y-0 right-0  flex items-center px-2">
                  {showPassword ? <img className="h-4 w-4" src="../src/assets/icons/openPass.png" alt="show-password"

                  /> : <img className="h-3 w-3" src="../src/assets/icons/closePass.png" alt="close-password"

                  />}
                </button>

              </div>
              <FormInput name="confirmPassword"
                type={showPassword ? 'text' : 'password'} placeholder="Confirm Password"
                value={formInput.confirmPassword}
                onChange={handleInputChange}
                error={formErrors.confirmPassword}
              />






              {/* handle this */}
              <div className="flex space-x-2">
                <input type="checkbox" name="checkbox" id="termsCheckbox" className="rounded-full checkbox-input"
                  checked={termsChecked}
                  onChange={handleCheckboxChange} />
                <label htmlFor="termsCheckbox" className="text-[0.7rem] w-[70%] md:w-full">
                  By clicking on Create Free Account, I acknowledge that I am 18+ years old and I accept the <a href="" className="text-color-pink"> Terms & Conditions</a>
                </label>
              </div>

              <div >
                <button type="submit" className="bg-color-pink w-full rounded-full py-2 text-color-white font-semibold text-[0.8rem] hover:bg-color-pink/80">Create Account</button>
                <div className="flex  items-center justify-center pt-4 space-x-4">
                  <span className="w-[40%] bg-color-grey h-[0.5px]"></span>
                  <p className="text-color-grey">or</p>
                  <span className="w-[40%] bg-color-grey h-[0.5px]"></span>
                </div>
                {/* add the sign in with google API */}
                <button className="bg-color-blue w-full mt-4 py-2 rounded-full flex items-center justify-center text-color-white hover:bg-color-blue/80 font-semibold text-[0.8rem]">
                  <img src="../src/assets/icons/google.png" alt="" className=" w-4 h-4 mr-2 rounded-full " />
                  Sign in with Google
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>

    </section>
  )
}

export default Signup