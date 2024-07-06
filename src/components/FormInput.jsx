// FormInput.js
import {useState} from 'react';

function FormInput({ name, type, placeholder, value, onChange, error, className }) {
  // const [formInput, setFormInput] = useState("");
  const [formError, setFormError] = useState("");
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormInput(value);

    
  // };
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        className={ className || `text-color-black     border-2 border-color-lightGrey text-[0.8rem] w-[100%] outline-none rounded px-4 py-1`}
      required/>
      {error && <p className="text-color-red text-[0.7rem]">{error}</p>}
      {formError && <p className="text-color-red text-[0.7rem]">{formError}</p>}
    </div>
  );
}

export default FormInput;
