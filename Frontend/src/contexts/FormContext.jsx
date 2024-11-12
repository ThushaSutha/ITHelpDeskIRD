import  { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes

// Create a context for the form data
const FormContext = createContext();

// Custom hook to use the FormContext
export const useForm = () => {
  return useContext(FormContext);
};

// FormContext Provider component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    contact: '',
    ticket: '',
    location: '',
  });

  // Function to update form data
  const updateFormData = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Prop validation for the children prop
FormProvider.propTypes = {
  children: PropTypes.node.isRequired,  // Ensures children is a valid React node
};
