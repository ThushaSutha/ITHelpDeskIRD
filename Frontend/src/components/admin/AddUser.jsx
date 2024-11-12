import React, { useState, useEffect } from "react";
import InputField from "../common/InputField";
import PhoneInput from "../common/PhoneInput";
import { Button, Input, Typography } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import Select2LikeComponent from "../common/Select2LikeComponent";

const AddUser = () => {
  const [uniqueID, setUniqueID] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedUserRole, setSelectedUserRole] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [passwordError, setPasswordError] = useState(""); // Error state for password mismatch

  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    email: "",
    userRole: "Normal User",
    phoneNumber: "",
    department: "",
    branch: "MCO",
    location: "Colombo-06",
    temporaryPassword: "",
    confirmPassword: "",
    passwordExpiry: {
      firstLogin: false,
      setExpiryDate: false,
    },
  });

  // Function to generate a 6-digit number from UUID
  function generate6DigitFromUUID() {
    const timestamp = Date.now();
    const sixDigitNumber = timestamp % 10000;
    return sixDigitNumber.toString().padStart(4, "0");
  }

  useEffect(() => {
    const id = generate6DigitFromUUID();
    setUniqueID(id);
    console.log("Generated Unique ID:", id);

    // Update employeeId once uniqueID is generated
    setFormData((prevData) => ({
      ...prevData,
      employeeId: prevData.fullName.split(" ")[0] + id,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
    // Validate password and confirm password match
    if (name === "confirmPassword") {
      if (value !== formData.temporaryPassword) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      passwordExpiry: {
        ...prevData.passwordExpiry,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.temporaryPassword !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return; // Prevent form submission if passwords do not match
    }
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-card rounded-lg shadow-md">
      {/* <h2 className="text-lg font-semibold mb-4">Add New User</h2> */}
 
      <div className=" mb-6 ">
          <Typography
            color="blue-gray"
            className="underline text-3xl text-black md:text-5xl"
          >
           Add New User
          </Typography>
          
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-6">
        <div className="flex-auto">
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g., John Pol"
            type="text"
            required={true}
          />
        </div>

        <div className="flex-auto">
          <PhoneInput
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={() => {}}
          />
        </div>

        <div className="flex-auto">
          <InputField
            label="Employee ID"
            name="employeeId"
            value={formData.fullName.split(" ")[0] + uniqueID}
            onChange={handleChange}
            type="text"
            disabled={true}
          />
        </div>

        <div className="flex-auto">
          <Select2LikeComponent
            label="Department"
            options={options}
            required={true}
            value={selectedDepartment}
            onSelectChange={(option) => {
              setSelectedDepartment(option);
              setFormData((prevData) => ({ ...prevData, department: option }));
            }}
          />
        </div>

        <div className="flex-auto">
          <InputField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g., example@email.com"
            type="email"
            required={true}
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            minLength={5}
          />
        </div>

        <div className="flex-auto">
          <Select2LikeComponent
            label="Branch"
            options={options}
            required={true}
            value={selectedBranch}
            onSelectChange={(option) => {
              setSelectedBranch(option);
              setFormData((prevData) => ({ ...prevData, branch: option }));
            }}
          />
        </div>

        <div className="flex-auto">
          <Select2LikeComponent
            label="User Role"
            options={options}
            required={true}
            value={selectedUserRole}
            onSelectChange={(option) => {
              setSelectedUserRole(option);
              setFormData((prevData) => ({ ...prevData, userRole: option }));
            }}
          />
        </div>

        <div className="flex-auto">
          <Select2LikeComponent
            label="Location"
            options={options}
            required={true}
            value={selectedLocation}
            onSelectChange={(option) => {
              setSelectedLocation(option);
              setFormData((prevData) => ({ ...prevData, location: option }));
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-6">
          <h1 className="text-lg font-semibold mt-5 mb-2">Account Settings</h1>
          <div className="flex-auto">
            <InputField
              label="Temporary Password"
              name="temporaryPassword"
              value={formData.temporaryPassword}
              onChange={handleChange}
              placeholder="e.g., **********"
              type="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              required={true}
            />
          </div>

          <div className="flex-auto">
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="e.g., **********"
              type="password"
              required={true}
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>} {/* Display error */}
          </div>



          <div className="mb-4">
        <span className="block mb-1">Password Expiry:</span>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="firstLogin"
            checked={formData.passwordExpiry.firstLogin}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Expiry in first login
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="setExpiryDate"
            checked={formData.passwordExpiry.setExpiryDate}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Set Expiry Date
        </label>
      </div>

        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-primary text-primary-foreground p-2 rounded"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-secondary text-secondary-foreground p-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddUser;
