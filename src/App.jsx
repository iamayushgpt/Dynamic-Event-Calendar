import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import EventModal from "./components/EventModal";
import EventList from "./components/EventList";
import { format, getMonth, getYear } from "date-fns";

const App = () => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);

  //Current month and year
  const [selectedExportMonth, setSelectedExportMonth] = useState(
    getMonth(new Date())
  );
  const [selectedExportYear, setSelectedExportYear] = useState(
    getYear(new Date())
  );

  // Load events from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) setEvents(JSON.parse(savedEvents));
  }, []);

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  //Box to add events
  const handleAddEvent = () => {
    setIsModalOpen(true);
  };

  //Saving an event
  const handleSaveEvent = (newEvent) => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const dayEvents = events[dateKey] || [];

    // Check for overlapping events
    const isOverlap = dayEvents.some((event) => {
      const newStart = new Date(`1970-01-01T${newEvent.startTime}:00`);
      const newEnd = new Date(`1970-01-01T${newEvent.endTime}:00`);
      const eventStart = new Date(`1970-01-01T${event.startTime}:00`);
      const eventEnd = new Date(`1970-01-01T${event.endTime}:00`);

      return (
        (newStart < eventEnd && newStart >= eventStart) || // Overlaps at the start
        (newEnd > eventStart && newEnd <= eventEnd) || // Overlaps at the end
        (newStart <= eventStart && newEnd >= eventEnd) // Completely overlaps
      );
    });

    if (isOverlap) {
      alert("Event times overlap with an existing event!");
      return; // Stop if there's an overlap
    }

    // Add event if no overlap
    setEvents({ ...events, [dateKey]: [...dayEvents, newEvent] });
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (index) => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const dayEvents = events[dateKey] || [];

    //Removing the deleted event
    dayEvents.splice(index, 1);
    setEvents({ ...events, [dateKey]: dayEvents });
  };

  // Export events for the selected month and year
  const handleExportEvents = () => {
    const filteredEvents = Object.keys(events).reduce((acc, dateKey) => {
      const eventDate = new Date(dateKey);
      if (
        getMonth(eventDate) === selectedExportMonth &&
        getYear(eventDate) === selectedExportYear
      ) {
        acc[dateKey] = events[dateKey];
      }
      return acc;
    }, {});


// Converting the filteredEvents object to an array of entries (key-value pairs)
const cleanedFilteredEvents = Object.fromEntries(
  // Filtering out entries where the value is an empty array
  Object.entries(filteredEvents).filter(
    ([key, value]) => !(Array.isArray(value) && value.length === 0)
  )
);

// Check if the cleanedFilteredEvents object's key is empty
if (Object.keys(cleanedFilteredEvents).length === 0) {
  alert("No events found for the selected month and year.");
  return;
}


    const blob = new Blob([JSON.stringify(cleanedFilteredEvents, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `events-${selectedExportYear}-${
      selectedExportMonth + 1
    }.json`;
    link.click();
  };


  return (
    <div className="relative h-screen flex flex-col bg-gray-100 p-4">
      <div className=" absolute flex gap-6 right-20">
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
        >
          Export
        </button>
        {exportDropdownOpen && (
          <div className="absolute right-0 top-10 mt-2 w-56 bg-white border border-gray-300 rounded shadow-lg">
            <div className="p-4">
              <label className="block mb-2 font-bold">Select Month</label>
              <select
                value={selectedExportMonth}
                onChange={(e) => setSelectedExportMonth(Number(e.target.value))}
                className="w-full p-2 border rounded"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {new Date(0, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
              <label className="block mt-4 mb-2 font-bold">Select Year</label>
              <select
                value={selectedExportYear}
                onChange={(e) => setSelectedExportYear(Number(e.target.value))}
                className="w-full p-2 border rounded"
              >
                {Array.from({ length: 50 }, (_, i) => (
                  <option key={i} value={getYear(new Date()) - 10 + i}>
                    {getYear(new Date()) - 10 + i}
                  </option>
                ))}
              </select>
              <button
                className="mt-4 bg-green-500 text-white w-full py-2 rounded"
                onClick={handleExportEvents}
              >
                Export Events
              </button>
            </div>
          </div>
        )}
      </div>

      <h1 className="text-center text-3xl font-bold mb-6">
        Dynamic Event Calendar
      </h1>
      <Calendar events={events} onDayClick={handleDayClick} />

      {selectedDate && (
        <EventList
          selectedDate={selectedDate}
          events={events[format(selectedDate, "yyyy-MM-dd")] || []}
          onAddEvent={handleAddEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}

      {isModalOpen && (
        <EventModal
          selectedDate={format(selectedDate, "yyyy-MM-dd")}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default App;
