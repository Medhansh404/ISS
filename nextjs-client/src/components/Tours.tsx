'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface Trip {
  id: number;
  t_id: number;
  src: string;
  dest: string;
  departureTime: string;
  arrivalTime: string;
  distance: number;
  fare: number;
  adminApproval: number;
  supApproval: number;
  dirApproval: number;
  employeeId: number;
  scheme: number[];
  region: number[];
}

const Tours = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [tours, setTours] = useState<Trip[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const response = await api.get('/tour', {
          params: { empId: user?.id },
        });
        const tripData = Object.values(response.data).flat() as Trip[];
        setTrips(tripData);
        const groupedTrips = tripData.reduce((acc, trip) => {
          const tId = trip.t_id;
          if (!acc[tId]) {
            acc[tId] = [];
          }
          acc[tId].push(trip);
          return acc;
        }, {} as Record<number, Trip[]>);

        const toursArray = Object.values(groupedTrips);
        setTours(toursArray);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchTours();
    }
  }, [user?.id]);

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
        <p className="text-lg"><strong>Total Number of Tours:</strong> {tours.length}</p>
        <p className="text-lg"><strong>Total Fare:</strong> {trips.reduce((sum, trip) => sum + trip.fare, 0)}</p>
        <p className="text-lg"><strong>Total Days:</strong> {tours.length}</p>
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
                  <button className="text-gray-500 hover:underline mr-4">
                    View
                  </button>
                  <button className="text-gray-500 hover:underline">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tours; 