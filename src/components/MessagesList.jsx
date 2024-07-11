import { useState } from 'react';

function MessagesList({ className }) {
  const [searchMessages, setSearchMessages] = useState("");

  const handleChange = (e) => setSearchMessages(e.target.value);

  return (
    <div className={`${className} bg-color-white pt-5 shadow h-[75%] md:sticky top-[23%] rounded-xl overflow-y-scroll messages-chat-list mt-5 ml-4 md:ml-0`}>
      <div className="relative px-4">
        <img className="w-4 h-4 cursor-text absolute top-2 left-6" src="../icons/search-normal.png" alt="search" />
        <input
          className="placeholder:text-color-grey text-[12px] outline-none bg-color-grey/20 border border-1 border-color-grey/50 pl-8 w-full py-2 rounded-full"
          type="search"
          value={searchMessages}
          onChange={handleChange}
          name="search"
          id="search-messages"
          placeholder="Search Message"
        />
      </div>
      <h6 className="font-bold pt-5 text-[16px] px-4">Messages</h6>
      <hr className="bg-color-grey/30 w-full h-[0.1px] mt-3" />
      <div className="messages-chat-list">
        {/* Uncomment and populate with chat items */}
        {/* {chatList.map((comment, index) => (
          <ChatItem key={index} />
        ))} */}
      </div>
    </div>
  );
}

export default MessagesList;
