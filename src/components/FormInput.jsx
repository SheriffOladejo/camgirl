// FormInput.js
import {useState} from 'react';

function FormInput({ name, type, placeholder, value, onChange, error }) {
  const [formInput, setFormInput] = useState("");
  const [formError, setFormError] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput(value);

    
  };
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="text-color-black placeholder:text-color-lightGrey border-2 border-color-lightGrey placeholder:text-[0.8rem] w-[100%] outline-none rounded px-4 py-1"
      />
      {error && <p className="text-color-red text-[0.7rem]">{error}</p>}
      {formError && <p className="text-color-red text-[0.7rem]">{formError}</p>}
    </div>
  );
}

export default FormInput;
