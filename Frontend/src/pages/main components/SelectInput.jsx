import PropTypes from "prop-types";
import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Input } from "@material-tailwind/react";

function SelectInput({ liIcon = false, isTitle = false, title, isInput = false, list = [], selected, onSelect }) {
  const [currentSelected, setCurrentSelected] = useState(selected);

  const handleSelect = (value) => {
    setCurrentSelected(value);
    if (onSelect) onSelect(value); 
  };

  return (
    <div className="mt-2 bg-white px-4 shadow-md rounded-md w-full">
      {isInput && (
        <div>
          <Input variant="static" placeholder="Search status" />
        </div>
      )}

      {isTitle && title && (
        <div>
          <p className="font-serif">{title}</p>
          <div className="w-5 h-[1px] bg-black"></div>
        </div>
      )}

      <ul className="w-full py-2">
        {list.map((item, index) => (
          <li
            key={index}
            className={`flex justify-between mx-2 items-center gap-3 p-2 cursor-pointer hover:bg-gray-50 ${
              item.value === currentSelected ? "bg-gray-100" : ""
            }`}
            onClick={() => handleSelect(item.value)}
          >
            

            <div className="flex flex-row items-center ">{liIcon && <section className="bg-black w-2 h-2 mr-2 rounded-full"></section>}{item.name}</div>

            {item.value === currentSelected && <CheckIcon className="h-5 w-5 text-light-blue-400" />}
          </li>
        ))}
      </ul>
    </div>
  );
}

SelectInput.propTypes = {
  liIcon: PropTypes.bool,
  isTitle: PropTypes.bool,
  title: PropTypes.string,
  isInput: PropTypes.bool,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  selected: PropTypes.number,
  onSelect: PropTypes.func, 
};

export default SelectInput;
