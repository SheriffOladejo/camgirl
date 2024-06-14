import { useEffect, useRef } from 'react';
import {Swiper} from 'swiper/bundle';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Navigation, EffectCoverflow, HashNavigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

function Stories() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const isLargeScreen = screenWidth >= 780;
    swiperRef.current = new Swiper('.swiper', {
      modules: [Navigation, HashNavigation, isLargeScreen && EffectCoverflow].filter(Boolean),
      direction: 'horizontal',
      loop: true,
      navigation: {
        nextEl: '.custom-button-next',
        prevEl: '.custom-button-prev',
      },
      autoplay: {
        delay: 5000,
      },
      hashNavigation: true,
      breakpoints: {
        780: {
          
          effect: 'coverflow',
          centeredSlides: true,
          slidesPerView: 3,
          spaceBetween: 10,
          coverflowEffect: {
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
            scale: 1.2
          },
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          effect: 'slide',
        },
      },
     
      grabCursor: true,
      on: {
        slideChange: function () {
          const slides = document.querySelectorAll('.swiper-slide');
          slides.forEach((slide, index) => {
            if (index === this.realIndex) {
              slide.classList.add('active-slide');
            } else {
              slide.classList.remove('active-slide');
            }
          });

          // const middleSlideIndex = Math.floor(slides.length / 2);
          // const middleSlide = slides[middleSlideIndex];
          // if (middleSlide) middleSlide.classList.add('active-slide');
        },
        init: function () {
          const slides = document.querySelectorAll('.swiper-slide');
          slides.forEach((slide, index) => {
            if (index === this.realIndex) {
              slide.classList.add('active-slide');
            }
          });
        },
      },
    });

    return () => {
      if (swiperRef.current) swiperRef.current.destroy();
    };
  }, []);

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  return (
    <section className="h-screen w-full bg-color-black/95 backdrop-blur-xl">
      <div className="swiper md:top-10 h-full w-full md:max-h-[485.4px]  mx-auto justify-center">
        <div className="swiper-wrapper h-full">
          <div className="swiper-slide bg-color-red" data-hash="username/userid"></div>
          <div className="swiper-slide bg-color-pink"></div>
          <div className="swiper-slide bg-color-green"></div>
          <div className="swiper-slide bg-color-blue"></div>
          <div className="swiper-slide bg-color-grey">
            <div className='cursor-pointer'>
              <img src="" alt="" className='w-full h-full object-cover overflow-clip' />
            </div>
          </div>
          <div className="swiper-slide bg-color-black">
            <button className="custom-button-prev" onClick={handlePrev}>
              <img src="../src/assets/icons/left-chevron.png" alt="Previous" className='hidden md:flex' />
            </button>
            <div className='swiper-zoom-container'></div>
            <header>
              <div></div>
              <div>
                <div></div>
                <div></div>
              </div>
            </header>
            <button className="custom-button-prev" onClick={handlePrev}>
              <img src="../src/assets/icons/left-chevron.png" alt="Previous" className='hidden md:flex' />
            </button>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="swiper-slide bg-color-4"></div>
          <div className="swiper-slide bg-color-blue"></div>
          <div className="swiper-slide bg-color-7"></div>
        </div>
        <div className="custom-button-prev" onClick={handlePrev}>
          <img src="../src/assets/icons/left-chevron.png" alt="Previous" className='hidden md:flex' />
        </div>
        <div className="custom-button-next" onClick={handleNext}>
          <img src="../src/assets/icons/right-chevron.png" alt="Next" className='hidden md:flex' />
        </div>
      </div>
    </section>
  );
}

export default Stories;
