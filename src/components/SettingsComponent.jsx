import { useState } from "react";
import { settings } from "."; 
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

function SettingsComponent({ setActiveUrl, className }) {
  const [searchSettings, setSearchSettings] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const handleChange = (e) => setSearchSettings(e.target.value);
  const isMobile = useMediaQuery({ maxWidth: 768 }); 
  const navigate = useNavigate();

  const handleSettingSelect = (id) => {
    setActiveUrl(id);
    setActiveIndex(id);
    // Hide SettingsComponent when a setting is selected
    if (isMobile) {
      switch (id) {
        case "1":
          navigate('/settings/account');
          break;
        case "0":
          navigate('/settings/profile');
          break;
        case "2":
          navigate('/settings/privacy');
          break;
        case "3":
          navigate('/settings/notifications');
          break;
        default:
          navigate('/settings');
      }
    }
  };

  const renderSettingsLinks = () => (
    settings
      .filter(setting => setting.title.toLowerCase().includes(searchSettings.toLowerCase()))
      .map((setting, index) => (
        <div
          key={index}
          className={`${className} flex justify-between items-center py-1 text-lg font-semibold transition-all ${activeIndex === setting.id ? 'bg-color-lightGrey border-r-4 border-r-color-pink' : ''}`}
          onClick={() => handleSettingSelect(setting.id)}
        >
          <span className="md:text-[0.8rem] text-[1rem] pl-3">{setting.title}</span>
          <img
            src="../icons/active-black.png"
            alt="Active"
            className="w-3 h-3 mr-4"
          />
        </div>
      ))
  );

  return (
    <>
      <div className="md:mt-7 h-[100vh] md:h-[60%] flex flex-col w-full ">
        <div className="md:rounded-lg md:mb-4 bg-color-white md:py-2 md:px-4 py-6 px-8">
          <h1 className="font-bold md:text-[18px] text-[20px]">Settings</h1>
        </div>
        <div className="pt-4 w-full h-full md:h-[75%] md:sticky md:rounded-xl messages-chat-list overflow-x-clip px-4 md:px-0 bg-color-white md:shadow">
          <div className="relative messages-chat-search-container px-2 mb-4">
            <img
              className="w-4 h-4 cursor-text absolute top-2.5 left-4"
              src="../icons/search-normal.png"
              alt="search"
            />
            <input
              className="placeholder:text-color-grey text-[12px] outline-none bg-color-grey/10 border border-color-grey/50 pl-8 w-full py-2 rounded-full"
              type="search"
              value={searchSettings}
              onChange={handleChange}
              name="search"
              id="search-settings"
              placeholder="Search Settings"
            />
          </div>
          <div className={`col-span-1 overflow-y-hidden  hidden md:flex`}>{renderComponent()}</div>
        </div>
      </div>
    </>
  );
}

export default SettingsComponent;
