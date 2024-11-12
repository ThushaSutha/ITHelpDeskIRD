import { useState } from "react";
import PropTypes from "prop-types";
import Select2LikeComponent from "../common/Select2LikeComponent";

const LocationInfoForm = ({ handleChange }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption1, setSelectedOption1] = useState("");
  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
  const options1 = ["Option 1", "Option 2", "Option 3", "Option 4"];

  // Function to handle the selected option
  const handleSelectChange = (option) => {
    const newBranch = typeof option === 'object' ? option.target.value : option; // Check if option is event or value
    setSelectedOption(newBranch); // Update the state with the selected option
    handleChange("branch", newBranch);
    console.log("Selected option:", newBranch);
  };

  const handleSelectChange1 = (option1) => {
    const newDepartment = typeof option1 === 'object' ? option1.target.value : option1;
    setSelectedOption1(newDepartment); // Update the state with the selected option
    handleChange("department", newDepartment);
    console.log("Selected option1:", newDepartment);
  };

  return (
    <>
      <div className="m-5">
        <div className="max-w-full sm:max-w-full bg-white shadow-lg shadow-gray-500 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl sm:text-xl font-semibold text-gray-700">
            Location Details
          </h2>
          <div className="mb-1 flex flex-row gap-6 justify-center">
            <div className="flex-auto">
              {/* Branch */}
              <Select2LikeComponent
                label="Branch"
                options={options}
                required={true}
                value={selectedOption}
                onSelectChange={handleSelectChange} // Pass the handler function
              />
            </div>
          </div>
          <div className="mb-1 flex flex-row gap-6 justify-center">
            <div className="flex-auto">
              {/* Department */}
              <Select2LikeComponent
                label="Department"
                options={options1}
                multiSelect={false}
                required={true}
                value={selectedOption1}
                onSelectChange={handleSelectChange1} // Pass the handler function
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

LocationInfoForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default LocationInfoForm;
