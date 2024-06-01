import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation, EffectCoverflow, HashNavigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Stories() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const isLargeScreen = screenWidth >= 780;
    swiperRef.current = new Swiper('.swiper', {
      modules: [Navigation,hashNavigation, isLargeScreen && EffectCoverflow].filter(Boolean),

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
          slidesPerView: 3,
          spaceBetween: 20,
          effect: 'coverflow',
          coverflowEffect: {
            rotate: 50,
            stretch: 100,
            depth: 400,
            modifier: 1,
            slideShadows: true,
            scale: 1.5
          },
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          effect: 'slide',
        },
      },
      centeredSlides: true,
      grabCursor: true,
      // speed: 300,
      // watchOverflow: true,
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


          // Access the middle slide
          const middleSlideIndex = Math.floor(slides.length / 2);
          const middleSlide = slides[middleSlideIndex];
          // Apply active-slide class to the middle slide
          middleSlide.classList.add('active-slide');
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

      //       appendSlide('<div class="swiper-slide">Slide 10"</div>')

      // appendSlide([
      //  '<div class="swiper-slide">Slide 10"</div>',
      //  '<div class="swiper-slide">Slide 11"</div>'
      // ]);
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
      <div className="swiper md:top-10 h-full w-full md:max-h-[485.4px] max-w-[755px] mx-auto justify-center">
        <div className="swiper-wrapper h-full">

          <div className="swiper-slide bg-color-red " data-hash="username/userid"></div>
          <div className="swiper-slide bg-color-pink "></div>
          <div className="swiper-slide bg-color-green "></div>
          <div className="swiper-slide bg-color-blue"></div>
          <div className="swiper-slide bg-color-grey ">
            <div>
              <div className='cursor-pointer'>
                <div></div>
                <img src="" alt="" className='w-full h-full object-cover overflow-clip' />
                {/* users info */}
                <div></div>

              </div>
            </div>
          </div>
          <div className="swiper-slide bg-color-black">
            <button className="custom-button-prev " onClick={handlePrev}>
              <img src="../src/assets/icons/left-chevron.png" alt="Previous" className='hidden md:flex' />
            </button>
            {/* post current  */}
            <div className='swiper-zoom-container'></div>
            {/* subsequent posts */}
            <div></div>
            {/* header */}
            <header>
              {/* progress in number */}
              <div></div>
              {/* profile deets */}
              <div>
                {/* name and verified and time */}
                <div></div>
                {/* play/pause and settings */}
                <div></div>
              </div>

            </header>
            <button className="custom-button-prev " onClick={handlePrev}>
              <img src="../src/assets/icons/left-chevron.png" alt="Previous" className='hidden md:flex' />
            </button>
            {/* replies and likes and share */}
            <div>
              {/* reply */}
              <div></div>
              {/* like and share */}
              <div></div>
            </div>
          </div>
          <div className="swiper-slide bg-color-4"></div>
          <div className="swiper-slide bg-color-blue"></div>
          <div className="swiper-slide bg-color-7"></div>


          {/* Add more slides as needed */}
        </div>

        <div className="custom-button-prev " onClick={handlePrev}>
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