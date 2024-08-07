import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../components/Logo";
import FormInput from "../components/FormInput";
import LoadingSpinner from "../components/LoadingSpinner";
import AppUser from "../models/AppUser";
import DbHelper from '../utils/DbHelper';
import { GOOGLE_CLIENT_ID } from "../utils/Constants";
import { v4 as uuidv4 } from 'uuid'; 

function Signup() {
  const navigate = useNavigate();
  const dbHelper = new DbHelper();

  const [termsChecked, setTermsChecked] = useState(false);
  // const [lastUserId, setLastUserId] = useState(0);
  const [creatorMode, setCreatorMode] = useState('fan');
  const [user, setUser] = useState(null); // Changed to null as initial state
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [profile, setProfile] = useState([]);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleSignIn, setGoogleSignIn] = useState(false);

  // useEffect(() => {
  //   setLastUserId(0);
  //   // Fetch from database in a real scenario
  // }, []);

  useEffect(() => {
    createAccountGoogle();
  }, [isGoogleSignIn]);

  const createAccountGoogle = async () => {
    if (isGoogleSignIn && user) {
      const account_type = "google";
      const uint8Array = new TextEncoder().encode(user.profileObj.email);
      const email_hash = await sha256(uint8Array);

      const data = {
        "firstname": firstname,
        "lastname": lastname,
        "email": user.profileObj.email,
        "password": "",
        "creator_mode": creatorMode,
        "user_id": uuidv4(),
        "date_joined": Date.now(),
        "account_type": account_type,
        "username": ""
      };

      try {
        const response = dbHelper.updateUser(data)
        // const response = await axios.post(`${BASE_API_URL}/signup`, data);
        if (creatorMode === "fan") {
          navigate('/main-page');
        } else {
          navigate('/profile-setup', {
            state: {
              firstname,
              lastname,
              email: user.profileObj.email,
              email_hash,
              account_type,
            }
          });
        }
      } catch (error) {
        setLoading(false);
        toast.error('Request failed: ' + error.message);
        console.error('Request failed:', error);
      }
    }
    setGoogleSignIn(false);
  };

  const googleButtonClicked = (renderProps) => {
    if (!termsChecked) {
      toast.error("Read and accept Terms of Service");
    } else {
      setLoading(true);
      renderProps.onClick();
    }
  };

  const onGoogleSuccess = async (res) => {
    const mail = res.profileObj.email;
    const firstname = res.profileObj.givenName;
    const lastname = res.profileObj.familyName;
    setFirstname(firstname);
    setLastname(lastname);

    if (mail !== "") {
      try {
        const emailResponse = await dbHelper.checkForEmail(mail);
        if (emailResponse.data.length > 0) {
          setLoading(false);
          setFirstname("");
          setLastname("");
          toast.error("This email is already registered");
        } else {
          setUser(res); // Setting user state after successful login
          setGoogleSignIn(true);
        }
      } catch (error) {
        setLoading(false);
        toast.error("An error occurred while checking email.");
        console.error('Email check failed:', error);
      }
    } else {
      setLoading(false);
      toast.error("An error occurred");
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      setRefreshToken(codeResponse.refresh_token);
    },
    onError: (error) => console.error('Login Failed:', error),
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    accessType: 'offline'
  });

  useEffect(() => {
    const fetchUserProfile = async (accessToken) => {
      try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json'
          }
        });
        setProfile(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('Access token expired. Refreshing token...');
          refreshAccessToken();
        } else {
          console.error('Error fetching user data:', error);
        }
      }
    };

    if (user) {
      fetchUserProfile(user.accessToken); // Assuming user object has accessToken
    }
  }, [user]);

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: GOOGLE_CLIENT_ID,
        client_secret: 'YOUR_CLIENT_SECRET', // Replace with your client secret
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      });
      setUser((prevUser) => ({
        ...prevUser,
        accessToken: response.data.access_token
      }));
      console.log('Access token refreshed.');
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  };

  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    creator_mode: null, 

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    if (name === "email" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      toast.error("Invalid email address");
    } else if (name === "password" && value.length < 6) {
      toast.error("Password must be at least 6 characters long");
    } else if (name === "confirmPassword" && value !== formInput.password) {
      toast.error("Passwords do not match");
    }
  };

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };

  const handleSignupFan = () => {
    setCreatorMode('fan');
    setFormInput((prev) => ({ ...prev, creator_mode: 'fan' }));
  };

  const handleSignupCreator = () => {
    setCreatorMode('creator');
    setFormInput((prev) => ({ ...prev, creator_mode: 'creator' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formInput.email || !formInput.username || !formInput.password || formInput.confirmPassword !== formInput.password) {
        toast.error('Please fill out all required fields correctly');
        setLoading(false);
        return;
    }

    if (!termsChecked) {
        toast.error("Please accept the terms and conditions to create an account.");
        setLoading(false);
        return;
    }

    try {
        console.log('Checking username availability...');
        const isUsernameTaken = await dbHelper.checkForUsername(formInput.username);
        console.log('Username availability:', isUsernameTaken);

        console.log('Checking email availability...');
        const isEmailRegistered = await dbHelper.checkForEmail(formInput.email);
        console.log('Email availability:', isEmailRegistered);

        if (isUsernameTaken) {
            toast.error("This username is already taken");
            setLoading(false);
            return;
        }

        if (isEmailRegistered) {
            toast.error("This email is already registered");
            setLoading(false);
            return;
        }

        const account_type = "manual";
        const user_Id = uuidv4();
        const data = {
            ...formInput,
            user_id: user_Id,
            date_joined: Date.now(),
            account_type: account_type,
        };

        const user = new AppUser(
            null, data.user_id, data.username, data.email, null, data.password, null, null,
            null, null, null, null, null, null, data.date_joined,
            null, null, null, null, null,
            null, null, null, data.creator_mode, null,
            null, null, data.account_type, null
        );

        console.log('Creating user:', user);
        // const result = await dbHelper.createUser(user);

        navigate(formInput.creator_mode === 'fan' ? '/profile-setup' : '/setup-profile', { state: { user, profile } });

    } catch (error) {
        toast.error("An error occurred while signing up.");
        console.error('Signup error:', error);
    } finally {
        setLoading(false);
    }
};


  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <section className="w-full h-[105vh] flex">
      <div className="hidden md:flex md:w-[50%] signup py-8 px-4 relative">
        <div className="absolute inset-0 bg-color-black opacity-60"></div>
        <Logo color="text-color-white" className="fixed" />
        <div className="flex flex-col justify-center items-center h-[80%] fixed pl-10 lg:pl-[10%]">
          <h1 className="text-color-white font-bold text-[4rem] text-center">Just<span className="text-color-pink">fans</span>.ng</h1>
          <p className="text-[1rem] text-color-white">Join and support your favorite creators today.</p>
        </div>
      </div>
      <div className="px-6 pt-6 lg:px-20 md:pt-0 w-full md:w-[50%]">

        <Logo className="text-[1.5rem] md:hidden" />
        <div className="w-full py-8 md:py-13 items-center justify-center md:flex-col md:flex md:text-left">
          <div className="w-full space-y-2 md:w-[80%]">
            <h3 className="text-color-black text-[1.5rem] font-bold">Create <span className="text-color-pink">Your Account</span></h3>
            <p className="text-[0.8rem] text-color-grey font-semibold">Already have an account? <span><Link to="/login" className="text-color-pink">Log In</Link></span></p>
            <div className="flex pt-4">
              <button className={`${creatorMode === 'fan' ? 'bg-color-pink text-color-white' : 'bg-color-lightGrey text-color-grey'} flex px-8 py-2 rounded justify-center items-center space-x-2`} onClick={handleSignupFan}>
                <img className="w-4 h-4" src="/icons/people.png" alt="fan profile" />
                <p className="text-[0.8rem]">fan</p>
              </button>
              <button className={`${creatorMode === 'creator' ? 'bg-color-pink text-color-white' : 'bg-color-lightGrey text-color-grey'} flex px-8 py-2 rounded justify-center items-center space-x-2`} onClick={handleSignupCreator}>
                <img className="w-4 h-4" src="/icons/profile-white.png" alt="creator profile" />
                <p className="text-[0.8rem]">Creator</p>
              </button>
            </div>
            <div>
              {!loading && <>
                <form onSubmit={handleSubmit} className="space-y-4 pr-4 pt-4">
                  <FormInput name="username" type="text" placeholder="Enter Username" value={formInput.username} onChange={handleInputChange} />
                  <FormInput name="email" type="text" placeholder="Email address or phone number" value={formInput.email} onChange={handleInputChange} />
                  <div className="relative">
                    <FormInput name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" value={formInput.password} onChange={handleInputChange} />
                    <button type="button" onClick={togglePassword} className="absolute inset-y-0 right-0 flex items-center px-2">
                      {showPassword ? <img className="h-4 w-4" src="/icons/password.png" alt="show-password" /> : <img className="h-3 w-3" src="/icons/closePass.png" alt="close-password" />}
                    </button>
                  </div>
                  <FormInput name="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" value={formInput.confirmPassword} onChange={handleInputChange} />
                  <div className="flex space-x-2">
                    <input type="checkbox" name="checkbox" id="termsCheckbox" className="rounded-full checkbox-input" checked={termsChecked} onChange={handleCheckboxChange} />
                    <label htmlFor="termsCheckbox" className="text-[0.7rem] w-[70%] md:w-full">
                      By clicking on Create Free Account, I acknowledge that I am 18+ years old and I accept the <a href="" className="text-color-pink"> Terms & Conditions</a>
                    </label>
                  </div>
                  <div>
                    <button type="submit" className="bg-color-pink w-full rounded-full py-2 text-color-white font-semibold text-[0.8rem] hover:bg-color-pink/80">Create Account</button>
                    <div className="flex items-center justify-center pt-4 space-x-4">
                      <span className="w-[40%] bg-color-grey h-[0.5px]"></span>
                      <p className="text-color-grey">or</p>
                      <span className="w-[40%] bg-color-grey h-[0.5px]"></span>
                    </div>
                    <button onClick={() => {
                      login()
                      googleButtonClicked()
                    }} className="bg-color-blue w-full mt-4 py-2 rounded-full flex items-center justify-center text-color-white hover:bg-color-blue/80 font-semibold text-[0.8rem]">
                      <img src="/icons/google.png" alt="google" className="w-4 h-4 mr-2 rounded-full" />
                      Sign in with Google
                    </button>
                  </div>
                </form>

              </>
              }
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </section>
  );
}

export default Signup;
