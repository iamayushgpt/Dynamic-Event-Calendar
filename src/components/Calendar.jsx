import React, { useState, useRef, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isToday,
  addMonths,
  isSameDay,
  subMonths,
} from "date-fns";

const Calendar = ({ events, onDayClick }) => {
  const clickBg = useRef(null);
  const [clickedDate, setClickedDate] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  // console.log(currentDate)

  //rendering the months and year
  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => setCurrentDate(subMonths(currentDate, 1))}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Previous
      </button>
      <h2 className="  text-2xl max-xs:text-base text-center font-bold">
        {format(currentDate, "MMMM yyyy")}
      </h2>
      <button
        onClick={() => setCurrentDate(addMonths(currentDate, 1))}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  );

  //rendering 7days
  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 gap-2 text-center font-bold">
        {days.map((day) => (
          <div key={day} className="text-gray-600">
            {day}
          </div>
        ))}
      </div>
    );
  };

  //for each date blocks
  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDay = day; // Create a new reference for each iteration on day
        const formattedDate = format(currentDay, "d");
        const isCurrentDay = isToday(currentDay);
        const isClickedDay = isSameDay(clickedDate, currentDay); // Check if this date is the clicked date for display of events
        const eventsOnDay = events[format(currentDay, "yyyy-MM-dd")] || []; //current day events.

        //days containing rows from startDate
        days.push(
          <div
            key={format(currentDay, "yyyy-MM-dd")}
            ref={clickBg}
            className={`p-2 border rounded cursor-pointer ${
              isCurrentDay ? "bg-blue-100" : "bg-white"
            }       
            ${isClickedDay ? "bg-green-200" : ""}      
            `}
            onClick={() => {
              onDayClick(currentDay); // Pass the correct date to the function to use further
              console.log(format(currentDay, "yyyy-MM-dd")); //debugging
              setClickedDate(currentDay);
            }}
          >
            <span className="block font-bold">{formattedDate}</span>
            {eventsOnDay.length > 0 && (
              <span className="block mt-1 text-xs text-red-500">
                {eventsOnDay.length} event(s)
              </span>
            )}
          </div>
        );
        day = addDays(day, 1);
      }

      //pushing each row on each iteration of while loop
      rows.push(
        <div
          key={format(day, "yyyy-MM-dd") + "-row"}
          className="grid grid-cols-7 gap-2"
        >
          {days}
        </div>
      );
      days = [];
    }

    return <div className="mt-4">{rows}</div>;
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
