import { useState, useEffect } from "react";

function ToggleBtn({ initialToggle = true }) {
  const [toggle, setToggle] = useState(initialToggle);

  useEffect(() => {
    setToggle(initialToggle);
  }, [initialToggle]);

  const toggleMode = () => {
    setToggle(prevToggle => !prevToggle);
  };

  return (
    <div onClick={toggleMode} className="relative bg-color-lightGrey rounded-xl cursor-pointer w-8 h-2 transition-all duration-200 ease-in-out flex items-center">
      <div className={`absolute w-4 h-4 transform transition-transform ${toggle ? 'translate-x-4 bg-color-pink' : 'translate-x-0 bg-color-3'} rounded-full`} />
    </div>
  );
}

export default ToggleBtn;
