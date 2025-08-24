'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface TripForm {
  src: string;
  dest: string;
  departureTime: string;
  arrivalTime: string;
  region: string;
  scheme: string;
  distance: number;
  fare: number;
  employeeId: number;
}

const AddTrip = () => {
  const [add, setAdd] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const [Id, setId] = useState<number>();
  const [trip, setTrip] = useState<TripForm>({
    src: '',
    dest: '',
    departureTime: '',
    arrivalTime: '',
    region: 'Standard',
    scheme: 'Standard',
    distance: 0,
    fare: 0,
    employeeId: user?.id || 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  const makeRequest = async (url: string, data: unknown, additionalParams = {}) => {
    try {
      const response = await api.post(url, data, {
        headers: { 
          'Content-Type': 'application/json'
        },
        ...additionalParams
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await makeRequest('/trip', { trip });
    if (response) {
      console.log(response);
      setId(response.data?.t_id);
    }
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const response = await makeRequest('/trip', { trip });
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

  const handleAddClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!Id) return;
    const response = await makeRequest(`/trip/${Id}`, { trip }, {
      params: { id: Id }
    });
    if (response) {
      setId(response.data?.id);
    }
  };

  const handleBackClick = () => {
    router.push('/dashboard');
  };

  const resetForm = () => {
    setTrip({
      src: '',
      dest: '',
      departureTime: '',
      arrivalTime: '',
      scheme: 'Standard',
      region: 'Standard',
      distance: 0,
      fare: 0,
      employeeId: user?.id || 0
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Add Trip</h2>
      <div className="max-h-[80vh] overflow-y-auto">
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