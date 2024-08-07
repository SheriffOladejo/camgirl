import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DbHelper from '../utils/DbHelper';
import Logo from "../components/Logo";
import FormInput from "../components/FormInput";
import { AuthContext } from "../context/authContext";
import { GOOGLE_CLIENT_ID } from "../utils/Constants";

function Login() {
  const dbHelper = new DbHelper();
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });

    if (name === "email") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(value)) {
        toast.error("Invalid email address");
      } else {
        toast.dismiss();
      }
    } else if (name === "password" && value.length < 6) {
      toast.error("Password must be at least 6 characters long");
    } else {
      toast.dismiss();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formInput;

    if (!email) {
        toast.error('Email is required');
        return;
    }
    if (!password) {
        toast.error('Password is required');
        return;
    }

    console.log('Attempting to fetch user for email:', email); // Debugging statement

    const userData = await dbHelper.getAppUserByEmail(email);
    if (!userData) {
        toast.error("User not found");
        return;
    }

    console.log('User data retrieved:', userData); // Debugging statement

    if (password !== userData.password) {
        toast.error("Incorrect password");
        return;
    }
  console.log(userData.id)
   await loginUser(userData.id);
    localStorage.setItem('Loggedin', true);
    navigate('/home');
};


  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleGoogleSignIn = () => {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });
    window.google.accounts.id.prompt();
  };

  const handleGoogleResponse = async (response) => {
    const userObject = jwt_decode(response.credential);
    const userEmail = userObject.email;

    let userData = await dbHelper.getAppUserByEmail(userEmail);
    if (!userData) {
      // If user does not exist, create a new user
      userData = {
        email: userEmail,
        username: userObject.name,
        // other user details from the response as needed
      };
      await dbHelper.createUser(userData);
    }

    loginUser(userData.id);
    localStorage.setItem('Loggedin', true);
    navigate('/home');
  };

  return (
    <section className="w-full h-[100vh] flex ">
      <div className="hidden md:flex md:w-[50%] login py-8 px-4 relative">
        <div className="absolute inset-0 bg-color-black opacity-60"></div>
        <Logo color="text-color-white" className="fixed" />
        <div className="flex flex-col justify-center items-center h-[80%] fixed pl-10 lg:pl-[10%]">
          <h1 className="text-color-white font-bold text-[4rem] text-center">Just<span className="text-color-pink">fans</span>.ng</h1>
          <p className="text-[1rem] text-color-white">Join and support your favorite creators today.</p>
        </div>
      </div>
      <div className="px-6 pt-6 md:px-0 md:pt-0 w-full md:w-[50%]">
        <Logo className="text-[1.5rem] md:hidden" />
        <div className="w-full py-8 md:py-20  items-center justify-center md:flex-col md:flex md:text-left ">
          <div className="w-full space-y-4 md:w-[80%] ">
            <h3 className="text-color-black text-[1.5rem] font-bold">Log <span className="text-color-pink">In</span></h3>
            <p className="text-[0.9rem] text-color-grey font-semibold">Don't have an account?
              <span> <Link to="/signup" className="text-color-pink ">Sign up</Link></span>
            </p>

            <form onSubmit={handleSubmit} method='post' className="space-y-6 pr-4">
              <FormInput
                name="email"
                type="text"
                placeholder="Email address or phone number"
                value={formInput.email}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              />

              <div className="relative">
                <FormInput
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formInput.password}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                <button type="button" onClick={togglePassword} className="absolute inset-y-0 right-0 flex items-center px-2">
                  {showPassword ? (
                    <img className="h-4 w-4" src="../icons/password.png" alt="show-password" />
                  ) : (
                    <img className="h-3 w-3" src="../icons/closePass.png" alt="close-password" />
                  )}
                </button>
              </div>

              <a href="#" className="flex justify-end text-[0.9rem] text-color-grey">Forgot Password?</a>
              <div>
                <button
                onClick={handleSubmit}
                  type="submit"
                  className="bg-color-pink w-full rounded-full py-2 text-color-white font-semibold text-[0.8rem] hover:bg-color-pink/80"
                >
                  Log In
                </button>
                <div className="flex items-center justify-center pt-4 space-x-4">
                  <span className="w-[40%] bg-color-grey h-[0.5px]"></span>
                  <p className="text-color-grey">or</p>
                  <span className="w-[40%] bg-color-grey h-[0.5px]"></span>
                </div>
                <button
                  type="button"
                  className="bg-color-blue w-full mt-4 py-2 rounded-full flex items-center justify-center text-color-white hover:bg-color-blue/80 font-semibold text-[0.8rem]"
                  onClick={handleGoogleSignIn}
                >
                  <img src="../icons/google.png" alt="" className="w-4 h-4 mr-2 rounded-full" />
                  Sign in with Google
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
}

export default Login;
