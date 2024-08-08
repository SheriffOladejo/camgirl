import Header from '../components/Header'
import LeftBar from '../components/LeftBar'
import { useMediaQuery } from 'react-responsive';

function Dashboard() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <section className="w-[100%] ">
      {isMobile ? '' : <Header />}

      <div className="flex w-full pb-40 md:pb-20 md:bg-color-lightGrey md:space-x-4 md:px-10">
        <LeftBar className={` w-[25%]`} />
        <div className='w-[100%] md:w-[75%] px-6  mt-10'>
          <div className='flex items-center  bg-color-white rounded'>
            <img src="../src/assets/icons/arrow-left.png" alt="back" onClick={() => window.history.back()} className='w-7 h-7 md:hidden' />
            <h1 className=' py-4 md:py-2 pl-3 font-bold text-[1.5rem] md:text-[1.3rem]'>Dashboard</h1>
          </div>

          <div className='flex flex-col md:space-x-4 w-full md:mt-8  md:flex-row '>
            <div className='py-4  bg-color-white rounded md:px-6 md:w-[50%]'>
              <h2 className='font-bold mb-4 text-[1.5rem] md:text-[1.1rem]'>Quick Actions</h2>
              <div className='md:mt-6'>
                <h4 className='font-semibold mb-4 md:mb-2 text-[1.3rem] md:text-[1rem]'>Total Balance</h4>
                <p className='text-color-grey mb-4  md:mb-2  text-[1.2rem] md:text-[0.8rem]'>₦100,000.00</p>
                <div className='flex space-x-8 md:space-x-4 items-center w-full justify-start'>
                  <button className='py-3 px-5 md:py-2 md:px-6 bg-color-pink flex rounded shadow items-center space-x-4 md:space-x-2'>
                    <img src="../src/assets/icons/receive.png" alt="receive" className='w-6 h-6 md:w-4 md:h-4' />
                    <p className='text-[16px] md:text-[12px] text-color-white'>Deposit</p>
                  </button>
                  <button className='py-3 px-5 md:py-2 md:px-4 bg-color-pink flex rounded shadow items-center space-x-4 md:space-x-2'>
                    <img src="../src/assets/icons/withdraw.png" alt="withdraw" className='w-6 h-6 md:w-4 md:h-4' />
                    <p className='text-[16px] md:text-[12px] text-color-white'>Withdraw</p>
                  </button>
                </div>
                <div className='mt-8 space-y-4 md:space-y-2'>
                  <h4 className='font-semibold mb-4 md:mb-0 text-[1.3rem] md:text-[1rem]'>Tokens Balance</h4>
                  <p className='text-color-grey mb-4  md:mb-2  text-[1.2rem] md:text-[0.8rem]'>100</p>
                  <button className='border border-color-pink flex space-x-4 py-3 px-4 md:py-2  rounded shadow items-center'>
                    <img src="../src/assets/icons/buy-token.png" alt="token" className='w-6 h-6 md:w-4 md:h-4' />
                    <p className='text-color-pink text-[16px] md:text-[12px] font-semibold'>Buy Tokens</p>
                  </button>
                </div>

              </div>
            </div>
            <div className='py-4 rounded px-0 bg-color-white mt-16 md:mt-0 md:px-6 md:w-[50%]'>
              <h4 className='font-semibold text-[1.5rem] mb-6 md:text-[1.1rem]' >Cards details</h4>
              <div className='flex flex-col w-full md:flex-row space-y-2 space-x-0 md:space-y-0 md:space-x-2'>
                <img src="../src/assets/icons/credit-card.png" alt="credit card" className='md:w-[90%] md:h-[200px]' />
                <div className='bg-color-lightGrey text-center rounded-xl md:rounded py-4 flex justify-center md:items-center w-full md:w-[10%]'><img src="../src/assets/icons/plus-black.png" alt="" className='w-6 h-6 md:w-4 md:h-4' /></div>
              </div>
              <a className='hidden py-6 font-semibold text-right text-color-pink  md:flex'>View All Cards</a>

            </div>
          </div>
          <div className='mt-10 bg-color-white md:p-6 rounded'>
            <h2 className='text-[1.4rem] font-bold md:text-[1.2rem]'>Transaction history</h2>
            <div>
              <table className='w-full mt-10 border-b border-color-lightGrey'>
                <tr className=' border-b border-color-lightGrey'>
                  <th className='hidden p-2 text-[0.9rem] md:flex '>Date</th>
                  <th className='text-[0.9rem] text-left border-x border-color-lightGrey px-2 '>Transaction</th>
                  <th className='text-[0.9rem] border-x border-color-lightGrey'>Invoice</th>
                  <th className='text-[0.9rem] border-x border-color-lightGrey'>Amount</th>
                  <th className='hidden text-[0.9rem] md:flex pl-2'>Status</th>
                </tr>
                <tr>
                  <td className='hidden text-[0.8rem] text-color-grey font-medium md:flex  py-8 '>05/09/2023
                  </td>
                  <td className='text-[0.8rem] text-color-grey font-medium  border-x border-color-lightGrey px-2'>Basic
                  </td>
                  <td className='border-x border-color-lightGrey  '><img src="../src/assets/icons/pdf.png" alt="" className='mx-auto' />
                  </td>
                  <td className='border-x border-color-lightGrey text-center text-[0.8rem] text-color-grey font-medium'>$500
                  </td>
                  <td className='hidden md:flex md:items-center text-[0.8rem] text-color-grey font-medium pl-2 '>
                    <img src="../src/assets/icons/income.png" alt="" className='mr-2'/>income
                  </td>
                </tr>

                <tr>
                  <td className='hidden md:flex text-[0.8rem] text-color-grey font-medium text-center py-8'>05/09/2023</td>
                  <td className='text-[0.8rem] text-color-grey font-medium  border-x border-color-lightGrey px-2'>new subscription for content</td>
                  <td className='border-x border-color-lightGrey'><img src="../src/assets/icons/pdf.png" alt="" className='mx-auto' /></td>
                  <td className='border-x border-color-lightGrey text-center text-[0.8rem] text-color-grey font-medium'>$500</td>
                  <td className='hidden md:flex md:items-center text-[0.8rem] text-color-grey font-medium pl-2 '><img src="../src/assets/icons/income.png" alt="" className='mr-2'/>income</td>
                </tr>
              </table>
              <div className='flex w-full justify-between mt-4'>
                <div className='flex items-center text-[0.8rem] text-color-grey font-medium '><img src="../src/assets/icons/arrow-left.png" alt="" className='w-4 h-4 mr-2' />Previous</div>
                <div className='space-x-3'>
                  <span className='rounded text-color-grey text-[0.8rem] active:bg-color-3 active:text-color-pink cursor-pointer'>1</span>
                  <span className='rounded text-[0.8rem] text-color-grey cursor-pointer active:bg-color-3 active:text-color-pink'>2</span>
                  <span className='rounded text-[0.8rem] text-color-grey active:bg-color-3 active:text-color-pink cursor-pointer'>3</span>
                </div>
                <div className='flex items-center text-[0.8rem] text-color-grey font-medium '>Next<img src="../src/assets/icons/arrow-right.png" alt="" className='w-4 h-4 ml-2' /></div>
              </div>
            </div>
            <div></div>
          </div>
        </div>


      </div>
    </section>
  )
}

export default Dashboard