import React, { useState } from "react";

const UpdateTripModal = ({ isOpen, onClose, trip, handleUpdateTrip, handleDeleteTrip }) => {
  const [updatedTrip, setUpdatedTrip] = useState(trip);

  if (!isOpen || !trip) return null;

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTrip((prevTrip) => ({ ...prevTrip, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-h-full overflow-auto">
        <h3 className="text-2xl font-bold mb-4">Update Trip</h3>
        <form className="grid grid-cols-2 gap-4">
          <label>
            Source:
            <input
              type="text"
              name="src"
              value={trip.src}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
            />
          </label>
          <label>
            Destination:
            <input
              type="text"
              name="dest"
              value={trip.dest}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
            />
          </label>
          <label>
            Departure Time:
            <input
              type="text"
              name="departureTime"
              value={trip.departureTime}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
            />
          </label>
          <label>
            Arrival Time:
            <input
              type="text"
              name="arrivalTime"
              value={trip.arrivalTime}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
            />
          </label>
          <label>
            Region:
            <input
              type="text"
              name="region"
              value={trip.region}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
            />
          </label>
          <label>
            Scheme:
            <input
              type="text"
              name="scheme"
              value={trip.scheme}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
            />
          </label>
        </form>

        {/* Action buttons */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => handleUpdateTrip(updatedTrip)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Update Trip
          </button>
          <button
            onClick={() => handleDeleteTrip(trip.t_id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Delete Trip
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTripModal;
