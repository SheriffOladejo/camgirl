import { useState, useContext } from "react";
import Slider from "react-slick";
import { stories } from ".";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from "../context/authContext";


function Stories() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { currentUser } = useContext(AuthContext);

  const { profile_picture } = currentUser || {};

  const profilePic = profile_picture || null;
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
        {/* First story item add click event to create new story */}
        <div className="flex-shrink-0 relative">
          <div className="p-[1.5px] w-[50px] h-[50px] bg-gradient-to-t from-color-pink via-color-3 to-color-pink rounded-full flex items-center justify-center">
            {profilePic ? (
              <img src={profilePic} alt="Profile Pic" className="w-full h-full rounded-full" />
            ) : (
              <img src="../background/bgimg.jpg" alt="User story" className="rounded-full w-full h-full" />
            )}

            <img src="../icons/add-circle.png" alt="add story" className="rounded-full w-[15px] h-[16px] absolute bottom-0 right-0" />
          </div>

        </div>
        {/* Slider container */}
        <div className="flex-1 overflow-hidden space-x-2">
          <Slider {...settings}>
            {stories.map((story, index) => (
              <div key={index} className="flex items-center justify-center ">
                <a href="#" className="p-[1.5px] w-[50px] h-[50px] bg-gradient-to-t from-color-pink via-color-3 to-color-pink rounded-full flex items-center justify-center">
                  <img className="rounded-full w-full h-full" src={story.img} alt={story.name} />
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
      <img src="../icons/arrow-right.png" alt="right click" className='w-5 h-5' />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick, currentSlide } = props;
  return (
    currentSlide > 0 && (
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-color-lighterGrey/70 rounded-full p-1" onClick={onClick}>
        <img src="../icons/arrow-left.png" alt="left click" className='w-5 h-5' />
      </div>
    )
  );
}

export default Stories;
