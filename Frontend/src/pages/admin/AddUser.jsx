import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InputField from "../../components/common/InputField";
import PhoneInput from "../../components/common/PhoneInput";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { useLocation } from "react-router-dom";
import RegionService from "../../services/region.service";
import unitService from "../../services/unit.service";
import Toast from "../../components/common/Toast"
import { toast } from "react-toastify";

const AddUser = ({ isEditMode = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  console.log(userId);
  // const [data,setData] = useState(null);

  const [uniqueID, setUniqueID] = useState(null);

  // const [uuidVlaue, setUuidValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedUserRole, setSelectedUserRole] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [regions, setRegions] = useState([]);
  const [units, setUnits] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const role = [
    { value: "it_director", label: "IT_Director" },
    { value: "it_officier", label: "IT_Officer" },
    { value: "it_team", label: "IT_Team" },
    { value: "staff", label: "Staff" },
    { value: "account_staff", label: "Account_Staff" },
    { value: "supply_staff", label: "Supply_Staff" },
  ];
  const designation = [
    { value: "ICTA", label: "ICTA" },
    { value: "icto", label: "ICTO" },
    { value: "acir", label: "ACIR" },
    { value: "sdcir", label: "SDCIR" },
    { value: "ao", label: "AO" },
    { value: "mso", label: "MSO" },
    { value: "ictad", label: "ICTAD" },
    { value: "ictdd", label: "ICTDD" },
    { value: "", label: "DCIR" },
    { value: "", label: "Receptionist" },
    { value: "", label: "CIR" },
    { value: "", label: "Accountant" },
    { value: "", label: "Storekeeper" },
    { value: "", label: "Research_Officer" },
    { value: "", label: "AD" },
    { value: "", label: "Director" },
    { value: "", label: "DDC" },
    { value: "", label: "DO" },
    { value: "", label: "Librarian" },
    { value: "", label: "ICTD" },
    { value: "", label: "Translator" },
    { value: "", label: "CC" },
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    email: "",
    userRole: "Staff",
    phoneNumber: "",
    region: "",
    unit: "",
    status: "",
    designation: "",
    temporaryPassword: "",
    confirmPassword: "",
    password: !isEditMode ? true : false,
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
  // const retrieveUser = async (id) => {
  //   try {
  //     const response = await userService.get(id);
  //     console.log("Fetched user data:", response.data.data);
  //     // setData(response.data.data); // Store only the relevant data4
  //     setFormData({
  //       ...formData,
  //       fullName: response.data.data.name,
  //       email: response.data.data.email,
  //       phoneNumber: response.data.data.contact,
  //       userRole: response.data.data.role,
  //       region: response.data.data.region,
  //       unit: response.data.data.unit,
  //       status: response.data.data.status,
  //     });
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  //fetch region data
  const retrieveRegion = async () => {
    try {
      const response = await RegionService.getAll();
      console.log(response.data.data);
      // Transform the response data into the required format
      const formattedRegions = response.data.data.map((region) => ({
        label: region.name,
        value: region.id,
      }));

      setRegions(formattedRegions);
    } catch (error) {
      console.log(error);
    }
  };

  //fetch region data
  const retrieveUnit = async () => {
    try {
      const response = await unitService.getAll();
      console.log(response.data.data);
      // Transform the response data into the required format
      const formattedUnit = response.data.data.map((unit) => ({
        label: unit.name,
        value: unit.id,
      }));

      setUnits(formattedUnit);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      const retrieveUser = async () => {
        try {
          const response = await userService.get(userId);
          console.log("Fetched user data:", response.data.data);

          //set user unit 
          const userUnit = response.data.data.unit_id;
          if (units.length > 0) {
            const matchingUnit = units.find((unit) => unit.value === userUnit);
            console.log('Matching unit:', matchingUnit);
            if (matchingUnit) {
                console.log('Setting state...');
                setSelectedUnit(matchingUnit);
                setFormData((prevData) => ({
                    ...prevData,
                    unit: matchingUnit.value,
                }));
            }
        }

        //set user role
        const userRole = response.data.data.role;
          if (role.length > 0) {
            const matchingRole = role.find((role) => role.value === userRole);
            console.log('Matching role:', matchingRole);
            if (matchingRole) {
                console.log('Setting state...');
                setSelectedUserRole(matchingRole);
                setFormData((prevData) => ({
                    ...prevData,
                    userRole: matchingRole.value,
                }));
            }
        }

        //set designation
        const userDesignation = response.data.data.designation;
          if (designation.length > 0) {
            const matchingDesignation = designation.find((designation) => designation.value === userDesignation);
            console.log('Matching designation:', matchingDesignation);
            console.log('Matching userDesignation:', matchingDesignation);
            if (matchingDesignation) {
                console.log('Setting state...');
                setSelectedDesignation(matchingDesignation);
                setFormData((prevData) => ({
                    ...prevData,
                    designation: matchingDesignation.value,
                }));
            }
        }

        console.log("status",response.data.data.status);
        if(response.data.data.firstLogin){
          setFormData((prevData) => ({
            ...prevData,
            passwordExpiry: {
              ...prevData.passwordExpiry,
              firstLogin: response.data.data.firstLogin,
            },

          }));
        }else{
          setFormData((prevData) => ({
            ...prevData,
            passwordExpiry: {
              ...prevData.passwordExpiry,
              setExpiryDate: response.data.data.setExpiryDate
            },

          }));
        }

        setFormData((prevData) => ({
          ...prevData,
          fullName: response.data.data.name,
          email: response.data.data.email,
          phoneNumber: response.data.data.contact,
          userRole: response.data.data.role,
          status: response.data.data.status,
          employeeId: response.data.data.employeeId,
          passwordExpiry: {
            expiryDate: response.data.data.setExpiryDate,
            firstLogin: response.data.data.firstLogin,
            setExpiryDate: !response.data.data.firstLogin ? true : false,

          },

        }));
          
          
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      retrieveUser();
    }

  }, [isEditMode, userId,units]);

  useEffect(() => {
    retrieveRegion();
    retrieveUnit();
    if (!isEditMode) {
      const id = generate6DigitFromUUID();
      const password = generatePassword();
      setUniqueID(id);

      setFormData((prevData) => ({
        ...prevData,
        // employeeId: prevData.fullName.split(" ")[0] + id,
        
        temporaryPassword: password,
        confirmPassword: password,
      }));
    }
  }, [isEditMode]);

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

  const handlePasswordCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      password: checked,
    }));
  };

  const handleStatusCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      status: checked,
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
      formData.email && formData.phoneNumber 
    );
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.temporaryPassword !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    

    const userPayload = {
      ...(isEditMode && { id: userId }),
      name: formData.fullName,
      email: formData.email,
      phone: formData.phoneNumber,
      role: formData.userRole,
      unit: formData.unit,
      employeeId: formData.employeeId,
      status: formData.status,
      designation: formData.designation,
      ...(formData.password && { password: formData.temporaryPassword }), // Only include password if it's set
      firstLogin: formData.passwordExpiry.firstLogin,
      ...(!formData.firstLogin && {
        setExpiryDate: formData.passwordExpiry.expiryDate,
      }),
      // expiryDate: formData.passwordExpiry.expiryDate
    };
    

    if (isEditMode) {
      try {
        // await userService.update(userId, userPayload);
        // console.log("User updated successfully!", userPayload);
        // history.push("/users"); // Redirect after successful update
        try {
          const response = await userService.update(userPayload);
          toast.success(response.data.message, {
            position: "top-right",
          });
          navigate("/users");
          console.log(userPayload);
          console.log(response.data.message);
        } catch (error) {
          console.log(userPayload);
          console.log(error);
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      try {
        // await userService.create(userPayload);
        try {
          const response = await userService.create(userPayload);
          toast.success(response.data.message, {
            position: "top-right",
          });
          navigate("/users");
          console.log(userPayload);
          console.log(response.data.message);
        } catch (error) {
          console.log(userPayload);
          console.log(error);
          
          if(error.response.data.message==='Validation error: This emId already exists.'){
            toast.error("This employee Id already exists", {
              position: "top-right",
            });
          }else{
            toast.error(error.response.data.message, {
              position: "top-right",
            });
          }
          
        }
        // history.push("/users"); // Redirect after successful creation
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-card rounded-lg shadow-md">
      <div className=" mb-6 ">
        <Typography
          color="blue-gray"
          className="underline text-gray-900 md:text-3xl font-display1 font-bold" 
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
            value={formData.employeeId}
            onChange={handleChange}
            type="text"
            
          />
        </div>

        <div className="flex-auto">
          {regions.length > 0 ? (
            <Select2LikeComponent
              label="Region"
              options={regions}
              required={true}
              value={selectedRegion}
              onSelectChange={(option) => {
                console.log(option.value);
                setSelectedRegion(option);
                setFormData((prevData) => ({ ...prevData, region: option.value }));
              }}
            />
          ) : (
            <p>Loading regions...</p>
          )}
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
            value={selectedUnit}
            onSelectChange={(option) => {
              setSelectedUnit(option);
              setFormData((prevData) => ({ ...prevData, unit: option.value }));
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
              setFormData((prevData) => ({ ...prevData, userRole: option.value }));
            }}
          />
        </div>

        <div className="flex-auto">
          <Select2LikeComponent
            label="Designation"
            options={designation}
            required={true}
            value={selectedDesignation}
            onSelectChange={(option) => {
              setSelectedDesignation(option);
              setFormData((prevData) => ({ ...prevData, designation: option.value }));
            }}
          />
        </div>
        

        <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-6">
          <h1 className="text-lg font-semibold mt-5 mb-2">Account Settings</h1>

          {isEditMode &&(
            <>
            <label
                    htmlFor="password"
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id="password"
                        name="password"
                        checked={formData.password}
                        onChange={handlePasswordCheckboxChange}
                        ripple={false}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: "p-0",
                        }}
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      Change Password
                    </Typography>
                  </label>
            <Card className="w-full max-w-[62rem]">
              
              {/* Conditional rendering of the date picker */}
              {formData.password&& (
                <>
                <div className="p-5">
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
          </div>
                  
                </>
              )}
            </Card>
            </>
          )}

          {!isEditMode && (
            <>
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
            </>
          )}

            
          

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

          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              Status <span className="text-red-600">*</span>
            </Typography>

            <Card className="w-full max-w-[20rem]">
              <List className="flex-row">
                <ListItem className="p-0">
                  <label
                    htmlFor="user-status"
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                  >
                    <ListItemPrefix className="mr-3">
                      <Checkbox
                        id="user-status"
                        name="status"
                        checked={formData.status}
                        onChange={handleStatusCheckboxChange}
                        ripple={false}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: "p-0",
                        }}
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      Active
                    </Typography>
                  </label>
                </ListItem>
              </List>
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
  userData: PropTypes.object,
};

export default AddUser;
