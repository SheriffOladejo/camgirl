
import Logo from "../components/Logo"
import FormInput from "../components/FormInput"
import { FormProvider, handleSubmit } from "../contexts/FormContext"
import { useState } from "react"
// import icon for password open and close eye

function Signup() {

  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => {
    setShowPassword((prev) => !prev)
  }
  return (
    <section className="w-full h-[100vh] flex ">

      <div className="hidden md:flex md:w-[50%] signup py-8 px-4">
        <Logo color={"text-color-white"} />
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
              <span> <a href="/signup" className="text-color-pink ">Sign up</a></span>
            </p>
            {/* action:  whwere we want the user to be taken to after submitting the form */}
            <FormProvider>

              <form method="post" onSubmit={handleSubmit} className="space-y-6 pr-4" >
                <FormInput name="email" type="text" placeholder="Email address or phone number" className="px-4 py-2 " />
                <div className="relative"> <FormInput name="password" type={showPassword ? 'text' : 'password'} placeholder="Confirm Password" className="px-4 py-4"
                />

                <button type="button" onClick={togglePassword} className="absolute inset-y-0 right-0 flex items-center px-2">
                  {/* {showPassword ? officon : openicon} */}
                </button>
                {/* <a href="">
                <img className="absolute " src="../src/assets/icons/password.png" alt="toggle-password"
                    onClick={togglePassword}
                  />
                </a>
                  */}

                </div>
                {/* add link */}
                <a href="#" className="flex justify-end text-[0.9rem] text-color-grey">Forgot Password?</a>
                <div >
                <button type="submit" className="bg-color-pink w-full rounded-full py-2 text-color-white font-semibold hover:bg-color-pink/80">Log In</button>
                <div className="flex  items-center justify-center pt-4 space-x-4">
                  <span className="w-[40%] bg-color-grey h-[0.5px]"></span>
                  <p className="text-color-grey">or</p>
                  <span className="w-[40%] bg-color-grey h-[0.5px]"></span>
                </div>
                <button className="bg-color-blue w-full relative mt-4 py-2 rounded-full hover:bg-color-blue/80">
                  <img src="../src/assets/icons/google.png" alt="" className="absolute left-4 rounded-full"/>
                  Sign in with Google
                </button>
                </div>
                
              </form>
            </FormProvider>
          </div>
        </div>
      </div>

    </section>
  )
}

export default  Signup