import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-tailwind/react';

const Select2LikeComponent = ({ label, options, value, onSelectChange, multiSelect, required }) => {
  const [isOpen, setIsOpen] = useState(false); // Track if dropdown is open or closed
  const dropdownRef = useRef(null); // Ref to track dropdown element

  const handleOptionClick = (newValue) => {
    onSelectChange(newValue); // Pass the new value to the parent component
    setIsOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // Toggle open/close state of dropdown
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Typography variant="h6" color="blue-gray" className="mb-3">
        {label} {required && <span className="text-red-600">*</span>}
      </Typography>
      <div
        onClick={toggleDropdown} // Toggle dropdown open/close on click
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer flex items-center justify-between"
      >
        <span>{value || `Select ${label}`}</span>
        <div
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {/* Arrow icon, rotate when dropdown is open */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <ul className="absolute mt-2 bg-white border border-gray-300 rounded-lg w-full z-10 max-h-60 overflow-auto">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                value === option ? 'bg-gray-200 font-semibold text-black-600' : ''
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// PropTypes validation
Select2LikeComponent.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onSelectChange: PropTypes.func.isRequired,
  multiSelect: PropTypes.bool,
  required: PropTypes.bool,
};

export default Select2LikeComponent;
