import { useEffect, useState } from "react";
import axios from "../Api/axios";
import useAuth from '../hooks/useAuth';
import TripDetailsModal from './ViewTrip';
import UpdateTripModal from './UpdateTrip';

const TOUR_URL = '/tour';

const Tours = () => {
  const { auth } = useAuth();
  const [trips, setTrips] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const response = await axios.get(TOUR_URL, {
          params: { empId: auth.id },
          withCredentials: true
        });
        const tripData = Object.values(response.data).flat();
        setTrips(tripData);
        const groupedTrips = tripData.reduce((acc, trip) => {
          const tId = trip.t_id; //t_id is the trip id
          if (!acc[tId]) {
            acc[tId] = [];
          }
          acc[tId].push(trip);
          return acc;
        }, {});
  
        const toursArray = Object.values(groupedTrips);
        setTours(toursArray);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [auth.id]);

  const handleView = (t_id) => {
    const selected = trips.find((trip) => trip.t_id === t_id);
    setSelectedTrip(selected);
    setIsViewModalOpen(true);
  };

  const handleUpdate = (t_id) => {
    const selected = trips.find((trip) => trip.t_id === t_id);
    setSelectedTrip(selected);
    setIsUpdateModalOpen(true);
  };

  // Update trip function
  const handleUpdateTrip = async (updatedTrip) => {
    try {
      const response = await axios.put(`/${updatedTrip.t_id}`, updatedTrip, {
        withCredentials: true,
      });
      console.log('Trip updated:', response.data);
      setIsUpdateModalOpen(false);

    } catch (error) {
      console.error('Error updating trip:', error);
    }
  };

  // Delete trip function
  const handleDeleteTrip = async (t_id) => {
    try {
      const response = await axios.delete(`/${t_id}`, {
        withCredentials: true,
      });
      console.log('Trip deleted:', response.data);
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading tours...</p>;
  }

  if (trips.length === 0) {
    return <p className="text-center text-gray-500">No tours available.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Monthly Summary</h2>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <p className="text-lg"><strong>Total Number of Tours:</strong> {6}</p>
        <p className="text-lg"><strong>Total Fare:</strong> {1500}</p>
        <p className="text-lg"><strong>Total Days:</strong> {7}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="py-2 px-4 text-left">Tour ID</th>
              <th className="py-2 px-4 text-left">Source</th>
              <th className="py-2 px-4 text-left">Destination</th>
              <th className="py-2 px-4 text-left">Departure Time</th>
              <th className="py-2 px-4 text-left">Arrival Time</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tripGroup) => (
              <tr key={tripGroup[0].t_id} className="border-b">
                <td className="py-2 px-4">{tripGroup[0].t_id}</td>
                <td className="py-2 px-4">{tripGroup[0].src}</td>
                <td className="py-2 px-4">{tripGroup[tripGroup.length - 1].dest}</td>
                <td className="py-2 px-4">{tripGroup[0].departureTime}</td>
                <td className="py-2 px-4">{tripGroup[tripGroup.length - 1].arrivalTime}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleView(tripGroup[0].t_id)}
                    className="text-gray-500 hover:underline mr-4"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleUpdate(tripGroup[0].t_id)}
                    className="text-gray-500 hover:underline"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing trip details */}
      <TripDetailsModal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        trip={selectedTrip} 
      />

      {/* Modal for updating trip details */}
      <UpdateTripModal 
        isOpen={isUpdateModalOpen} 
        onClose={() => setIsUpdateModalOpen(false)} 
        trip={selectedTrip} 
        handleUpdateTrip={handleUpdateTrip}
        handleDeleteTrip={handleDeleteTrip}
      />
    </div>
  );
};

export default Tours;
