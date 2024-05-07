import LeftBar from '../components/LeftBar'
import Header from '../components/Header'
import MessagesList from '../components/MessagesList'
import StartConvo from '../components/StartConvo'
function Messages() {
 
  return (
    <section className='w-[100%] '>
      <Header/>
    <div className='grid gap-4 grid-cols-2 md:grid-cols-3 md:px-16 h-[100vh] bg-color-lightGrey '>
      <LeftBar  className={`col-span-1 w-[80%]`}  />
    <MessagesList className={`col-span-1`}/>
    <StartConvo className={`col-span-1`}/>
    </div>
    </section>
  )
}

export default Messages