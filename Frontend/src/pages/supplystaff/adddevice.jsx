import { useState } from "react";
import { Button, Typography, Textarea } from "@material-tailwind/react";
import InputField from "../../components/common/InputField";
const DeviceInformationForm = () => {
  const [formData, setFormData] = useState({
    devicetype: "",
    devicebrand: "",
    model: "",
    serialno: "",
    servicetag: "",
    purchaseno: "",
    warrantyperiod: "",
    supplier: "",
    purchasedate: "",
    purchasecost: "",
  });

  const isFormValid = () => {
    return (
      formData.devicetype &&
      formData.devicebrand &&
      formData.model &&
      formData.serialno &&
      formData.servicetag &&
      formData.purchaseno &&
      formData.warrantyperiod &&
      formData.supplier &&
      formData.purchasedate &&
      formData.purchasecost
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
    console.log("Device Information:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 mx-8 my-8 border border-gray-300 rounded-lg shadow-lg bg-white space-y-4">
      <Typography
        color="blue-gray"
        className="underline text-gray-900 md:text-3xl font-display1 font-bold"
      >
        Device Information Form
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <InputField
            label=" Device Type"
            placeholder="Enter Device Type"
            value={formData.devicetype}
            type="text"
            onChange={(e) => handleChange("devicetype", e.target.value)}
            required={true}
          />
        </div>

        <div>
          <InputField
            type="text"
            label="Device Brand"
            placeholder="Enter Device Brand"
            value={formData.devicebrand}
            onChange={(e) => handleChange("devicebrand", e.target.value)}
            required={true}
          />
        </div>

        <div>
          <InputField
            type="text"
            label="Model"
            placeholder="Enter Model"
            value={formData.model}
            onChange={(e) => handleChange("model", e.target.value)}
            required={true}
          />
        </div>

        <div>
          <InputField
            type="text"
            label="Serial No"
            placeholder="Enter Serial Number"
            value={formData.serialno}
            onChange={(e) => handleChange("serialno", e.target.value)}  
            required={true}        
          />
        </div>

        <div>
          <InputField
            type="text"
            label="Service Tag"
            placeholder="Enter Service Tag"
            value={formData.servicetag}
            onChange={(e) => handleChange("servicetag", e.target.value)}
            required={true}
          />
        </div>

        <div>
          <InputField
            type="text"
            label="Purchase No"
            placeholder="Enter Purchase Number"
            value={formData.purchaseno}
            onChange={(e) => handleChange("purchaseno", e.target.value)}
          />
        </div>

        <div>
          
          <InputField
            type="text"
            label="Warranty Period"
            placeholder="Enter Warranty Period (e.g., 1 Year)"
            value={formData.warrantyperiod}
            onChange={(e) => handleChange("warrantyperiod", e.target.value)}
          />
        </div>

        <div>
          
          <InputField
            type="text"
            label="Supplier"
            placeholder="Enter Supplier Name"
            value={formData.supplier}
            onChange={(e) => handleChange("supplier", e.target.value)}
          />
        </div>

        <div>
          
          <InputField
            type="date"
            label="Purchase Date"
            value={formData.purchasedate}
            onChange={(e) => handleChange("purchasedate", e.target.value)}
          />
        </div>

        <div>
          
          <InputField
            type="number"
            label="Purchase Cost"
            placeholder="Enter Purchase Cost"
            value={formData.purchasecost}
            onChange={(e) => handleChange("purchasecost", e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <Button type="submit" loading={!isFormValid()} variant="gradient">
          {isFormValid() ? "Save" : "Complete All Fields"}
        </Button>
      </div>
    </form>
  );
};

export default DeviceInformationForm;