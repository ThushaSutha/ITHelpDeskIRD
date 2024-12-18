import { useState, useEffect } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import ContactInfoForm from "../../components/TicketForm/ContactInfoForm";
import TicketInfoForm from "../../components/TicketForm/TicketInfoForm";
import LocationInfoForm from "../../components/TicketForm/locationInfoForm";
import { v4 as uuidv4 } from "uuid";

const TicketForm = () => {
  const [referenceNumber, setReferenceNumber] = useState("");

  const generateReferenceNumber = () => {
    const newReferenceNumber = `REF${uuidv4()}`;
    setReferenceNumber(newReferenceNumber);
  };

  // Automatically generate a new reference number on component mount
  useEffect(() => {
    generateReferenceNumber();
  }, []);

  const [formData, setFormData] = useState({
    referenceNo: "",
    name: "",
    email: "",
    phone: "",
    region: "",
    unit: "",
    issueType: "",
    priorityLevel: "",
    deviceCategory: "",
    serviceTag: "",
    model: "",
    brand: "",
    description: "",
    file: null,
  });

  // To check if the form is valid (all required fields are filled)
  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.phone 
      
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
    console.log("Form Data:", formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mt-5 ml-5" >
          <Typography
            color="blue-gray"
            className="underline text-gray-900 md:text-3xl font-display1 font-bold" 
          >
            Device Trouble Report
          </Typography>
          <div className="flex md:w-[500px] items-center mt-5">
            <Typography color="gray" className="font-normal whitespace-nowrap">
              Reference NO:
            </Typography>
            <Input
              value={referenceNumber}
              disabled
              className="ml-4 w-[160px] md:w-[350px] text-center bg-gray-100 border border-gray-300 rounded-md p-1"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row mt-6 gap-4">
          <div className="md:w-1/2">
            <ContactInfoForm handleChange={handleChange} />
          </div>
          <div className="md:w-1/2">
            <LocationInfoForm formData={formData} handleChange={handleChange} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row mt-6 gap-4">
          <div className="md:w-full">
            <TicketInfoForm handleChange={handleChange} />
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
          </div>
        </div>
      </form>
    </>
  );
};

export default TicketForm;
