import React, { createContext, useState, useContext, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SelectContext = createContext();

const SelectProvider = ({ value, onChange, children, size }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const selectRef = useRef();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedValue(option);
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <SelectContext.Provider
      value={{
        isOpen,
        setIsOpen,
        selectedValue,
        handleSelect,
        toggleDropdown,
        highlightedIndex,
        setHighlightedIndex,
        selectRef,
      }}
    >
      <div
        className={`relative ${size}`}
        ref={selectRef}
        tabIndex={0}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const Select = ({ label, children, labelStyle, listStyle }) => {
  const { isOpen, toggleDropdown, selectedValue } = useContext(SelectContext);

  return (
    <div className="">
      <label className="block mb-2 text-sm text-[#333]">{label}</label>
      <div
        className={`p-1 w-full text-base rounded-lg border border-[#ccc] flex justify-between items-center cursor-pointer ${labelStyle}`}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedValue ? selectedValue.label : "Select an option"}
        <span className="text-lg">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {isOpen && (
        <ul className={`absolute top-full left-0 w-full border-2 mt-2 rounded-lg overflow-y-auto ${listStyle}`}>
          {children}
        </ul>
      )}
    </div>
  );
};

// Option component for individual items in the dropdown
const Option = ({ value, label }) => {
  const { handleSelect, highlightedIndex, setHighlightedIndex } = useContext(SelectContext);

  const handleMouseEnter = () => {
    setHighlightedIndex(value);
  };

  return (
    <li
      className={`p-2 cursor-pointer ${
        highlightedIndex === value ? "bg-[#007bff] text-white" : ""
      }`}
      onClick={() => handleSelect({ value, label })}
      onMouseEnter={handleMouseEnter}
      role="option"
      aria-selected={highlightedIndex === value}
    >
      {label}
    </li>
  );
};

// Component that holds the `Select` and `Option` components
const CustomSelect = ({ options, label, value, onChange, labelStyle, listStyle, size }) => {
  return (
    <SelectProvider value={value} onChange={onChange} size={size}>
      <Select label={label} labelStyle={labelStyle} listStyle={listStyle}>
        {options.map((option) => (
          <Option key={option.value} value={option.value} label={option.label} />
        ))}
      </Select>
    </SelectProvider>
  );
};

export default CustomSelect;
