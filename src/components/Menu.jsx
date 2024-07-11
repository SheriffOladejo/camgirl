import React, { useRef, useEffect, useState, createRef } from 'react';
import { menu } from './index'; // Assuming you have a menu array in your index.js
import gsap from 'gsap';

function Menu({ isOpen, cancel, username }) {
  const menuRef = useRef(null);
  const modalRefs = useRef([]);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, { duration: 1, opacity: 1, x: -10 });
    } else {
      gsap.to(menuRef.current, { duration: 0.5, opacity: 0, x: -40 });
    }
  }, [isOpen]);

  const handleClose = () => {
    cancel();
    setActiveModal(null);
  };

  const openModal = (index) => {
    if (activeModal !== null && modalRefs.current[activeModal]) {
      gsap.to(modalRefs.current[activeModal], { duration: 0.5, opacity: 0, y: -20 });
    }
    setActiveModal(index);
    if (modalRefs.current[index]) {
      gsap.to(modalRefs.current[index], { duration: 0.5, opacity: 1, y: 0 });
    }
    cancel(); // Close the menu when opening a modal
  };

  const closeModal = () => {
    if (activeModal !== null && modalRefs.current[activeModal]) {
      gsap.to(modalRefs.current[activeModal], { duration: 0.5, opacity: 0, y: -20 });
      setActiveModal(null);
      gsap.to(menuRef.current, { duration: 0.5, opacity: 1, x: 0 });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.menu-container')) {
        handleClose();
      }
      if (activeModal !== null && !event.target.closest('.modal')) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, activeModal]);

  const modalCount = 4; // Change this if you have more modals

  // Ensuring refs array has enough refs
  if (modalRefs.current.length !== modalCount) {
    modalRefs.current = Array(modalCount).fill().map((_, i) => modalRefs.current[i] || createRef());
  }

  return (
    <>
      <div ref={menuRef} className="menu-container absolute right-4 z-20 bg-color-white w-[190px] block rounded-md shadow">
        {menu.map((item, index) => (
          <button onClick={() => openModal(index)} key={index} className="flex items-center justify-start space-x-2 hover:bg-color-lightGrey active:bg-color-lightGrey w-full px-4 py-3 transition-colors delay-200 duration-500">
            <img src={item.img} className="w-4 h-4" alt={item.alt} />
            <span className="text-[12px]">{`${item.text} ${username ? username : '@caseCert'}`}</span>
          </button>
        ))}
      </div>

      {activeModal === 0 && (

        <div
          ref={el => modalRefs.current[0] = el}
          className="modal absolute right-10 w-[220px] rounded p-4 z-30"
        >
          <div className="bg-color-white rounded p-4 space-y-2">
            <h1 className="font-bold text-center text-[14px]">Subscribe</h1>
            <p className="text-grey text-[10px]">Support your favorite creators for bonus content and extra perks.</p>
            <button className="bg-color-pink rounded text-color-white text-center text-[10px] py-2 px-3 w-full font-medium hover:bg-color-white hover:text-color-pink hover:border hover:border-color-pink">Subscribe ₦3,000.00/month</button>
            <button onClick={closeModal} className="border border-color-pink rounded text-color-pink text-center text-[10px] py-2 px-3 w-full hover:bg-color-pink hover:text-color-white">Cancel</button>
          </div>
        </div>
      )}

      {activeModal === 1 && (
        <div
          ref={el => modalRefs.current[1] = el}
          className="modal absolute right-10 w-[320px] rounded p-4 z-30"
        >
          <div className="bg-color-white rounded p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-center text-[12px]">Post Analytics</h3>
              <img onClick={closeModal} src="../icons/close-dark.png" alt="close" className='w-2 h-2 cursor-pointer' />
            </div>
            <div className='flex justify-between items-center mt-10'>
              <div className='flex flex-col justify-center items-center space-y-1'>
                <img src="../icons/like.png" alt="likes" className='w-3 h-3'/>
                <span className='text-[10px] text-color-grey/80 font-semibold'>200 Likes</span>
              </div>
              <div className='flex flex-col justify-center items-center space-y-1'>
                <img src="../icons/comment.png" alt="comments" className='w-3 h-3'/>
                <span className='text-[10px] text-color-grey/80 font-semibold'>30 Comments</span>
              </div>
              <div className='flex flex-col justify-center items-center space-y-1'>
                <img src="../icons/tip.png" alt="tips"  className='w-3 h-3'/><span className='text-[10px] text-color-grey/80 font-semibold'>$10000 Tips</span>
              </div>
            </div>
            <div className='flex justify-between items-center mt-10'>
              <div>
                <p className='text-[10px] text-color-grey/80 font-semibold'>Impressions</p>
                <p className='font-bold text-center'>13,700</p>
              </div>
              <div>
                <p className='text-[10px] text-color-grey/80 font-semibold'>Engagements</p>
                <p className='font-bold text-center'>700</p>
              </div>
              <div>
                <p className='text-[10px] text-color-grey/80 font-semibold'>Detail expands</p>
                <p className='font-bold text-center'>400</p>
              </div>
            </div>
            <div className='flex justify-around mt-6'>
              <div className=''>
                <p className='text-[10px] text-color-grey/80 font-semibold'>Profile Visits</p>
                <p className='font-bold text-center'>24</p>
              </div>
              <div>
                <p className='text-[10px] text-color-grey/80 font-semibold'>New Subscribers</p>
                <p className='font-bold text-center'>4</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 2 && (
        <div
          ref={el => modalRefs.current[2] = el}
          className="modal absolute right-10 w-[220px] rounded p-4 z-30"
        >
          <div className="bg-color-white rounded p-4">
            <h1 className="font-bold text-center text-[14px]">Block @{username ? username : 'CaseCert'}</h1>
            <p className="text-grey text-[12px]">They won't have the ability to track your account or access your posts, and you won't receive posts or notifications from @{username ? username : 'CaseCert'}</p>
            <button className="bg-color-pink rounded text-color-white text-center text-[12px] py-2 px-3 w-full">Block</button>
            <button onClick={closeModal} className="outline-color-pink rounded text-color-pink text-center text-[12px] py-2 px-3 w-full">Cancel</button>
          </div>
        </div>
      )}

      {activeModal === 3 && (
        <div
          ref={el => modalRefs.current[3] = el}
          className="modal absolute right-10 inset-0 bg-opacity-50 flex items-center justify-center bg-white rounded p-4 w-[40%] z-30 opacity-100 translate-y-0"
        >
          <div className="bg-white rounded p-4">
            <h1 className="font-bold text-center text-[16px]">What type of issue are you reporting?</h1>
            <div>
              <div>
                <div>
                  <h3>Spam</h3>
                  <input type="checkbox" name="checkbox" id="spam" />
                </div>
                <span>Financial scams, posting malicious links, misusing hashtags, fake engagement</span>
              </div>
              <div>
                <div>
                  <h3>Hate</h3>
                  <input type="checkbox" name="checkbox" id="hate" />
                </div>
                <span>Slurs, Racist or sexist stereotypes, Dehumanization, Incitement of fear or discrimination, Hateful references, Hateful symbols & logos</span>
              </div>
              <div>
                <div>
                  <h3>Sensitive or disturbing media</h3>
                  <input type="checkbox" name="checkbox" id="sensitive-comments" />
                </div>
                <span>Graphic Content, Gratuitous Gore, Adult Nudity & Sexual Behavior, Violent Sexual Conduct, Bestiality & Necrophilia,</span>
              </div>
              <div>
                <div>
                  <h3>Violent speech</h3>
                  <input type="checkbox" name="checkbox" id="violent-speech" />
                </div>
                <span>Violent Threats, Wish of Harm, Glorification of Violence, bullying or harassment</span>
              </div>
              <div>
                <div>
                  <h3>Privacy</h3>
                  <input type="checkbox" name="checkbox" id="privacy" />
                </div>
                <span>Sharing private information, threatening to share/expose private information, sharing non-consensual intimate images, sharing images of me that I don’t want on the platform</span>
              </div>
            </div>
            <input type="text" placeholder="Tell us more...." />
            <button className="bg-color-pink rounded text-color-white text-center text-[12px] py-2 px-3 w-full">Submit report</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
