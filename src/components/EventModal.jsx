import React, { useState } from "react";

const EventModal = ({ selectedDate, onClose, onSave }) => {
  const [eventData, setEventData] = useState({
    type:"Others",
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  //Saving the event
  const handleSave = () => {
    onSave(eventData);
  };

  return (
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form onSubmit={(e)=>{handleSave(); e.preventDefault()}} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Add Event - {selectedDate}</h2>
        <select className=" p-2 border rounded mb-4" name="type" id="type" value={eventData.type} onChange={handleChange}>
            <option value="Personal" >Personal</option>
            <option value="Work">Work</option>
            <option value="Others">Others</option>
        </select>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={eventData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="time"
          name="startTime"
          placeholder="Start Time"
          value={eventData.startTime}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="time"
          name="endTime"
          placeholder="End Time"
          value={eventData.endTime}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          name="description"
          placeholder="Description (Optional)"
          value={eventData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        ></textarea>
        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button> 
        </div>
      </form>
    </div>
  );
};

export default EventModal;
