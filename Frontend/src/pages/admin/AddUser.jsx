import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputField from "../../components/common/InputField";
import PhoneInput from "../../components/common/PhoneInput";
import { Button, Input, Typography } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import Select2LikeComponent from "../../components/common/Select2LikeComponent";
import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import userService from "../../services/user.service";
import { useLocation} from 'react-router-dom';




const AddUser = ({isEditMode = false}) => {
  const location = useLocation();
  const userId = location.state?.userId;
  const [data,setData] = useState(null);

  const [uniqueID, setUniqueID] = useState(null);
  
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedUserRole, setSelectedUserRole] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [passwordError, setPasswordError] = useState(""); 
  const today = new Date().toISOString().split("T")[0];
  const role = ["Admin", "IT officer", "Staff"];
  const regions = ["Jaffna", "Colombo", "Galle"];
  const units = ["IT", "Accounts", "Network"];
  const status = ["Active", "Inactive"];

  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    email: "",
    userRole: "Staff",
    phoneNumber: "",
    region: "",
    unit: "",
    status: "",
    temporaryPassword: "",
    confirmPassword: "",
    passwordExpiry: {
      firstLogin: false,
      setExpiryDate: false,
      expiryDate: "",
    },
  });

  // Function to generate a 4-digit number from timestamp
  function generate6DigitFromUUID() {
    const timestamp = Date.now();
    const sixDigitNumber = timestamp % 10000;
    return sixDigitNumber.toString().padStart(4, "0");
  }

  // Function to generate a password
  const generatePassword = (length = 12) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };


  //fetch user data 
  const retrieveUser = async (id) => {
    try {
      const response = await userService.get(id);
      console.log("Fetched user data:", response.data.data);
      setData(response.data.data); // Store only the relevant data4
      setFormData({
        ...formData,
        fullName: response.data.data.name,
        email: response.data.data.email,
        phoneNumber: response.data.data.phone,
        userRole: response.data.data.role,
        region: response.data.data.region,
        unit: response.data.data.unit,
        status: response.data.data.status,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if(isEditMode){
      retrieveUser(userId);
    }else{
    const id = generate6DigitFromUUID();
    const password = generatePassword();
    setUniqueID(id);
    console.log("Generated Unique ID:", id);
    console.log("Generated Password:", password);
    

    

    // Update employeeId once uniqueID is generated
    setFormData((prevData) => ({
      ...prevData,
      employeeId: prevData.fullName.split(" ")[0] + id,
      temporaryPassword: password,
      confirmPassword: password
    }));
  }
  }, [isEditMode,userId]);



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
        firstLogin: name === "firstLogin" ? checked : false,
        setExpiryDate: name === "setExpiryDate" ? checked : false,
      },
    }));
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      passwordExpiry: {
        ...prevData.passwordExpiry,
        expiryDate: value,
      },
    }));
  };

  // To check if the form is valid (all required fields are filled)
  const isFormValid = () => {
    return (
      // formData.fullName &&
      formData.email &&
      formData.phoneNumber &&
      formData.region &&
      formData.unit
    );
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (formData.temporaryPassword !== formData.confirmPassword) {
  //     setPasswordError("Passwords do not match");
  //     return;
  //   }

  //   console.log(formData);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.temporaryPassword !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    const userPayload = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phoneNumber,
      role: formData.userRole,
      unit: formData.unit,
      region: formData.region,
      status: formData.status,
      password: formData.temporaryPassword,
      passwordExpiry: formData.passwordExpiry,
    };

    if (isEditMode) {
      try {
        // await userService.update(userId, userPayload);
        console.log("User updated successfully!",userPayload);
        // history.push("/users"); // Redirect after successful update
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      try {
        // await userService.create(userPayload);
        console.log("User created successfully!",userPayload);
        // history.push("/users"); // Redirect after successful creation
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-card rounded-lg shadow-md">
      {/* <h2 className="text-lg font-semibold mb-4">Add New User</h2> */}

      <div className=" mb-6 ">
        <Typography
          color="blue-gray"
          className="underline text-3xl text-black md:text-5xl"
        >
          {isEditMode ? "Update User" : "Add New User"} 
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-6">
      <div className="flex-auto">
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g., John Doe"
            type="text"
            required
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
            label="Region"
            options={regions}
            required={true}
            value={selectedDepartment}
            onSelectChange={(option) => {
              setSelectedDepartment(option);
              setFormData((prevData) => ({ ...prevData, region: option }));
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
            label="Unit"
            options={units}
            required={true}
            value={selectedBranch}
            onSelectChange={(option) => {
              setSelectedBranch(option);
              setFormData((prevData) => ({ ...prevData, unit: option }));
            }}
          />
        </div>

        <div className="flex-auto">
          <Select2LikeComponent
            label="User Role"
            options={role}
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
            label="Status"
            options={status}
            required={true}
            value={selectedLocation}
            onSelectChange={(option) => {
              setSelectedLocation(option);
              setFormData((prevData) => ({ ...prevData, status: option }));
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
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}{" "}
            {/* Display error */}
          </div>

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Password Expiry <span className="text-red-600">*</span>
            </Typography>

            <Card className="w-full max-w-[32rem]">
              <List className="flex-row">
                <ListItem className="p-0">
                  <label
                    htmlFor="expires-on-first-login"
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id="expires-on-first-login"
                        name="firstLogin"
                        checked={formData.passwordExpiry.firstLogin}
                        onChange={handleCheckboxChange}
                        ripple={false}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: "p-0",
                        }}
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      Expires on first login
                    </Typography>
                  </label>
                </ListItem>

                <ListItem className="p-0">
                  <label
                    htmlFor="set-expiry-date"
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id="set-expiry-date"
                        name="setExpiryDate"
                        checked={formData.passwordExpiry.setExpiryDate}
                        onChange={handleCheckboxChange}
                        ripple={false}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: "p-0",
                        }}
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      Set Expiry Date
                    </Typography>
                  </label>
                </ListItem>
              </List>
              {/* Conditional rendering of the date picker */}
              {formData.passwordExpiry.setExpiryDate && (
                <div className="flex flex-col mt-2 mb-5">
                  <div className="flex justify-center">
                    <Typography variant="h6" color="blue-gray">
                      Expiry Date <span className="text-red-600">*</span>
                    </Typography>
                  </div>

                  <div className="flex justify-center">
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.passwordExpiry.expiryDate}
                      onChange={handleDateChange}
                      min={today}
                      className="mt-2 p-2  border border-gray-300 rounded"
                      required
                    />
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mb-5">
        <Button
          type="submit"
          loading={!isFormValid()}
          variant="gradient"
          className="flex items-center gap-3"
        >
          {isFormValid() ? "Submit" : "Complete All Fields"}
        </Button>
        {isFormValid() ? (
          <Button
            variant="outlined"
            className="flex items-center gap-3"
            onClick={() => window.location.reload()}
          >
            Refresh
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </Button>
        ) : (
          ""
        )}
      </div>
    </form>
  );
};

AddUser.propTypes = {
  isEditMode: PropTypes.bool,
  userData: PropTypes.object
};


export default AddUser;
