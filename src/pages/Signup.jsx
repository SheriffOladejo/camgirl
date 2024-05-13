
import Logo from "../components/Logo"
import FormInput from "../components/FormInput"
import AppUser from "../models/AppUser";
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import DbHelper from '../utils/DbHelper'
import LoadingSpinner from "../components/LoadingSpinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDataIntoCache } from "../utils/Utils";
// check if the user has a profile
// send the form data to a database
{/* check if username is available */ }
function Signup() {
  const navigate = useNavigate();
  const dbHelper = new DbHelper()

  const [termsChecked, setTermsChecked] = useState(false);
  const [lastUserId, setLastUserId] = useState(0);
  // signup type toggle
  const [creatorMode, setCreatorMode] = useState('fan')
  const [usernameAvailable, setUsernameAvailable] = useState(true); // State to track username availability
  const [loading, setLoading] = useState(false)

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };
  useEffect(() => {
    // Fetch the last assigned userId from the database or any other persistent storage

    // For demonstration purposes, initializing with 0
    // Replace this with your actual logic to fetch the last assigned userId
    setLastUserId(0);
  }, []);

  const [formInput, setFormInput] = useState({
    username: "nafisa",
    email: "nens@gmail.com",
    password: "faruna",
    confirmPassword: "faruna",
    creatorMode,
    user_Id: 0 // Initialize with a default value
  });


  const handleInputChange = (name, value) => {
    setFormInput(prev => ({ ...prev, [name]: value }));
    validateInput(name, value);
  }
  const validateInput = (name, value) => {

    if (name === "email") {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        toast.error("Invalid email address");
      }
    } else if (name === "password" && value.length < 6) {
      toast.error("Password must be at least 6 characters long");
    } else if (name === "confirmPassword" && value !== formInput.password) {
      toast.error("Passwords do not match");
    }

  };


  const handleSignupFan = () => {

    setCreatorMode('fan')
  }

  const handleSignupCreator = () => {
    setCreatorMode('creator')
    setCreatorMode('creator')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)



    if (!formInput.email || !formInput.username || !formInput.password || formInput.confirmPassword !== formInput.password) {
      toast.error('Please fill out all required fields correctly');
      setLoading(false);
      return;
    }
    if (formInput.confirmPassword !== formInput.password) {
      toast.error('Passwords do not match');
    }

    // Check if the checkbox is checked  
    if (!termsChecked) {
      toast.error("Please accept the terms and conditions to create an account.");
      return;
    }

    try {
      // Check if the username is available
      const usernameResponse = await dbHelper.checkForUsername(formInput.username);
      const emailResponse = await dbHelper.checkForEmail(formInput.email);
      if (usernameResponse?.data?.length > 0) {
        toast.error("This username is already taken");

        setLoading(false);
        return
      }
      if (emailResponse?.data?.length > 0) {
        toast.error("This email is already registered");
        setLoading(false);
        return

      }

      const account_type = "manual";
      const user_Id = lastUserId + 1;
      const data = {
        username: formInput.username,
        email: formInput.email,
        password: formInput.password,
        creator_mode: creatorMode,
        user_id: user_Id,
        date_joined: Date.now(),
        account_type: account_type,
        id: null, phone_number: null, firstname: null, lastname: null,
        dob: null, country: null, location: null, verification_doc: null, docs_verified: null, bio: null, date_joined: null,
        last_updated: null, profile_picture: null, cover_picture: null, subscribers: null, connections: null,
        subscription_price: null, currency_symbol: null, currency: null, verified: null,
        live_mode: null, profile_setup: null, account_type: null, creator_mode_desc_dismissed: null
      };


      console.log(data)
      const user = new AppUser(
        data.id, data.user_id, data.username, data.email, data.phone_number, data.password, data.account_typefirstname, data.lastname,
        data.dob, data.country, data.location, data.verification_doc, data.docs_verified, data.bio, data.date_joined,
        data.last_updated, data.profile_picture, data.cover_picture, data.subscribers, data.connections,
        data.subscription_price, data.currency_symbol, data.currency, data.creator_mode, data.verified,
        data.live_mode, data.profile_setup, data.account_type, data.creator_mode_desc_dismissed

      )
      
      try {
        const result = await dbHelper.updateUser(user);
        console.log("Update result:", result);
      } catch (error) {
        console.error("Error updating user:", error);
      }
      // Construct the data object for navigation state
      navigate(creatorMode === 'fan' ? '/profile-setup' : '/setup-profile', { state: data });
    } catch (error) {
      toast.error("An error occurred while signing up.");
      console.log(error);
    } finally {
      setLoading(false);
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
      <div className="px-6 pt-6  lg:px-20 md:pt-0 w-full md:w-[50%]">
        {loading === true && <LoadingSpinner />}
        <Logo className="text-[1.5rem] md:hidden" />
        <div className="w-full py-8 md:py-13  items-center justify-center md:flex-col md:flex md:text-left ">

          <div className="w-full space-y-2 md:w-[80%] ">
            <h3 className="text-color-black text-[1.5rem] font-bold">Create <span className="text-color-pink">Your Account</span></h3>
            <p className="text-[0.8rem] text-color-grey font-semibold">Already have an account?
              <span> <Link to="/login" className="text-color-pink ">Log In</Link></span>
            </p>

            <div className=" flex pt-4" >
              <button className={`${creatorMode === 'fan' ? 'bg-color-pink text-color-white ' : 'bg-color-lightGrey text-color-grey'} flex px-8 py-2 rounded justify-center items-center space-x-2`}
                onClick={handleSignupFan}
              >
                <img className="w-4 h-4" src="../src/assets/icons/people.png" alt="fan profile" />
                <p className="text-[0.8rem]">
                  fan
                </p>
              </button>
              <button className={`${creatorMode === 'creator' ? 'bg-color-pink  text-color-white' : 'bg-color-lightGrey text-color-grey'} flex px-8 py-2 rounded justify-center items-center space-x-2`}
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

              />
              <FormInput name="email" type="text" placeholder="Email address or phone number"
                value={formInput.email}
                onChange={handleInputChange}

              />

              <div className="relative"> <FormInput
                name="password"
                type={showPassword ?
                  'text' : 'password'
                }
                placeholder=" Password"
                value={formInput.password}
                onChange={handleInputChange}

              />


                <button type="button" onClick={togglePassword} className="absolute inset-y-0 right-0  flex items-center px-2">
                  {showPassword ? <img className="h-4 w-4" src="../src/assets/icons/password.png" alt="show-password"

                  /> : <img className="h-3 w-3" src="../src/assets/icons/closePass.png" alt="close-password"

                  />}
                </button>

              </div>
              <FormInput name="confirmPassword"
                type={showPassword ? 'text' : 'password'} placeholder="Confirm Password"
                value={formInput.confirmPassword}
                onChange={handleInputChange}

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
          <ToastContainer />
        </div>
      </div>

    </section>
  )
}

export default Signup