
import LiveUser from "./LiveUser";
import { useState } from "react";

function ExplorePage() {
  const [filter, setFilter] = useState('all')
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const [searchTrending, setSearchTrending] = useState("");
  const handleChange = (e) => setSearchTrending(e.target.value);

  return (
    <section className="w-full space-y-6 mt-7 px-4 md:px-0">
      <div className="flex">
        <div className="relative messages-chat-search-container mr-4 md:mb-4 w-full md:w-72 ">
          <img
            className="w-3 h-3 cursor-text absolute top-2.5 left-4"
            src="../icons/search-black.png"
            alt="search"
          />
          <input
            className="placeholder:text-color-grey text-[12px] outline-none bg-color-white shadow pl-8 w-full py-1.5 pr-28 rounded border border-color-lightGrey md:border-none"
            type="search"
            value={searchTrending}
            onChange={handleChange}
            name="search"
            id="search-settings"
            placeholder="Search posts, creators..."
          />
        </div>
        <div className="hidden md:block">
        <select value={filter} onChange={handleFilterChange} className=" bg-color-white rounded text-[0.6rem] outline-none p-1.5 shadow">
          <option value="all">All</option>
          <option value="free">Free </option>
          <option value="paid">Paid </option>
        </select>
        </div>
      </div>

      <div className="bg-color-white rounded pt-4 md:pl-4 pb-2">
        <h1 className="font-bold text-[20px] md:text-[16px] pb-3 md:pb-4">Trending</h1>
        <div className="flex flex-col md:flex-row justify-start md:space-x-2 space-y-2 md:space-y-0">
          <button className="rounded bg-color-lightGrey px-2 text-[0.8rem] text-start md:text-center">#feet</button>
          <button className="rounded bg-color-lightGrey px-2 text-[0.8rem]  text-start md:text-center">#FYP</button>
          <button className="rounded bg-color-lightGrey px-2 text-[0.8rem]  text-start md:text-center">#Camgirl</button>
          <button className="rounded bg-color-lightGrey px-2 text-[0.8rem]  text-start md:text-center">#Camgirl</button>
          <button className="rounded bg-color-lightGrey px-2 text-[0.8rem]  text-start md:text-center ">#Ebony booty</button>
          <button className="rounded bg-color-lightGrey px-2 text-[0.8rem]  text-start md:text-center">#ass</button>
        </div>
      </div>
      <div className="bg-color-white rounded pt-4 md:pl-4 pb-2">
        <h1 className="font-bold text-[20px] md:text-[16px]">Live Cam</h1>
        <div className="flex flex-wrap gap-3  mt-4">
          <LiveUser />
          <LiveUser />
          <LiveUser />
          <LiveUser />
          <LiveUser />
          <LiveUser />
          <LiveUser />
          <LiveUser />
          <LiveUser />
        </div>

      </div>
      <div className="bg-color-white rounded md:px-3 pt-4 pb-4">
        <div>
          <h1 className="font-bold text-[20px] md:text-[16px] mb-4">Top Creators</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3  gap-3 text-color-white">
          <div className="rounded relative overflow-hidden cursor-pointer">
            <div>
              <img src="../signup_bg.png" alt="" className="h-52 object-cover"/>
            </div>
            <div className="absolute bottom-0 bg-color-pink w-full px-3 pb-1">
              <div className="flex justify-between items-center">
                <h1 className="flex text-[14px] items-center ">Case Cert <span><img src="../icons/certified.png" alt="verified" className="w-4 h-4 ml-1"/></span></h1>
                <p className="text-color-white text-[12px]">Free</p>
              </div>
              <p className="text-[12px] font-thin">@casey123</p>
            </div>
          </div>
          <div className="rounded relative overflow-hidden cursor-pointer">
            <div>
              <img src="../signup_bg.png" alt="" className="h-52 object-cover"/>
            </div>
            <div className="absolute bottom-0 bg-color-pink w-full px-3 pb-1">
              <div className="flex justify-between items-center">
                <h1 className="flex text-[14px] items-center ">Case Cert <span><img src="../icons/certified.png" alt="verified" className="w-4 h-4 ml-1"/></span></h1>
                <p className="text-color-white text-[12px]">Free</p>
              </div>
              <p className="text-[12px] font-thin">@casey123</p>
            </div>
          </div>
          <div className="rounded relative overflow-hidden cursor-pointer">
            <div>
              <img src="../signup_bg.png" alt="" className="h-52 object-cover"/>
            </div>
            <div className="absolute bottom-0 bg-color-pink w-full px-3 pb-1">
              <div className="flex justify-between items-center">
                <h1 className="flex text-[14px] items-center ">Case Cert <span><img src="../icons/certified.png" alt="verified" className="w-4 h-4 ml-1"/></span></h1>
                <p className="text-color-white text-[12px]">Free</p>
              </div>
              <p className="text-[12px] font-thin">@casey123</p>
            </div>
          </div>
          <div className="rounded relative overflow-hidden cursor-pointer">
            <div>
              <img src="../signup_bg.png" alt="" className="h-52 object-cover"/>
            </div>
            <div className="absolute bottom-0 bg-color-pink w-full px-3 pb-1">
              <div className="flex justify-between items-center">
                <h1 className="flex text-[14px] items-center ">Case Cert <span><img src="../icons/certified.png" alt="verified" className="w-4 h-4 ml-1"/></span></h1>
                <p className="text-color-white text-[12px]">Free</p>
              </div>
              <p className="text-[12px] font-thin">@casey123</p>
            </div>
          </div>
          <div className="rounded relative overflow-hidden cursor-pointer">
            <div>
              <img src="../signup_bg.png" alt="" className="h-52 object-cover"/>
            </div>
            <div className="absolute bottom-0 bg-color-pink w-full px-3 pb-1">
              <div className="flex justify-between items-center">
                <h1 className="flex text-[14px] items-center ">Case Cert <span><img src="../icons/certified.png" alt="verified" className="w-4 h-4 ml-1"/></span></h1>
                <p className="text-color-white text-[12px]">Free</p>
              </div>
              <p className="text-[12px] font-thin">@casey123</p>
            </div>
          </div>
          <div className="rounded relative overflow-hidden cursor-pointer">
            <div>
              <img src="../signup_bg.png" alt="" className="h-52 object-cover"/>
            </div>
            <div className="absolute bottom-0 bg-color-pink w-full px-3 pb-1">
              <div className="flex justify-between items-center">
                <h1 className="flex text-[14px] items-center ">Case Cert <span><img src="../icons/certified.png" alt="verified" className="w-4 h-4 ml-1"/></span></h1>
                <p className="text-color-white text-[12px]">Free</p>
              </div>
              <p className="text-[12px] font-thin">@casey123</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExplorePage;