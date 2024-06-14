import React from 'react';

function StartConvo({ className }) {
  const handleClick = () => {
    // Define your click handler logic here
  };

  return (
    <div className={`${className} flex flex-col items-center justify-center space-y-2 bg-color-white messages-convo-list h-[90%] md:sticky  rounded-xl shadow mt-11`}>
      <img src="../src/assets/icons/convo.png" alt="start a convo" className='w-16 h-17' />
      <h6 className='text-[15px] text-color-grey font-semibold text-center'>Start a convo</h6>
      <p className='text-[11px] text-color-grey font-thin text-center w-[60%]'>Choose from your existing conversations, start a new one, or just keep swimming.</p>
      <div className='pt-6'>
        <button onClick={handleClick} className='bg-color-pink text-color-white shadow text-[12px] flex px-6 py-2 rounded-lg items-center'>
          Send Messages <img src="../src/assets/icons/sms.png" alt="" className='w-4 h-4 ml-2 mt-1' />
        </button>
      </div>
    </div>
  );
}

export default StartConvo;
