import  {  useContext, useEffect} from "react"
import { useNavigate } from "react-router-dom";

import Logo from "./Logo";
import { AuthContext } from "../context/authContext";
function MobileHeader() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUserType } = useContext(AuthContext);
  const { userType } = currentUser;
  const profilePic = (currentUser[userType]?.picture) || null;

  const toggleMode = () => {
    const newUserType = userType === "creator" ? "fan" : "creator";
    if (newUserType !== userType) {
      setCurrentUserType(newUserType);
      const homePageRoute = newUserType === "creator" ? "/home" : "/fanhome";
      navigate(homePageRoute);
    }
  };
  

  // useEffect(() => {
  //   const storedUserType = localStorage.getItem("userType");
  //   if (storedUserType) {
  //     setCurrentUserType(storedUserType);
  //   }
  // }, [setCurrentUserType]);
  return (
    <header className=" px-10 py-5  flex justify-between items-center sticky top-0 z-20 bg-color-white shadow-md">
         {/* profile : clicking on the menu would drop down and show links to other parts of the website, and the profile picture is dynamic*/}
         
         <div className="p-[1px] bg-color-pink rounded-full">
              {profilePic && <img src={profilePic} alt="Profile Pic" className="w-6 h-6 rounded-full"/>}
            </div>
          
        
      <Logo />
          <div className={` relative bg-color-lightGrey rounded-xl cursor-pointer w-8 h-2 items-center transition-all duration-200 ease-in-out ${userType === 'creator' ? 'justify-start' : 'justify-end'}`} onClick={toggleMode}>
            <div className={`absolute transform ${userType === 'creator'  ? 'left-0' : 'right-0'}`}>
              {userType === 'creator'  ? <img className="w-4 h-4 mt-[-4px]" src="../src/assets/icons/people-frame.png" alt="" /> : <img className="w-4 h-4 p-1 mt-[-4px] bg-color-pink rounded-full" src="../src/assets/icons/profile-white.png" alt="" />}
            </div>
          </div>

       
   
  
    </header>
  )
}

export default MobileHeader