import React, { useState, useEffect, useRef } from "react";
import { Button, Progress, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

const FileUpload = ({ multifile, onChange }) => {
  const [fileData, setFileData] = useState([]); // Store files to be uploaded
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  // Handle file selection or drag-and-drop
  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setFileData((prevFiles) => [...prevFiles, ...files]); // Append selected files to existing ones
    handleUpload(files); // Start the upload process immediately
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
  const handleRemoveFile = (fileName) => {
    setFileData((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  // Simulate file upload progress with a smooth transition
  const handleUpload = (files) => {
    setUploading(true);
    setProgress(0); // Reset progress before upload starts
    setUploadComplete(false); // Reset completion status

    // Simulate an upload process with gradual progress (example: 5 seconds)
    const uploadInterval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(uploadInterval); // Stop the interval when progress reaches 100
          setUploading(false); // Stop the uploading state
          setUploadComplete(true); // Mark upload as complete
          return 100;
        }
        return newProgress;
      });
    }, 500); // Increase progress every 500ms
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <Typography variant="h6" color="blue-gray" className="mb-3">
        Attach File
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
          <label className="block mb-2">Drag & Drop or Click to Upload</label>
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
              onChange={handleChange}
              multiple={multifile}
              className="hidden" // Hide the original file input
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
              <div key={idx} className="flex flex-col items-center gap-2">
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
  );
};

FileUpload.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default FileUpload;
