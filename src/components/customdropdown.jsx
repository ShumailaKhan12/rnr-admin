// components/CustomDropdown.jsx
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { IoIosArrowDown } from "react-icons/io";

const CustomDropdown = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select one",
  className = "",
  labelClassName = "",
  itemClassName = "",
  error,
}) => {
  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label className={`form-label font-12 montserrat-medium text-blue-color ${labelClassName}`}>
          {label}
        </label>
      )}
      <Dropdown onSelect={(eventKey) => onChange(eventKey)}
        {...registerSpecial("referrer_reward_type", {
                        required: "Reward Type is required",
                      })}
        >
        
        <Dropdown.Toggle
          variant="light"
          className={`w-100 form-select text-blue-color rounded-3 border-0 py-2 d-flex justify-content-between align-items-center ${
            error ? "border border-danger" : ""
          }`}
        >
          <span className="font-14 montserrat-medium">
            {value || placeholder}
          </span>
          <IoIosArrowDown className="text-blue-color" />
        </Dropdown.Toggle>

        <Dropdown.Menu className="w-100 shadow-sm rounded">
          {options.map((option) => (
            <Dropdown.Item
              key={option}
              eventKey={option}
              className={`text-blue-color font-14 montserrat-medium px-3 py-2 ${itemClassName}`}
            >
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {error && (
        <small className="text-danger d-block mt-1">
          {error.message || "This field is required"}
        </small>
      )}
    </div>
  );
};

export default CustomDropdown;
