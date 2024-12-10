import React, { useState, useRef } from "react";
import DatePicker from "./Datepicker";
import { getDateRange } from "@/utils/getnearestFriday";

const DateRangePicker = ({ label, value, onChange }) => {
  const [startDate, setStartDate] = useState(value?.start || null);
  const [endDate, setEndDate] = useState(value?.end || null);
  const [isOpen, setIsOpen] = useState(false);

  const handleStartDateChange = (date) => {
    setStartDate(date)
  }
  const handleEndDateChange = (date) => {
    setEndDate(date)
  }

  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    onChange({ start: newStartDate, end: newEndDate });
  };

  // Handle quick presets for date range
  const handlePreset = (type) => {
    const today = new Date();
    let newStartDate, newEndDate;
    switch (type) {
      case "thisCutOff":
        const cutoffDate = new Date(today); // Example cutoff date
        const { start, end } = getDateRange(cutoffDate);
        newEndDate = end;
        newStartDate= start;
        break;
      case "thisMonth":
        newStartDate = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the month
        newEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the month
        break;
      case "thisWeek":
        const firstDayOfWeek = today.getDate() - today.getDay(); // Start of the current week
        newStartDate = new Date(today.setDate(firstDayOfWeek));
        newEndDate = new Date(today.setDate(firstDayOfWeek + 6)); // End of the week
        break;
      default:
        return;
    }
    handleDateChange(newStartDate, newEndDate);
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-[300px]">
      {/* Label */}
      <label className="block mb-2 text-sm text-[#333]">{label}</label>

      {/* Display selected date range */}
      <div
        className="p-2 text-base bg-[#f1f1f1] rounded-lg border-2 border-[#ccc] flex justify-between items-center cursor-pointer text-black"
        onClick={toggleCalendar}
      >
        {startDate && endDate
          ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
          : "Select a date range"}
      </div>

      {/* Preset Buttons */}
      <div className="mt-2">
        <button
          onClick={() => handlePreset("thisCutOff")}
          className="px-2 py-1 m-1 text-sm text-white bg-blue-500 rounded"
        >
          This Cut Off
        </button>
        <button
          onClick={() => handlePreset("thisMonth")}
          className="px-2 py-1 m-1 text-sm text-white bg-blue-500 rounded"
        >
          This Month
        </button>
        <button
          onClick={() => handlePreset("thisWeek")}
          className="px-2 py-1 m-1 text-sm text-white bg-blue-500 rounded"
        >
          This Week
        </button>
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-2 border-[#ccc] rounded-lg shadow-lg mt-1 text-black">
          {/* Here, you can use a calendar UI, for now, it's just an input field to change dates */}
          <div className="p-2">
            <div>
              <label className="block text-sm">Start Date:</label>
              <DatePicker
                value={startDate ? startDate.toISOString().split("T")[0] : ""}
                onChange={handleStartDateChange}
                calendarStyle={` border-black bg-black z-10 -left-[10px]`}
                headerStyle={"bg-zinc-800 text-[white]"}
                bodyStyle={`bg-zinc-800 text-[#d2d2d2]`}
                size={`w-full`}
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm">End Date:</label>
              <DatePicker
                value={endDate ? endDate.toISOString().split("T")[0] : ""}
                onChange={handleEndDateChange}
                calendarStyle={` border-black bg-black  z-10 -left-[10px]`}
                headerStyle={"bg-zinc-800 text-[white]"}
                bodyStyle={`bg-zinc-800 text-[#d2d2d2]`}
                size={`w-full`}
              />
            </div>
            <div className="flex justify-end mt-3">
              <button
                onClick={() => {
                  onChange({ start: startDate, end: endDate });
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-white bg-green-500 rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
