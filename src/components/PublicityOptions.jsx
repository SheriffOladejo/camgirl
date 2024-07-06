import React from 'react'

function PublicityOptions({ title, desc, image, handlePublicityOptionClick }) {
  const handleClick = () => {
    // Pass both the title and the image to the handlePublicityOptionClick function
    handlePublicityOptionClick({ title, image });
  };

  return (
    <div className='flex items-center h-auto w-auto m-0 p-0 space-y-4 space-x-2 z-40 bg-color-white cursor-pointer' onClick={ handleClick}>
      <div className='w-[30px] h-[30px] rounded-full bg-color-5 flex items-center justify-center mt-4'>
        <img src={image} alt={title}/>
      </div>

      <div className='ml-0'>
        <p className='text-[14px] font-bold font-inter text-color-black m-0 p-0'>{title}</p>
        <p className='text-[12px] font-medium font-inter text-color-7 m-0 p-0'>{desc}</p>
      </div>
    </div>
  )
}

export default PublicityOptions;