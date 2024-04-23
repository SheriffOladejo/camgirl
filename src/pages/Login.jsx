import Logo from "../components/Logo"
import FormInput from "../components/FormInput"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"

// google signin

function Login() {
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",

  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",

  });

  const handleInputChange = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
    // Reset corresponding error message if the input is changed
    setFormErrors({
      ...formErrors,
      [name]: '',
    });
    // Validate input based on name
    if (name === "email") {
      // Perform email validation
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(value)) {
        setFormErrors({ [name]: "Invalid email address" });
      } else {
        setFormErrors("");
      }

    } else if (name === "password") {
      // Perform password validation
      // Example: Minimum password length validation
      if (value.length < 6) {

        setFormErrors({ [name]: "Password must be at least 6 characters long" });
      } else {
        setFormErrors("");
      }
    } else if (name === "confirmPassword") {
      // You should compare with the value directly from the input, not from formInput state
      if (value !== formInput.password) {
        ({ [name]: "Passwords do not match" });
      } else {
        setFormErrors("");
      }
    }
  };

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


    // Update form errors
    setFormErrors(errors);

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formInput);

      //  logged user  comes from protected routes
      if (formInput.email === loggeduser.email && formInput.password === loggeduser.password) {
        localStorage.setItem('Loggedin', true)
        navigate('/')
      } else {
        alert("incorrect password and email")
      }
    }
  };


  // password visibility toggle
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => {
    setShowPassword((prev) => !prev)
  }
  // const onSubmit = (data) => {
  //   console.log('Form submitted:', data); // Handle form submission
  // };


  return (
    <section className="w-full h-[100vh] flex ">

      <div className="hidden md:flex md:w-[50%] login py-8 px-4 relative" >

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
            {/* action:  whwere we want the user to be taken to after submitting the form */}


            <form action="/" onSubmit={handleSubmit} method='post' className="space-y-6 pr-4" >
              <FormInput name="email" type="text" placeholder="Email address or phone number"
                value={formInput.email}
                onChange={handleInputChange}
                error={formErrors.email} />


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
              {/* add link */}
              <a href="#" className="flex justify-end text-[0.9rem] text-color-grey">Forgot Password?</a>
              <div >
                <button

                  type="submit" className="bg-color-pink w-full rounded-full py-2 text-color-white font-semibold text-[0.8rem] hover:bg-color-pink/80"
                >Log In</button>
                <div
                  className="flex  items-center justify-center pt-4 space-x-4"
                >
                  <span className="w-[40%] bg-color-grey h-[0.5px]"></span>
                  <p className="text-color-grey">or</p>
                  <span className="w-[40%] bg-color-grey h-[0.5px]"></span>
                </div>
                <button className="bg-color-blue w-full relative mt-4 py-2 rounded-full text-color-white hover:bg-color-blue/80 font-semibold text-[0.8rem]">
                  <img src="../src/assets/icons/google.png" alt="" className="absolute w-4 h-4 left-4 rounded-full " />
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

export default Login