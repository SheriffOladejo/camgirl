import { useState, useEffect } from "react";
import gsap from "gsap";

function TipModal({ isOpen, cancel, currency, currency_symbol }) {
  const [amount, setAmount] = useState('');
  const [anonymousTip, setAnonymousTip] = useState(false);
  const templateAmounts = ["500", "1000", "5000", "10000", "20000"];

  const selectAmount = (amount) => {
    setAmount(amount);
  };

  const changeIsAnonymousTip = () => {
    setAnonymousTip(!anonymousTip);
  };

  const handleAmountInput = (event) => {
    const regex = /^[0-9]*$/;
    const value = event.target.value.replace(/[^0-9]/g, '');

    if (regex.test(value) || value === '') {
      setAmount(value);
    }
  };

  const tip = () => {
    // Your tip logic here
  };

  useEffect(() => {
    const modal = document.querySelector(".tip-modal");

    if (isOpen) {
      gsap.to(modal, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.inOut" });
    } else {
      gsap.to(modal, { opacity: 0, scale: 0, y: -50, duration: 1, ease: "power3.inOut" });
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center tip-modal ${isOpen ? 'block' : 'hidden'}`}
      style={{ backdropFilter: isOpen ? 'blur(6px)' : 'none' }}
    >
      <div
        className={`space-y-4 p-6 bg-color-white rounded-md shadow-lg`}
      >
        <h4 className="font-bold text-[16px] text-start">Send Tip</h4>

        <input
          type="text"
          name="tip"
          id="tip"
          value={`$${amount}`}
          onChange={handleAmountInput}
          placeholder="$ Tip amount"
          className="w-full outline-none border border-color-lightGrey shadow placeholder:text-color-7 text-[16px] py-2 pl-4 rounded-xl font-medium mb-2"
        />

        <p className="text-color-grey text-[12px] capitalize mb-4">Minimum of $500.00</p>

        <div className="flex justify-between items-center space-x-4 mb-4">
          {templateAmounts.map((amount, index) => (
            <button
              key={index}
              onClick={() => selectAmount(amount)}
              className="rounded-[50%] bg-color-lighterGrey text-color-black p-2 text-[14px] font-medium"
            >
              ${amount}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            name="anonymousTip"
            id="anonymousTip"
            checked={anonymousTip}
            onChange={changeIsAnonymousTip}
            className="appearance-none h-4 w-4 border border-color-grey rounded-full checked:bg-color-pink checked:border-none focus:outline-none cursor-pointer"
          />
          <label htmlFor="anonymousTip" className="text-color-grey text-[12px]">Anonymous Tip</label>
        </div>

        <div className="flex justify-around items-center w-full">
          <button onClick={cancel} className="outline-none border-none font-semibold text-color-grey w-[50%]">Cancel</button>
          <button onClick={tip} className="flex items-center justify-center bg-color-pink text-color-white w-[50%] space-x-2 rounded-md font-semibold px-6 py-2">
            <img src="../icons/tip.png" alt="" />
            <span>Tip</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TipModal;
