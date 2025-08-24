'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface TripStatus {
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
}

const Status = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState<TripStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const response = await api.get('/status', {
          params: { empId: user?.id },
        });
        setTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchTrips();
    }
  }, [user?.id]);

  const getApprovalStatus = (approval: number) => {
    switch (approval) {
      case 1:
        return <span className="text-green-600 font-semibold">Approved</span>;
      case 0:
        return <span className="text-red-600 font-semibold">Rejected</span>;
      default:
        return <span className="text-yellow-600 font-semibold">Pending</span>;
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading trip status...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Trip Status</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="py-2 px-4 text-left">Trip ID</th>
              <th className="py-2 px-4 text-left">Source</th>
              <th className="py-2 px-4 text-left">Destination</th>
              <th className="py-2 px-4 text-left">Departure</th>
              <th className="py-2 px-4 text-left">Arrival</th>
              <th className="py-2 px-4 text-left">Admin Approval</th>
              <th className="py-2 px-4 text-left">Supervisor Approval</th>
              <th className="py-2 px-4 text-left">Director Approval</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id} className="border-b">
                <td className="py-2 px-4">{trip.t_id}</td>
                <td className="py-2 px-4">{trip.src}</td>
                <td className="py-2 px-4">{trip.dest}</td>
                <td className="py-2 px-4">{trip.departureTime}</td>
                <td className="py-2 px-4">{trip.arrivalTime}</td>
                <td className="py-2 px-4">{getApprovalStatus(trip.adminApproval)}</td>
                <td className="py-2 px-4">{getApprovalStatus(trip.supApproval)}</td>
                <td className="py-2 px-4">{getApprovalStatus(trip.dirApproval)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Status; 