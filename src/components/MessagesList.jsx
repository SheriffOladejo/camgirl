import { useState } from "react";

function MessagesList() {
  const [searchMessages, setSearchMessages] = useState("");

  const handleChange = (e) => setSearchMessages(e.target.value);

  return (
    <div className='bg-color-white  w-full  py-[20px] shadow h-[75%] sticky top-[20%] rounded-xl overflow-y-scroll messages-chat-list mt-5 overflow-x-clip  ml-4' >
      <div className="relative messages-chat-search-container px-4">
        <img className="w-4 h-4 cursor-text absolute top-2 left-6" src="../src/assets/icons/search-normal.png" alt="search" />
        <input
          className="placeholder:text-color-grey text-[12px] outline-none bg-color-grey/20 border border-1 border-color-grey/50 pl-8 w-[100%]  py-2 rounded-full"
          type="search"
          value={searchMessages}
          onChange={handleChange}
          name="search"
          id="search-messages"
          placeholder={'Search Message'}
        />
      </div>
      <h6 className="font-bold pt-5 text-[16px] px-4">Messages</h6>
      <hr className="bg-color-grey/10 w-[100vw] h-[0.1px] px-0 mt-3" />
      <div className="messages-chat-list">
        {/* {chatList.map((comment, index) => (
          <ChatItem
            key={index}
          />
        ))} */}
      </div>
    </div>
  );
}

export default MessagesList;
