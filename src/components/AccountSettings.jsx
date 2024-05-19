function AccountSettings() {

  let headerImg = null
  return (
    <div

      className="flex flex-col items-center justify-center space-y-2 bg-color-white messages-convo-list h-[75%] sticky top-[20%] w-[400px] md:w-[350px] rounded shadow mt-4"
    >
      <div>
        <img src="../src/assets/icons-arrow-back.png" alt="go back" />
        <h4>Account Settings</h4>
      </div>
      <div className="w-full h-[30%] relative">
        {/* header img */}
        {headerImg ? (
          <img src={headerImg} alt="Header" className=" " />
        ) : (
          <img
            src="../src/assets/background/bgimg.jpg"
            alt="Profile Pic"
            className="w-full h-full object-cover "
          />
        )}
        <div>
          {/* profile picture */}
          <img
            src="../src/assets/images/safari-adventure.jpg"
            alt="profile picture"
            className="rounded-full w-24 h-24 absolute top-[78%] left-10"
          />
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
