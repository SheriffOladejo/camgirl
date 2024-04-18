import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  // initialize state variables for form input and errors
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordMatch, setPasswordMatch] = useState(true);

  // handle input change events
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // handle email validation
    if (name === 'email') {
      if (!isValidEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: 'Invalid email address',
        }));
      } else {
        // Clear the error if email is valid
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
      }
    }
  };

  // Validate form inputs
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate username
    if (formData.username.trim() === '') {
      newErrors.username = 'Username is required';
      valid = false;
    }

    // Validate email
    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    // Validate password
    if (formData.password.trim() === '') {
      newErrors.password = 'Password is required';
      valid = false;
    }

    // Validate confirmPassword
    if (formData.confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Confirm password is required';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      setPasswordMatch(false);
      valid = false;
    } else {
      setPasswordMatch(true);
    }

    // Update errors state
    setErrors(newErrors);

    return valid;
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit the form
      console.log('Form submitted:', formData);
    } else {
      console.log('Form validation failed');
    }
  };

  // email validation function
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };



  // reset form data
  const resetFormData = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setPasswordMatch(true);
  };

  return (
    <FormContext.Provider value={{ formData, handleInputChange, resetFormData, handleSubmit, errors, passwordMatch }}>
      {children}
    </FormContext.Provider>
  );
};
