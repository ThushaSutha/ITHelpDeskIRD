import { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Typography } from '@material-tailwind/react';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; // Import both EyeIcon and EyeSlashIcon

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  errorMessage,
  onBlur,
  maxLength = 255,
  required = false,
  pattern,
  minLength,
  disabled = false,
}) => {
  const [touched, setTouched] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleBlur = (e) => {
    setTouched(true);
    if (onBlur) onBlur(e);

    // Validation logic
    if (required && !value) {
      setValidationError("This field is required.");
    } else if (pattern && !new RegExp(pattern).test(value)) {
      setValidationError(`Please enter a valid ${label}.`);
    } else if (minLength && value && value.length < minLength) {
      setValidationError(`Minimum length is ${minLength} characters.`);
    } else {
      setValidationError("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the visibility state
  };

  return (
    <div>
      <Typography variant="h6" color="blue-gray" className="mb-3">
        {label} {required && <span className="text-red-600">*</span>}
      </Typography>
      <div className="relative">
        <Input
          name={name}
          type={showPassword && type === "password" ? "text" : type} // Change input type dynamically
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled ? true : undefined}
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {/* Toggle between EyeIcon and EyeSlashIcon */}
            {showPassword ? (
              <EyeIcon className="h-6 w-6 text-gray-500" />
            ) : (
              <EyeSlashIcon className="h-6 w-6 text-gray-500" />
            )}
          </button>
        )}
      </div>
      {validationError && touched && (
        <Typography className="text-xs font-normal text-red-500">
          {validationError}
        </Typography>
      )}
      {errorMessage && !validationError && (
        <Typography className="text-xs font-normal text-red-500">
          {errorMessage}
        </Typography>
      )}

      {/* Display password requirements only if it's a password field */}
      {type === "password" && (
        <div className="mt-2 text-xs text-gray-500">
          <Typography variant="small">
            Password must contain:
            <ul className="list-disc ml-5">
              <li>At least 8 characters</li>
              <li>One uppercase letter (A-Z)</li>
              <li>One lowercase letter (a-z)</li>
              <li>One number (0-9)</li>
              <li>One special character (@, $, !, %, *, ?, &, etc.)</li>
            </ul>
          </Typography>
        </div>
      )}
    </div>
  );
};

// Prop validation with PropTypes
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
  onBlur: PropTypes.func,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  pattern: PropTypes.string,
  minLength: PropTypes.number,
};

export default InputField;
