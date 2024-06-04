import { useMediaQuery } from 'react-responsive';
import Header from '../../components/Header';

function LiveCam() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
    {isMobile ? '' : <Header/>}
    <section className="w-full">
       <div></div>
       <div></div>
    </section>
    </>
  )
}

export default LiveCam