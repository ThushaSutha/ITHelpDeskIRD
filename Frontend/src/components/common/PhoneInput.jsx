import { useState } from 'react';
import { Input, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';

const PhoneInput = ({ name, value, onChange, onBlur, errorMessage }) => {
  const [prevInputLength, setPrevInputLength] = useState(0); // Track the previous input length
  const [touched, setTouched] = useState(false); // Track if the field has been touched
  const [validationError, setValidationError] = useState(""); // To store validation error message

  const formatPhoneNumber = (input) => {
    let cleaned = input.replace(/\D+/g, "");

    if (cleaned.length >= 3) {
      if (/^\d/.test(cleaned)) {
        cleaned = `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
      } else if (cleaned.startsWith("0")) {
        cleaned = `${cleaned.slice(0, 1)} ${cleaned.slice(1, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
      }
    }

    return cleaned;
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;

    // Check if deleting
    if (input.length < prevInputLength) {
      onChange(e); // Allow delete without formatting
    } else {
      const formattedPhone = formatPhoneNumber(input);
      onChange({ target: { name, value: formattedPhone } }); // Pass formattedPhone directly
    }

    setPrevInputLength(input.length);
  };

  const handleBlur = () => {
    setTouched(true);

    const phonePattern = /^\+\d{2}\s\d{2}\s\d{3}\s\d{4}$/;
    if (value === "") {
      setValidationError("This field is required.");
    } else if (!phonePattern.test(value)) {
      setValidationError("Please enter a valid phone number, e.g., +94 76 123 4567");
    } else {
      setValidationError("");
    }

    if (onBlur) {
      onBlur();
    }
  };

  return (
    <div>
      <Typography variant="h6" color="blue-gray" className="mb-3">
        Phone <span className="text-red-600"> *</span>
      </Typography>
      <Input
        name={name}
        value={value}
        onChange={handlePhoneChange}
        onBlur={handleBlur}
        maxLength={15}
        type="tel"
        
        placeholder="e.g., +94 76 123 4567"
        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      {(validationError || errorMessage) && touched && (
        <Typography className="text-xs font-normal text-red-500">
          {validationError || errorMessage}
        </Typography>
      )}
    </div>
  );
};

PhoneInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default PhoneInput;
