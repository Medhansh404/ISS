'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Request {
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
  employeeName: string;
}

const Requests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await api.get('/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApproval = async (requestId: number, approvalType: string, status: number) => {
    try {
      await api.put(`/requests/${requestId}`, {
        [approvalType]: status
      });
      // Refresh the requests list
      const response = await api.get('/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error updating approval:', error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading requests...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Trip Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="py-2 px-4 text-left">Employee</th>
              <th className="py-2 px-4 text-left">Source</th>
              <th className="py-2 px-4 text-left">Destination</th>
              <th className="py-2 px-4 text-left">Departure</th>
              <th className="py-2 px-4 text-left">Arrival</th>
              <th className="py-2 px-4 text-left">Fare</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-b">
                <td className="py-2 px-4">{request.employeeName}</td>
                <td className="py-2 px-4">{request.src}</td>
                <td className="py-2 px-4">{request.dest}</td>
                <td className="py-2 px-4">{request.departureTime}</td>
                <td className="py-2 px-4">{request.arrivalTime}</td>
                <td className="py-2 px-4">{request.fare}</td>
                <td className="py-2 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApproval(request.id, 'adminApproval', 1)}
                      className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproval(request.id, 'adminApproval', 0)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests; 