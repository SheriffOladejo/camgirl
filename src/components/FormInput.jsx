// FormInput.js
import React from 'react';
import {  useFormContext } from '../contexts/FormContext';

const FormInput = ({ name, type, placeholder, className }) => {
  const { formData, handleInputChange, errors } = useFormContext();

  const handleChange = (e) => {
    handleInputChange(name, e.target.value);
  };

  return (
    
   <div>
    <input
     className={`${className}text-color-black placeholder:text-color-lightGrey border border-color-lightGrey placeholder:text-[0.8rem] w-[100%] outline-none rounded`}
      type={type}
      name={name}
      value={formData[name] || ''}
      onChange={handleChange}
      placeholder={placeholder}
    />
    {errors[name] && <div className="error">{errors.name}</div>}
    </div>
  
  );
};

export default FormInput;
