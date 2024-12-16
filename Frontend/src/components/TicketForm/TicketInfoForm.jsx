import PropTypes from "prop-types"; // Import PropTypes for validation
import { useState } from "react";
import { Textarea , Typography } from "@material-tailwind/react";
import InputField from "../common/InputField";
import Select2LikeComponent from "../common/Select2LikeComponent";
import FileUpload from "../common/FileUpload";

const TicketInfoForm = ({
  handleChange,
}) => {
  const [serialNo, setSerialNo] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");

  const [description, setDescription] = useState("");
  const Issues = [
    {value: "Equipment Issue",label: "Equipment Issue"},
    {value:"Software Issue",label:"Software Issue"}, 
    {value:"Network Issue",label:"Network Issue"}, 
    {value:"RAMIS System Issue",label:"RAMIS System Issue"}, 
    {value:"Email Issue",label:"Email Issue"},
    {value:"Others",label:"Others"},
  ];
  const priority = [
    {value:"High",label:"High"}, 
    {value:"Low",label:"Low"}, 
    {value:"Medium",label:"Medium"},
  ];
  const deviceCategory = [
    {value:"CPU",label:"CPU"}, 
    {value:"Monitor",label:"Monitor"}, 
    {value:"Printer",label:"Printer"},
    {value:"Scanner",label:"Scanner"},
    {value:"Phone(Analog)",label:"Phone(Analog)"},
    {value:"Phone(Digital)",label:"Phone(Digital)"},
    {value:"Network Switch",label:"Network Switch"},
    {value:"UPS",label:"UPS"},
    {value:"Others", label:"Others"},
  ];
  const [selectedIssue, setSelectedIssue] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedDeviceCategory, setSelectedDeviceCategory] = useState("");

  

  
  
  

  const handleSerialChange = (e) => {
    const newSerialNo = e.target.value;
    setSerialNo(newSerialNo);
    handleChange("serviceTag", newSerialNo);  
  };
  const handleModelChange = (e) => {
    const newModel = e.target.value;
    setModel(newModel);
    handleChange("model", newModel);  
  };
  const handleBrandChange = (e) => {
    const newBrand = e.target.value;
    setBrand(newBrand);
    handleChange("brand", newBrand);  
  };
 
  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    handleChange("description", newDescription);  
  };

  return (
    <>
      <div className="m-5">
        <div className="max-w-full bg-white shadow-lg shadow-gray-500 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl sm:text-xl font-semibold text-gray-700">
            Ticket Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="flex-auto">
              {/* Issue Type */}
              <Select2LikeComponent
                label="Issue Type"
                options={Issues}
                required={true}
                value={selectedIssue}
                onSelectChange={(option) => {
                  setSelectedIssue(option);
                }}
              />
            </div>

            <div className="flex-auto">
              {/* Priority Level */}
              <Select2LikeComponent
                label="Priority Level"
                options={priority}
                required={true}
                value={selectedPriority}
                onSelectChange={(option) =>{
                  setSelectedPriority(option);
                }}
              />
            </div>

            <div className="flex-auto">
              {/* Device category */}
              <Select2LikeComponent
                label="Device category"
                options={deviceCategory}
                required={true}
                value={selectedDeviceCategory}
                onSelectChange={(option) =>{
                  setSelectedDeviceCategory(option);
                }}
              />
            </div>

            <div className="flex-auto ">
              {/* Designation field */}
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Description 
              </Typography>
              <Textarea 
                value={description}
                onChange={handleDescriptionChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 ">
              <FileUpload singlefile={false} multifile={true} />
          </div>

            
          </div>

          

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="flex-auto">
              {/* Service Tag/ Serial NO:  */}
              <InputField
                label="Service Tag/ Serial NO:"
                value={serialNo}
                onChange={handleSerialChange}
                placeholder="e.g., 101202555"
                type="text"
                required={true}
                minLength={5}
              /> 

              <div className="mt-[26px]">
              {/* Model field */}
              <InputField
                label="Model"
                value={model}
                onChange={handleModelChange}
                placeholder="e.g., "
                type="text"
                required={true}
                minLength={5}
              />
              </div>

              <div className="mt-7">
              {/* Brand field */}
              <InputField
                label="Brand"
                value={brand}
                onChange={handleBrandChange}
                placeholder="e.g., HP"
                type="text"
                required={true}
                minLength={5}
              />
              </div>

              
            </div>
            

            {/* <div className="flex-auto "> */}
              {/* Model field */}
              {/* <InputField
                label="Model"
                value={model}
                onChange={handleModelChange}
                placeholder="e.g., 101202555"
                type="text"
                required={true}
                minLength={5}
              /> */}
            {/* </div> */}
          </div>
          
          </div>
        </div>
      </div>
    </>
  );
};

// Prop validation with PropTypes
TicketInfoForm.propTypes = {

  handleChange: PropTypes.func.isRequired,
};



export default TicketInfoForm;
