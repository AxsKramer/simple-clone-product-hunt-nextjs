import React, { useState, useEffect } from 'react';

const useValidationForm = (InputSubmit, validate, fn) => {

  const [values, setValues] = useState(InputSubmit);
  const [errors, setErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if(submitForm){
      const noErrors = Object.keys(errors).length === 0;
      if(noErrors){
        fn();
      }
      setSubmitForm(false);
    }
  },[errors]);

  const handleChange = e => setValues({...values, [e.target.name]: e.target.value});

  const handleSubmit = e => {
    e.preventDefault();
    const errorValidation = validate(values);
    setErrors(errorValidation);
    setSubmitForm(true);
  }

  const handleBlur = () => {
    const errorValidation = validate(values);
    setErrors(errorValidation);
  }

  return {
    values,
    errors,
    submitForm,
    handleChange,
    handleSubmit,
    handleBlur
  }

}

export default useValidationForm;