import {useState} from "react";
import Slider from "react-slick";
import { stories } from ".";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Stories() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 8,
        },
      },
    ],
  };

  return (
    <section className="relative mb-8 md:px-4 md:w-full w-[94vw] px-4">
      <div className="flex items-center space-x-1">
        {/* First story item */}
        <div className="flex-shrink-0 relative">
          <div className="w-[54px] h-[54px] bg-gradient-to-t from-color-pink via-color-3 to-color-pink rounded-full flex items-center justify-center">
            <img src="../src/assets/background/bgimg.jpg" alt="User story" className="rounded-full w-[50px] h-[50px]" />
            <img src="../src/assets/icons/add-circle.png" alt="add story" className="rounded-full w-[15px] h-[16px] absolute bottom-0 right-0" />
          </div>
         
        </div>
        {/* Slider container */}
        <div className="flex-1 overflow-hidden">
          <Slider {...settings}>
            {stories.map((story, index) => (
              <div key={index} className="flex items-center justify-center">
                <a href="#" className="w-[54px] h-[54px] bg-gradient-to-t from-color-pink via-color-3 to-color-pink rounded-full flex items-center justify-center">
                  <img className="rounded-full w-[50px] h-[50px]" src={story.img} alt={story.name} />
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-color-lighterGrey/70 rounded-full p-1" onClick={onClick}>
      <img src="../src/assets/icons/arrow-right.png" alt="right click" className='w-5 h-5' />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick, currentSlide } = props;
  return (
    currentSlide > 0 && (
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-color-lighterGrey/70 rounded-full p-1" onClick={onClick}>
        <img src="../src/assets/icons/arrow-left.png" alt="left click" className='w-5 h-5' />
      </div>
    )
  );
}

export default Stories;
