import { stories } from "."


function Stories() {

  const handleSlide = (direction) => {
    const slider = document.getElementsByClassName('carousel-body')[0];
    direction === 'left' ? slider.scrollBy(-400, 0) : slider.scrollBy(400, 0)
  }

  return (
    <section className="flex space-x-2 overflow-x-hidden mb-8 relative md:px-4 md:w-full w-[94vw]">
      <div className='flex items-center justify-between '>
        <div className=" bg-color-lighterGrey/70 rounded-full p-1 cursor-pointer absolute " onClick={() => handleSlide('left')}  >
          <img src="../src/assets/icons/arrow-left.png" alt="left click" className='w-5 h-5' />
        </div>
        <div className=" cursor-pointer bg-color-lighterGrey/70 rounded-full p-1 absolute right-0" onClick={() => handleSlide('right')}  >
          <img src="../src/assets/icons/arrow-right.png" alt="right click" className='w-5 h-5' />
        </div>

      </div>
      {/* user story add */}
      <div className="w-[56px] h-[56px] bg-gradient-to-t from-color-pink via-color-3 to-color-pink  aspect-square rounded-[50%] flex items-center justify-center">
        <img src="../src/assets/background/bgimg.jpg" alt={stories.name} className=" rounded-[50%] w-[50px] h-[50px]" />
      </div>
      <ul className="overflow-x-scroll scroll-smooth flex space-x-2 carousel-body " >

        {stories.map((story, index) => (
          <li key={index} className="w-[56px] h-[56px] bg-gradient-to-t from-color-pink via-color-3 to-color-pink  aspect-square rounded-[50%] flex items-center justify-center  ">



            <img className=" rounded-[50%] w-[50px] h-[50px]" src={story.img} alt={story.name} load="lazy" />


          </li>

        ))}
      </ul>
    </section>
  )

}
export default Stories