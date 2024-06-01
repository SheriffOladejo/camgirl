import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { useState } from "react";
import MobileFooterNav from '../components/MobileFooterNav'
import { useMediaQuery } from 'react-responsive';
function AccountSettings() {
 const navigate = useNavigate()
 const isMobile = useMediaQuery({ maxWidth: 768 });
  const [formInput, setFormInput] = useState({
    email: "",
    recovery_email: "",

  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput(prev => ({ ...prev, [name]: value }));
    validateInput(name, value);
  }
  return (
    <>
      <div className="flex flex-col h-[100vh]  bg-color-white messages-convo-list rounded w-full shadow pb-6 md:h-[80vh] md:sticky      md:mt-7 ">
        <div className='flex py-3  ml-4 justify-start items-center space-x-2'>
          <img src="../src/assets/icons/back-arrow.png" alt="go back" className='w-4 h-4' onClick={() => navigate('/settings')} />
          <h4 className='font-bold'>Account Settings</h4>
        </div>
        <form action="#" method="POST" className="pt-6 px-3 ">
          <div>
            <label htmlFor="email" className="text-color-grey text-[14px] font-semibold ">Email</label>
            <div className="relative">
              <FormInput
                name="email"
                type="text"
                id="email"
                placeholder="Casecert@onlyfans.com"
                value={formInput.email}
                onChange={handleInputChange} className={`text-color-black     border-2 border-color-lightGrey text-[0.8rem] w-[100%] outline-none rounded px-4 py-2 mt-1`} />
              <img src="../src/assets/icons/pencil.png" alt="" className="absolute top-4 right-4"/>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="recovery-email" className="text-color-grey text-[14px] font-semibold">Recovery email</label>
            <div className="relative">
              <FormInput name="email-recovery"
                type="text"
                id="email-recovery"
                placeholder="Casecert@onlyfans.com"
                value={formInput.recovery_email}
                onChange={handleInputChange} className={`text-color-black     border-2 border-color-lightGrey text-[0.8rem] w-[100%] outline-none rounded px-4 py-2 mt-1`} />
              <img src="../src/assets/icons/pencil.png" alt="" className="absolute top-4 right-4"/>
            </div>
          </div>
        </form>
        <div className="flex flex-col items-start py-8 px-3 space-y-4">
          <button className="font-semibold ">Password</button>
          <button className="font-semibold ">Linked accounts</button>
          <button className="font-semibold ">Two Step Authentication</button>

         
        </div>
        <hr className="border-color-lightGrey"/>
          <button className="text-start pl-3 font-semibold text-color-red my-2">Delete account</button>
      </div>
      {isMobile && <MobileFooterNav active={'Home'}/>}
    </>
  );
}

export default AccountSettings;
