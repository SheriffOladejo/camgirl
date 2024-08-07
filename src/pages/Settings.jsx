import { useState } from "react";
import LeftBar from "../components/LeftBar";
import Header from "../components/Header";
import SettingsComponent from "../components/SettingsComponent";
import AccountSettings from "../components/AccountSettings";
import ProfileSettings from '../components/ProfileSettings';
import PrivacySetting from '../components/PrivacySetting';
import NotificationSettings from '../components/NotificationSettings';
import { useMediaQuery } from 'react-responsive';
import MobileFooterNav from '../components/MobileFooterNav'
function Settings() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [activeUrl, setActiveUrl] = useState("0");

  const renderComponent = () => {
    switch (activeUrl) {
      case "1":
        return <AccountSettings />;
      case "0":
        return <ProfileSettings />;
      case "2":
        return <PrivacySetting />;
      case "3":
        return <NotificationSettings />;
      default:
        return <p>Select a setting</p>;
    }
  };


  return (
    <>
      <section className="w-[100%]  ">
        {isMobile ? '' : <Header />}
        <div className="grid gap-x-4 md:grid-cols-2 lg:grid-cols-3 md:px-16 overflow-y-visible bg-color-lightGrey md:h-[135vh]">
          <LeftBar className={`col-span-1 w-[100%] top-[19%]`} />
          <SettingsComponent className={`col-span-1 `} setActiveUrl={setActiveUrl} />
          <div className={`col-span-1 overflow-y-hidden  hidden md:flex`}>{renderComponent()}</div>
        </div>
      </section>
      {isMobile && 
      <MobileFooterNav />}
    </>
  );
}

export default Settings;
