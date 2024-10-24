import React from "react";

const TripDetailsModal = ({ isOpen, onClose, trip }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-h-full overflow-auto">
        <h3 className="text-2xl font-bold mb-4">Trip Details</h3>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <tbody>
            <tr>
              <td className="font-semibold p-2">Trip ID</td>
              <td className="p-2">{trip.t_id}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Source</td>
              <td className="p-2">{trip.src}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Destination</td>
              <td className="p-2">{trip.dest}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Departure Time</td>
              <td className="p-2">{trip.departureTime}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Arrival Time</td>
              <td className="p-2">{trip.arrivalTime}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Scheme</td>
              <td className="p-2">{trip.scheme}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Region</td>
              <td className="p-2">{trip.region}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Distance (km)</td>
              <td className="p-2">{trip.distance}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Fare (Rs.)</td>
              <td className="p-2">{trip.fare}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Admin Approval</td>
              <td className="p-2">{trip.adminApproval ? 'Approved' : 'Pending'}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Supervisor Approval</td>
              <td className="p-2">{trip.supApproval ? 'Approved' : 'Pending'}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2">Director Approval</td>
              <td className="p-2">{trip.dirApproval ? 'Approved' : 'Pending'}</td>
            </tr>
          </tbody>
        </table>
        <button 
          onClick={onClose} 
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
          Close
        </button>
      </div>
    </div>
  );
};

export default TripDetailsModal;
