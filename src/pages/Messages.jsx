import LeftBar from '../components/LeftBar'
import Header from '../components/Header'
import MessagesList from '../components/MessagesList'
import StartConvo from '../components/StartConvo'
function Messages() {
 
  return (
    <>
      <Header/>
    <section className='grid grid-cols-2 md:grid-cols-3 md:px-16 h-[100vh] bg-color-lightGrey '>
      <LeftBar  className={`col-span-1 `} linkIndex={4} />
    <MessagesList className={`col-span-1`}/>
    <StartConvo className={`col-span-1`}/>
    </section>
    </>
  )
}

export default Messages