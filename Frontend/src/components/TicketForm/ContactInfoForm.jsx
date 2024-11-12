import PropTypes from "prop-types"; // Import PropTypes for validation
import { useState } from "react";
// import { Input, Typography } from "@material-tailwind/react";
import InputField from "../common/InputField";
import PhoneInput from "../common/PhoneInput";


const ContactInfoForm = ({
  handleChange,
}) => {
  const [name, setName] = useState("");
  
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  // const [error, setError] = useState("");  

  // const handleErrorMessage = (message) => {
  //   setError(message);
  // };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    handleChange("name", newName);  
  };
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    handleChange("email", newEmail);  
  };
  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    handleChange("phone", newPhone);  
  };

  return (
    <>
      <div className="m-5">
        <div className="max-w-full bg-white shadow-lg shadow-gray-500 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl sm:text-xl font-semibold text-gray-700">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-6">
            <div className="flex-auto">
              {/* Name field */}
              <InputField
                label="Name"
                value={name}
                onChange={handleNameChange}
                placeholder="e.g., John Pol"
                type="text"
                required={true}
                minLength={5}
              />
            </div>

            <div className="flex-auto">
              {/* Email field */}
              <InputField
                label="Email"
                value={email}
                onChange={handleEmailChange}
                placeholder="e.g., example@email.com"
                type="email"
                required={true}
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" 
                minLength={5}
              />
            </div>
          </div>

          <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-6">
            <div className="flex-auto">
              {/* Phone field */}
              <PhoneInput
                value={phone}
                onChange={handlePhoneChange}
                onBlur={() => {}}
                // errorMessage={handleErrorMessage}
              />
            </div>

            <div className="flex-auto">
              {/* Designation field */}
              <InputField
                label="Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g., Software Engineer"
                type="text"
                required={true}
                minLength={5}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Prop validation with PropTypes
ContactInfoForm.propTypes = {

  handleChange: PropTypes.func.isRequired,
};



export default ContactInfoForm;
