
import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

  // handle form submission event
  export const handleSubmit = (e) => {
    e.preventDefault();
    //  perform validation
    const newErrors = {};
    if (!formData.email.trim()) {
      setErrors(newErrors.email = 'Email is required')
    }
    if (!formData.password.trim()) {
      setErrors(newErrors.password = 'Password is required')
    }

    if(Object.keys(newErrors).length===0){
      // form submtted 
    }
  }
export const FormProvider = ({ children }) => {
  const [errors, setErrors] = useState({});
  // initialize state variables for form input and errors
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  // handle input change events
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // reset form data
  const resetFormData = () => {
    setFormData({});
  };

  return (
    <FormContext.Provider value={{ formData, handleInputChange, resetFormData, handleSubmit, errors }}>
      {children}
    </FormContext.Provider>
  );
};
