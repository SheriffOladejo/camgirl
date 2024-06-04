import { useMediaQuery } from 'react-responsive';
import MobileHeader from '../components/MobileHeader';
import Header from '../components/Header';
import ExplorePage from '../components/ExplorePage';
import LeftBar from '../components/LeftBar';

function Explore() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <section className="w-[100%] ">
        {isMobile ? <MobileHeader/> : <Header />}
        <div className="flex md:space-x-4 w-full md:px-10  overflow-y-visible md:bg-color-lightGrey ">
          <LeftBar className={` w-[20%]`} />
     
          <ExplorePage  className={` w-[80%]`} />
        
        </div>
      </section>
  )
}

export default Explore