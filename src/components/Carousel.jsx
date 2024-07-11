import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import ProfileSuggestion from './ProfileSuggestion'
// import { fauxUsers } from '.';
import React, { useRef } from "react";
function Carousel({text, children, className}) {

  const sliderRef = useRef();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
 
  const handleSlide = (direction) => {
    if (direction === 'left') {
      sliderRef.current.slickPrev();
    } else {
      sliderRef.current.slickNext();
    }
  };

  return (



    <>
      <div className={className && ` bg-color-white w-full shadow  max-w-[1100px] p-3 pt-4 pb-8 space-y-2 rounded-lg`}>
        <div className='flex justify-between items-center '>
          <p className='font-semibold text-[0.8rem]'>{text}</p>
          <div className='flex items-center bg-color-lighterGrey rounded-full  w-90 px-2 py-1.5'>
            <button onClick={()=> handleSlide("left")} >
              <img src="../icons/arrow-left.png" alt="left click" className='w-5 h-5' />
            </button>
            <button onClick={()=> handleSlide("right")}  className='pl-2'>
              <img src="../icons/arrow-right.png" alt="right click" className='w-5 h-5' />
            </button>

          </div>
        </div>
        <Slider {...settings} ref={sliderRef}>
          {children}
      
     </Slider>
      
         
      </div>
    
      </>
  )
}


export default Carousel;
