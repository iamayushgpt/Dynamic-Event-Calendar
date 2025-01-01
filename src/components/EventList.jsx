import React from "react";
import { format } from "date-fns";
import { useState,useEffect } from "react";

const EventList = ({ selectedDate, events, onAddEvent, onDeleteEvent }) => {
  const [searchEvents, setSearchEvents] = useState("");
  //Containing filtered events based on search
  const [filteredEvents, setFilteredEvents] = useState(events)
  useEffect(() => {
    //Filtering of events based on search
   let updatedfilteredEvents = events.filter((item)=> item.name.toLowerCase().includes(searchEvents.toLowerCase()))
   //Setting the updated events by filtering from search value
   setFilteredEvents(updatedfilteredEvents)
  }, [searchEvents])
  
  return (
    <div className="bg-white flex flex-col gap-1 p-4 rounded shadow mt-6">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">
          Events for {format(selectedDate, "MMMM dd, yyyy")}
        </h2>
        <div className="flex gap-3">
          <input
            className="border pl-2 rounded-md"
            type="text"
            name="search"
            value={searchEvents}
            onChange={(e)=>setSearchEvents(e.target.value)}
            placeholder="Searh for events"
          />

          <ul className="flex font-semibold gap-2 ">
            <li className="flex justify-center items-center gap-1">
              <span>Work</span>
              <div className="h-2 w-2 rounded-full bg-[#B0C4DE]"></div>
            </li>
            <li className="flex justify-center items-center gap-1">
              <span>Personal</span>
              <div className="h-2 w-2 rounded-full bg-[#FAD7A0]"></div>
            </li>
            <li className="flex justify-center items-center gap-1">
              <span>Others</span>
              <div className="h-2 w-2 rounded-full bg-[#E6E6FA]"></div>
            </li>
          </ul>
        </div>
      </div>
      <div className=" event-scroll justify-center max-h-[20vh] overflow-y-auto ">
        {events.length === 0 ? (
          <p className="text-gray-600">No events for this day.</p>
        ) : 
        (          
          <ul className="space-y-4">
            {(searchEvents == ""? events :filteredEvents).map((event, index) => (
              <li
                key={index}
                className={`flex justify-between items-center py-2 px-4 ${
                  event.type === "Personal"
                    ? "bg-[#FAD7A0]"
                    : event.type === "Work"
                    ? "bg-[#B0C4DE]"
                    : "bg-[#E6E6FA]"
                }  rounded`}
              >
                <div className="">
                  <h3 className="font-bold">{event.name}</h3>
                  <p className="text-sm">
                    {event.startTime} - {event.endTime}
                  </p>
                  {event.description && (
                    <p className="text-gray-600 text-sm">{event.description}</p>
                  )}
                </div>
                <button
                  onClick={() => onDeleteEvent(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={onAddEvent}
        className="bg-blue-500 w-fit text-white px-4 py-2 rounded mt-4"
      >
        Add Event
      </button>
    </div>
  );
};

export default EventList;
