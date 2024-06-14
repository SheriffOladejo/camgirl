import LeftBar from '../components/LeftBar';
import Header from '../components/Header';
import MessagesList from '../components/MessagesList';
import StartConvo from '../components/StartConvo';

function Messages() {
  return (
    <section className='w-full'>
      <Header />
      <div className='w-full md:flex md:px-16 h-[100vh] bg-color-lightGrey space-x-4'>
        <LeftBar className='md:w-[25%] hidden md:flex' />
        <MessagesList className='md:w-[30%] hidden md:block' />
        <StartConvo className='w-full md:w-[45%]' />
      </div>
    </section>
  );
}

export default Messages;
