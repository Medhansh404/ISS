import React, { useState } from "react";
import axios from "../Api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const TRIP_URL = '/trip';

const AddTrip = () => {
  const [add, setAdd] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [Id, setId] = useState();
  const [trip, setTrip] = useState({
    src: '',
    dest: '',
    departureTime: '',
    arrivalTime: '',
    region: 'Standard',
    scheme: 'Standard',
    distance: 0,
    fare: 0,
    employeeId: auth.id
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  const makeRequest = async (url, data, additionalParams = {}) => {
    try {
      const response = await axios.post(url, JSON.stringify(data), {
        headers: { 
          'Authorization': `Bearer ${auth.accessToken}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true,
        ...additionalParams
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await makeRequest(TRIP_URL, { trip });
    if (response) {
      console.log(response);
      setId(response.data?.t_id);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await makeRequest(TRIP_URL, { trip });
    if (response) {
      console.log(response);
      const TripId = response.data?.t_id;
      setId(TripId);
      console.log(TripId);
      console.log(Id);
    }

    setAdd(true);
    resetForm();
  };

  const handleAddClick = async (e) => {
    e.preventDefault();
    if (!Id) return;
    const response = await makeRequest(`${TRIP_URL}/${Id}`, { trip }, {
      params: { id: Id }
    });
    if (response) {
      setId(response.data?.id);
    }
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const resetForm = () => {
    setTrip({
      src: '',
      dest: '',
      departureTime: '',
      arrivalTime: '',
      scheme: 'Standard',
      region:'Standard',
      distance: 0,
      fare: 0,
      employeeId: auth.id
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Add Trip</h2>
      <div className="max-h-[80vh] overflow-y-auto"> {/* Added scrollable container */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Source:</label>
            <input
              type="text"
              name="src"
              value={trip.src}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Destination:</label>
            <input
              type="text"
              name="dest"
              value={trip.dest}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Time of Departure:</label>
            <input
              type="time"
              name="departureTime"
              value={trip.departureTime}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Time of Arrival:</label>
            <input
              type="time"
              name="arrivalTime"
              value={trip.arrivalTime}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Region:</label>
            <select
              name="region"
              value={trip.region}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Scheme:</label>
            <select
              name="scheme"
              value={trip.scheme}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Distance (km):</label>
            <input
              type="number"
              name="distance"
              value={trip.distance}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold">Fare (Rs.):</label>
            <input
              type="number"
              name="fare"
              value={trip.fare}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            {!add && (
              <button
                type="submit"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Submit
              </button>
            )}
            <button
              onClick={handleClick}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Add Another Trip
            </button>
            <button
              onClick={handleBackClick}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Return to Dashboard
            </button>
            {add && (
              <button
                onClick={handleAddClick}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Add
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTrip;
