import { useState } from 'react';
import { Select, Option, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types'; // Import PropTypes for validation

const SelectField = ({ label, value, onChange, options, required, errorMessage }) => {
  const [validationError, setValidationError] = useState('');

  // Handle blur to validate the field
  const handleBlur = () => {
    if (required && !value) {
      setValidationError(`Please select a ${label}`);
    } else {
      setValidationError('');
    }
  };

  return (
    <div className="relative">
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        {label} <span className="text-red-600"> *</span>
      </Typography>
      <Select
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        className={`w-full border rounded-md p-2 mt-2 ${validationError ? 'border-red-500' : 'border-gray-300'}`}
      >
        <Option value="">Select {label}</Option>
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>

      {/* Error message inside the SelectField component */}
      {(validationError || errorMessage) && (
        <Typography className="text-xs text-red-500 mt-2 absolute bottom-[-20px] left-0">
          {validationError || errorMessage}
        </Typography>
      )}
    </div>
  );
};

// PropTypes validation for the component's props
SelectField.propTypes = {
  label: PropTypes.string.isRequired, // Label is required and should be a string
  value: PropTypes.string.isRequired, // Value should be a string and is required
  onChange: PropTypes.func.isRequired, // onChange should be a function and is required
  options: PropTypes.arrayOf(PropTypes.string).isRequired, // Options should be an array of strings
  required: PropTypes.bool, // required is a boolean, not required by default
  errorMessage: PropTypes.string, // errorMessage should be a string, not required
};

// Default props in case any prop is not provided
SelectField.defaultProps = {
  required: false, // default is false if not provided
  errorMessage: '', // default is empty string if not provided
};

export default SelectField;
