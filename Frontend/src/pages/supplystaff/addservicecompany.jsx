import { useState } from "react";
import { Button, Input, Typography, Select, Option, Textarea } from "@material-tailwind/react";

const AddServiceCompanyDetails = () => {
  const [formData, setFormData] = useState({  
    companyid: "",
    companyname: "",
    address: "",
    email: "",
    phoneno: "",
    devicetype: "",
    model: "",
    serialno: "",
    servicestartdate: "",
    enddate: "",
  });

  const isFormValid = () => {
    return (
      formData.companyid &&
      formData.companyname &&
      formData.address &&
      formData.email &&
      formData.phoneno  &&
      formData.devicetype &&
      formData.model &&
      formData.serialno &&
      formData.servicestartdate &&
      formData.enddate 
    );
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Service Company Details:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mx-8 my-8 border border-gray-300 rounded-lg shadow-lg bg-white space-y-4">
      <Typography
        color="blue-gray"
        className="underline text-gray-900 md:text-3xl font-display1 font-bold" 
      >
        Add Service Company Details
      </Typography>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
   
        {/* Row 1 */}
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-3">Company ID <span className="text-red-500">*</span></Typography>
          <Input
            placeholder="Enter Company ID"
            value={formData.companyid}
            onChange={(e) => handleChange("companyid", e.target.value)}
            className="w-[550px]" // Reduced width
            required
          />
        </div>
       
        <div>
        <Typography variant="h6" color="blue-gray" className="mb-3">Company Name <span className="text-red-500">*</span></Typography>
          <Input
            placeholder="Enter Company Name"
            value={formData.companyname}
            onChange={(e) => handleChange("companyname", e.target.value)}
            className="w-[550px]" // Reduced width
            required
          />
        </div>
        
        <div>
        <Typography variant="h6" color="blue-gray" className="mb-3">Address <span className="text-red-500">*</span></Typography>
          <Textarea
            placeholder="Enter Company Address"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-[550px]" // Reduced width
            required
          />
        </div>
         
         <div>
         <Typography variant="h6" color="blue-gray" className="mb-3">Email <span className="text-red-500">*</span></Typography>
          <Input
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-[550px]" // Reduced width
            required
          />
        </div>
        
        <div>
        <Typography variant="h6" color="blue-gray" className="mb-3">Phone No <span className="text-red-500">*</span></Typography>
          <Input
            placeholder="Enter contact Number"
            value={formData.phoneno}
            onChange={(e) => handleChange("phoneno", e.target.value)}
            className="w-[550px]" // Reduced width
       
          />
        </div>
       
        <div> 
        <Typography variant="h6" color="blue-gray" className="mb-3">Deveice Type <span className="text-red-500">*</span></Typography>
          <Input
            placeholder="Device Type"
            value={formData.devicetype}
            onChange={(e) => handleChange("devicetype", e.target.value)}
            className="w-[550px]" // Reduced width
            required
          />
        </div>
        
        <div> 
        <Typography variant="h6" color="blue-gray" className="mb-3">Model <span className="text-red-500">*</span></Typography>
        <Input
          placeholder="Model"
          value={formData.model}
          onChange={(e) => handleChange("model", e.target.value)}
          className="w-[550px]" // Reduced width
          required
        />
      </div>
  
       <div>
       <Typography variant="h6" color="blue-gray" className="mb-3">Serial No <span className="text-red-500">*</span></Typography>
        <Input
          placeholder="Enter Serial Number"
          value={formData.serialno}
          onChange={(e) => handleChange("serialno", e.target.value)}
          className="w-[550px]" // Reduced width
          />
        </div>
 
        <div>
        <Typography variant="h6" color="blue-gray" className="mb-3">Service Start Date <span className="text-red-500">*</span></Typography>
          <Input
            type="date"
            value={formData.servicestartdate}
            onChange={(e) => handleChange("servicestartdate", e.target.value)}
            className="w-[550px]" // Reduced width
            required
          />
        </div>

        <div>
        <Typography variant="h6" color="blue-gray" className="mb-3">Service End Date </Typography>
          <Input
            type="date"
            value={formData.enddate}
            onChange={(e) => handleChange("enddate", e.target.value)}
            className="w-[550px]" // Reduced width
            required
          />
        </div>

        </div>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            type="submit"
            loading={!isFormValid()}
            variant="gradient"
            className="flex items-center gap-3"
          >

          {isFormValid() ? "Submit" : "Complete All Fields"}
          </Button>

          {isFormValid() && (
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
          )}
        </div>
    </form>
  );
};

export default AddServiceCompanyDetails;