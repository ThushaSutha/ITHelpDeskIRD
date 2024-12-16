import { useState , useEffect} from "react";
import PropTypes from "prop-types";
import Select2LikeComponent from "../common/Select2LikeComponent";
import RegionService from "../../services/region.service";
import unitService from "../../services/unit.service";

const LocationInfoForm = ({ handleChange }) => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [regions, setRegions] = useState([]);
  const [units, setUnits] = useState([]);


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
    retrieveRegion();
    retrieveUnit();
    
  }, []);

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
                label="Region"
                options={regions}
                required={true}
                value={selectedRegion}
                onSelectChange={(option) => {
                  console.log(option.value);
                  setSelectedRegion(option);
                  handleChange("region", selectedRegion);  
                }}
              />
            </div>
          </div>
          <div className="mb-1 flex flex-row gap-6 justify-center">
            <div className="flex-auto">
              {/* Department */}
              <Select2LikeComponent
                label="Unit"
                options={units}
                required={true}
                value={selectedUnit}
                onSelectChange={(option) => {
                  setSelectedUnit(option);
                  
                }}
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
