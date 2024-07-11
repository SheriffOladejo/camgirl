import { useState } from "react";

function TipModal({isOpen,  cancel, currency, currency_symbol }) {

  const [amount, setAmount] = useState('');
  const [anonymousTip, setAnonymousTip] = useState(false);
  const templateAmounts = ["500", "1000", "5000", "10000", "20000"];
  const selectAmount = (amount) => {
    setAmount(amount);
  }
  
  const changeIsAnonymousTip = () => {
    setAnonymousTip(!anonymousTip);
}
  const handleAmountInput = (event) => {
    const regex = /^[0-9]*$/;
    const value = event.target.value;

    if (regex.test(value)) {
      setAmount(value);
    }

    else if (value === '') {
      setAmount(value);
    }
  };

 
  const tip = () => {

  }
 
  return (
    <div className={`bg-color-white fixed z-50 w-[60%] flex justify-center items-center transform transition-all duration-500 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
      <div className='p-8 rounded-lg  '>
        <h4 className='font-bold text-[16px]'>Send Tip</h4>

        <input
          type="number"
          name="tip"
          id="tip"
          value={amount}
          onChange={handleAmountInput}
          placeholder={'' + currency_symbol + ' Tip amount'} className='w-full outline-none border border-color-grey shadow placeholder:text-color-grey text-[12px]' />

        <p className='text-color-black text-[10px]'>minimum of {currency_symbol}500.00</p>

        <div className='flex justify-between items-center'>
          {templateAmounts.map((amount, index) => (
            <button key={index} onClick={() => { selectAmount(amount) }} className='rounded-[50%] bg-color-7 text-color-black p-2'>{currency_symbol}{amount}</button>
          ))}

        </div>
        <div className='flex justify-start'>
          <input type="checkbox" name="anonymousTip" id="anonymousTip" checked={anonymousTip} onChange={changeIsAnonymousTip} className='' />
          <label htmlFor="anonymousTip" className='text-color-grey text-[12px]'>Anonymous Tip</label>
        </div>
        <div className='flex'>
          <button onClick={cancel} className='outline-none border-non'>Cancel</button>
          <button onClick={tip}><span><img src="../assets/icons/tip.png" alt="" /></span>Tip</button>
        </div>
      </div>
    </div>
  )
}

export default TipModal