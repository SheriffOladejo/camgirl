import  { useState, useContext } from "react"
import Logo from "./Logo";
import { AuthContext } from "../context/authContext";
function MobileHeader() {
  const [isCreator, setIsCreator] = useState(true)
  const toggleMode = () => {
    setIsCreator(!isCreator)
  }
  const {currentUser} = useContext(AuthContext)
  // Check if currentUser is null before accessing its properties
  const profilePic = currentUser ? currentUser.profilePic : null;
  return (
    <header className=" px-10 py-5  flex justify-between items-center sticky top-0 z-20 bg-color-white shadow-md">
         {/* profile : clicking on the menu would drop down and show links to other parts of the website, and the profile picture is dynamic*/}
         
            <div>
            {profilePic && <img src={profilePic} alt="Profile Pic" />}
      {/* Render other header content */}
            </div>
          
        
      <Logo />
     
      
         
          {/*  users can click between fan or creator mode and they should be able to slide to the left or right, if they slide right or click and it slides right the imge should change to the creator image and the bg as well, also they would have different info showing  */}
          <div className={` relative bg-color-lightGrey rounded-xl cursor-pointer w-8 h-2 items-center transition-all duration-200 ease-in-out ${isCreator ? 'justify-start' : 'justify-end'}`} onClick={toggleMode}>
            <div className={`absolute transform ${isCreator ? 'left-0' : 'right-0'}`}>
              {isCreator ? <img className="w-4 h-4 mt-[-4px]" src="../src/assets/icons/people-frame.png" alt="" /> : <img className="w-4 h-4 p-1 mt-[-4px] bg-color-pink rounded-full" src="../src/assets/icons/profile-white.png" alt="" />

              }
            </div>


          </div>

       
   
  
    </header>
  )
}

export default MobileHeader