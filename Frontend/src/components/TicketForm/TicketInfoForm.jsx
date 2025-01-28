import PropTypes from "prop-types";
import { useState, useRef ,useEffect} from "react";
import {
  Textarea,
  Typography,
  Button,
  Progress,
} from "@material-tailwind/react";
import InputField from "../common/InputField";
import Select2LikeComponent from "../common/Select2LikeComponent";
import ImageService from "../../services/image.service";

const TicketInfoForm = ({ handleChange, isUpdateMode = false,previousData = { }}) => {
  const [serialNo, setSerialNo] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedDeviceCategory, setSelectedDeviceCategory] = useState("");
  const [fileData, setFileData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef(null);

  const Issues = [
    { value: 1, label: "Equipment Issue" },
    { value: 2, label: "Software Issue" },
    { value: 3, label: "Network Issue" },
    { value: 4, label: "RAMIS System Issue" },
    { value: 5, label: "Email Issue" },
    { value: 6, label: "Others" },
  ];
  const Priority = [
    { value: 2, label: "High" },
    { value: 0, label: "Low" },
    { value: 1, label: "Medium" },
  ];
  const DeviceCategory = [
    { value: "CPU", label: "CPU" },
    { value: "Monitor", label: "Monitor" },
    { value: "Printer", label: "Printer" },
    { value: "Scanner", label: "Scanner" },
    { value: "Phone (Analog)", label: "Phone (Analog)" },
    { value: "Phone (Digital)", label: "Phone (Digital)" },
    { value: "Network Switch", label: "Network Switch" },
    { value: "UPS", label: "UPS" },
    { value: "Others", label: "Others" },
  ];

  useEffect(() => {
    if (isUpdateMode && previousData) {
      console.log('previous data ', previousData);
      setSerialNo(previousData.serialNo || "");
      setModel(previousData.model || "");
      setBrand(previousData.brand || "");
      setDescription(previousData.description || "");
      setSelectedIssue(
        Issues.find((issue) => issue.value === previousData.category_id) || ""
      );
      setSelectedPriority(
        Priority.find((priority) => priority.value === previousData.priority) || ""
      );
      setSelectedDeviceCategory(
        DeviceCategory.find((category) => category.value === previousData.device) || ""
      );
      setFileData(previousData.file || []);
    }
  }, [isUpdateMode, previousData]);

  const handleInputChange = (setter, key) => (e) => {
    const value = e.target.value;
    setter(value);
    handleChange(key, value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Get the selected files
    const filteredFiles = files.filter((file) => file.size <= 5242880); // Filter files (Max 5MB)
  

    // Update local fileData state
    setFileData((prev) => [...prev, ...filteredFiles]);

    handleUpload(filteredFiles);
  };

  // Handle drag and drop
  const handleOnDrop = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent default behavior and stop propagation
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFileData((prevFiles) => [...prevFiles, ...droppedFiles]); // Append dropped files to existing ones
    handleUpload(droppedFiles); // Start the upload process immediately
  };

  // Remove file from the list
  const handleRemoveFile = async (fileIdentifier) => {
    // Find the file object using the identifier (either name or path)
    const fileToRemove = fileData.find(item => item.name === fileIdentifier || item.id === fileIdentifier);
    console.log("fileToRemove",fileToRemove)
  
    // Ensure the file exists before proceeding
    if (!fileToRemove) {
      console.error('File not found!');
      return;
    }
  
    try {
      // Send a DELETE request to the backend to remove the image from the server
      console.log("File to remove:", fileIdentifier);
  
      const response = await ImageService.delete(fileIdentifier); // Assume this is your API call
  
      console.log("Image delete response:", response.status);
  
      if (response.status === 200) {
        // If the file is successfully deleted from the server, remove it from the local state
        const updatedFileData = fileData.filter(item => item.path !== fileIdentifier && item.id !== fileIdentifier);
  
        // Update the state with the filtered list
        setFileData(updatedFileData);
        handleChange("file", updatedFileData); // Update the parent component with the updated file list
      } else {
        console.error('Error deleting the image from the server');
      }
    } catch (error) {
      console.error('Error during file deletion:', error);
    }
  };
  
  

  const handleUpload = (files) => {
    setUploading(true);
    setProgress(0);
    setUploadComplete(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + 10;
        if (nextProgress >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return nextProgress;
      });
    }, 500);

    handleChange("file", [...fileData, ...files]); // Concatenate the previous and new files
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    return () => {
      fileData.forEach((item) => {
        if (item instanceof File) {
          URL.revokeObjectURL(URL.createObjectURL(item));
        }
      });
    };
  }, [fileData]);
  



  return (
    <>
      <div className="m-5">
        {isUpdateMode ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <img src={fileData[0].path} alt={fileData[0].path} /> */}
              {/* <div className="grid grid-cols-1 md:grid-cols-1 gap-6"> */}
                {/* issue type */}
                <div className="flex-auto">
                  {/* Issue Type */}
                  <Select2LikeComponent
                    label="Issue Type"
                    options={Issues}
                    required={true}
                    value={selectedIssue}
                    onSelectChange={(option) => {
                      setSelectedIssue(option);
                      handleChange("issueType", option.value);
                    }}
                  />
                </div>
                {/* service tag */}
                <div className="flex-auto">
                  {/* Service Tag/ Serial NO:  */}
                  <InputField
                    label="Service Tag/ Serial NO:"
                    value={serialNo}
                    onChange={handleInputChange(setSerialNo, "serialNo")}
                    placeholder="e.g., 101202555"
                    type="text"
                    required={true}
                    minLength={5}
                  />
                </div>
                  {/* priority level  */}
                <div className="flex-auto">
                  {/* Priority Level */}
                  <Select2LikeComponent
                    label="Priority Level"
                    options={Priority}
                    required={true}
                    value={selectedPriority}
                    onSelectChange={(option) => {
                      setSelectedPriority(option);
                      handleChange("priorityLevel", option.value);
                    }}
                  />
                </div>
                {/* modal */}
                <div className="flex-auto">
                    {/* Model field */}
                    <InputField
                      label="Model"
                      value={model}
                      onChange={handleInputChange(setModel, "model")}
                      placeholder="e.g., Inspiron 15"
                      type="text"
                      required={true}
                      minLength={2}
                    />
                  </div>
                {/* Device category */}
                <div className="flex-auto">
                  {/* Device category */}
                  <Select2LikeComponent
                    label="Device category"
                    options={DeviceCategory}
                    required={true}
                    value={selectedDeviceCategory}
                    onSelectChange={(option) => {
                      setSelectedDeviceCategory(option);
                      handleChange("deviceCategory", option.value);
                    }}
                  />
                </div>
                {/* Brand */}
                <div className="flex-auto">
                    {/* Brand field */}
                    <InputField
                      label="Brand"
                      value={brand}
                      onChange={handleInputChange(setBrand, "brand")}
                      placeholder="e.g., Dell"
                      type="text"
                      required={true}
                      minLength={2}
                    />
                  </div>
                
                {/* description */}
                <div className="col-span-2">
                  {/* Designation field */}
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Description
                  </Typography>
                  <Textarea
                    value={description}
                    onChange={handleInputChange(setDescription, "description")}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    placeholder="Provide detailed issue description..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6  col-span-2">
                  {/* <FileUpload singlefile={false} multifile={true} /> */}
                  <div>
                    <Typography variant="h6" className="mb-3">
                      Attach Files (Max 5MB each)
                    </Typography>

                    <div
                      className="border-2 border-dashed border-gray-300 p-8"
                      onDrop={handleOnDrop} // Using custom onDropHandler
                      onDragOver={(e) => {
                        e.preventDefault(); // Allow files to be dragged over the drop area
                        e.stopPropagation(); // Prevent the default action of opening the file
                      }}
                    >
                      <div className="text-center">
                        <label className="block mb-2">
                          Drag & Drop or Click to Upload
                        </label>
                        <div className="flex flex-col items-center">
                          <Button
                            variant="gradient"
                            className="flex items-center gap-3"
                            onClick={handleButtonClick}
                          >
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
                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                />
                            </svg>
                            Upload Files
                          </Button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            name="file"
                            multiple
                            className="hidden"
                            onChange={(e) => handleFileChange(e)}
                          />
                        </div>
                      </div>

                      {/* Upload Progress */}
                      {uploading && (
                        <div className="mt-4">
                          <Progress value={progress} color="green" animated />
                          <span className="text-sm mt-2 block text-center">
                            Uploading... {progress}%
                          </span>
                        </div>
                      )}

                      {/* Display uploaded files as previews after upload is complete */}
                      {(uploadComplete || fileData.length > 0) && (
  <div className="mt-4 flex gap-4 flex-wrap justify-center">
    {fileData.map((item, idx) => (
      <div
        key={idx}
        className="flex flex-col items-center gap-2"
      >
        <div className="w-24 h-24 bg-gray-200 flex justify-center items-center overflow-hidden rounded-md">
          <img
            src={item.path || URL.createObjectURL(item)}
            alt={item.name || `Uploaded Image ${idx}`}
            className="object-cover w-full h-full"
          />
        </div>
        <span className="text-sm">{item.name || `File ${idx + 1}`}</span>
        <Button
          size="sm"
          color="red"
          onClick={() => handleRemoveFile(item.name || item.id)}
          className="mt-2"
        >
          Remove
        </Button>
      </div>
    ))}
  </div>
)}

                    </div>
                  </div>
                </div>
              {/* </div> */}


            </div>
          </>
        ) : (
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
                      handleChange("issueType", option.value);
                    }}
                  />
                </div>

                <div className="flex-auto">
                  {/* Priority Level */}
                  <Select2LikeComponent
                    label="Priority Level"
                    options={Priority}
                    required={true}
                    value={selectedPriority}
                    onSelectChange={(option) => {
                      setSelectedPriority(option);
                      handleChange("priorityLevel", option.value);
                    }}
                  />
                </div>

                <div className="flex-auto">
                  {/* Device category */}
                  <Select2LikeComponent
                    label="Device category"
                    options={DeviceCategory}
                    required={true}
                    value={selectedDeviceCategory}
                    onSelectChange={(option) => {
                      setSelectedDeviceCategory(option);
                      handleChange("deviceCategory", option.value);
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
                    onChange={handleInputChange(setDescription, "description")}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    placeholder="Provide detailed issue description..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 ">
                  {/* <FileUpload singlefile={false} multifile={true} /> */}
                  <div>
                    <Typography variant="h6" className="mb-3">
                      Attach Files (Max 5MB each)
                    </Typography>

                    <div
                      className="border-2 border-dashed border-gray-300 p-8"
                      onDrop={handleOnDrop} // Using custom onDropHandler
                      onDragOver={(e) => {
                        e.preventDefault(); // Allow files to be dragged over the drop area
                        e.stopPropagation(); // Prevent the default action of opening the file
                      }}
                    >
                      <div className="text-center">
                        <label className="block mb-2">
                          Drag & Drop or Click to Upload
                        </label>
                        <div className="flex flex-col items-center">
                          <Button
                            variant="gradient"
                            className="flex items-center gap-3"
                            onClick={handleButtonClick}
                          >
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
                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                />
                            </svg>
                            Upload Files
                          </Button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            name="file"
                            multiple
                            className="hidden"
                            onChange={(e) => handleFileChange(e)}
                          />
                        </div>
                      </div>

                      {/* Upload Progress */}
                      {uploading && (
                        <div className="mt-4">
                          <Progress value={progress} color="green" animated />
                          <span className="text-sm mt-2 block text-center">
                            Uploading... {progress}%
                          </span>
                        </div>
                      )}

                      {/* Display uploaded files as previews after upload is complete */}
                      {uploadComplete && fileData.length > 0 && (
                        <div className="mt-4 flex gap-4 flex-wrap justify-center">
                          {fileData.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col items-center gap-2"
                            >
                              <div className="w-24 h-24 bg-gray-200 flex justify-center items-center overflow-hidden rounded-md">
                                <img
                                  src={URL.createObjectURL(item)}
                                  alt={item.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <span className="text-sm">{item.name}</span>
                              <Button
                                size="sm"
                                color="red"
                                onClick={() => handleRemoveFile(item.name)}
                                className="mt-2"
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="flex-auto">
                  {/* Service Tag/ Serial NO:  */}
                  <InputField
                    label="Service Tag/ Serial NO:"
                    value={serialNo}
                    onChange={handleInputChange(setSerialNo, "serialNo")}
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
                      onChange={handleInputChange(setModel, "model")}
                      placeholder="e.g., Inspiron 15"
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
                      onChange={handleInputChange(setBrand, "brand")}
                      placeholder="e.g., Dell"
                      type="text"
                      required={true}
                      minLength={5}
                    />
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Prop validation with PropTypes
TicketInfoForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  isUpdateMode: PropTypes.bool,
  previousData: PropTypes.object,
};

export default TicketInfoForm;
