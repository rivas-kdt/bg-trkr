import React, { useState, useEffect, useRef } from "react";
import { FaCalendar, FaChevronLeft, FaChevronRight, FaRegCalendarAlt } from "react-icons/fa";


// Utility function to format date
const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const DatePicker = ({ value, onChange, label, headerStyle, bodyStyle, calendarStyle, size }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datePickerRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onChange(date);
    setIsOpen(false);
  };
  
  // Get the days of the month, including leading empty days for the first week
  const getDaysInMonth = () => {
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const days = [];
    
    // Get the starting day of the week for the first date of the month
    const startDay = monthStart.getDay(); // 0 - Sunday, 1 - Monday, etc.
    
    // Fill in leading empty days for the first row if the month doesn't start on Sunday
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Add the days of the current month
    for (let i = 1; i <= monthEnd.getDate(); i++) {
      const day = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      days.push(day);
    }

    return days;
  };

  const handleMonthChange = (direction, event) => {
    event.preventDefault(); // Prevent default button behavior
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  return (
    <div ref={datePickerRef} className={`relative ${size}`}>
      <label className="block mb-2 text-sm text-[#333]">{label}</label>

      <div
        className="p-1 text-base bg-[#f1f1f1] rounded-lg border border-[#ccc] flex justify-around items-center cursor-pointer text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>
        {selectedDate ? formatDate(selectedDate) : "Select a date"}</p>
        {isOpen ? <FaRegCalendarAlt /> : <FaCalendar />}
      </div>

      {isOpen && (
        <div className={`absolute top-full -left-[100%] w-[300px] overflow-hidden border-2 rounded-lg shadow-lg mt-2 ${calendarStyle}`}>
          <div className={`${headerStyle} flex items-center justify-between p-2 `}>
            <button onClick={(e) => handleMonthChange(-1, e)}><FaChevronLeft />
            </button>
            <span>
              {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
            </span>
            <button onClick={(e) => handleMonthChange(1, e)}><FaChevronRight /></button>
          </div>

          <div className={`grid grid-cols-7 gap-1 p-2 ${bodyStyle}`}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-sm font-bold text-center">{day}</div>
            ))}

            {getDaysInMonth().map((date, index) => (
              <button
                key={index}
                className={`w-10 h-10 text-center rounded-full ${date && selectedDate && selectedDate.getDate() === date.getDate() && selectedDate.getMonth() === date.getMonth() && selectedDate.getFullYear() === date.getFullYear() ? "bg-blue-500 text-white" : "bg-transparent"} ${date ? "hover:bg-gray-300" : "text-transparent"}`}
                onClick={date ? () => handleDateSelect(date) : undefined}
                disabled={!date}
              >
                {date ? date.getDate() : ""}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
