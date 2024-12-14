import React, { useState, useEffect } from "react";
import axios from "../Api/axios";
import useAuth from '../hooks/useAuth';

const TripApproval = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [error, setError] = useState("");
  const { auth } = useAuth();
  const email = auth.email || {};
  
  // Fetch trips from backend
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get("/requests", {
          params: { email: email },
        });
        if (response.data.length === 0) {
          setError("No requests are due for approval.");
        } else {
          setTrips(response.data);
        }
      } catch (err) {
        console.error("Error fetching trips:", err);
        setError("Failed to fetch trips. Try again later.");
      }
    };

    fetchTrips();
  }, []);

  const handleCheckboxChange = (tripId) => {
    setSelectedTrips((prevSelected) =>
      prevSelected.includes(tripId)
        ? prevSelected.filter((id) => id !== tripId)
        : [...prevSelected, tripId]
    );
  };

  const handleSelectAll = () => {
    setSelectedTrips(trips.map((trip) => trip.id));
  };

  const handleDeselectAll = () => {
    setSelectedTrips([]);
  };

  const handleApprove = async () => {
    try {
      const tripUpdates = selectedTrips.map((id) => ({
        id,
        adminStatus: true,
        dirStatus: true,
        supStatus: true,
      }));

      await axios.put("/requests", { trips: tripUpdates });

      console.log("Trips approved successfully!");
      setSelectedTrips([]); // Clear selection after approval

      // Refresh trips list
      const response = await axios.get("/request", {
        params: { email: email },
      });

      if (response.data.length === 0) {
        setError("No requests are due for approval.");
        setTrips([]);
      } else {
        setTrips(response.data);
        setError("");
      }
    } catch (err) {
      console.error("Error approving trips:", err);
      setError("Failed to approve trips. Try again later.");
    }
  };

  return (
    <div className="p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Trip Approval</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {trips.length > 0 ? (
        <>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  <th className="sticky left-0 bg-gray-200 border border-gray-300 px-4 py-2">Select</th>
                  <th className="border border-gray-300 px-4 py-2">Trip ID</th>
                  <th className="border border-gray-300 px-4 py-2">Source</th>
                  <th className="border border-gray-300 px-4 py-2">Destination</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => (
                  <tr key={trip.id} className="hover:bg-gray-100">
                    <td className="sticky left-0 bg-white border border-gray-300 px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedTrips.includes(trip.id)}
                        onChange={() => handleCheckboxChange(trip.id)}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{trip.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{trip.src}</td>
                    <td className="border border-gray-300 px-4 py-2">{trip.dest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Buttons Section */}
          <div className="mt-6 flex justify-center space-x-4">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
              onClick={handleSelectAll}
            >
              Select All
            </button>
            <button
              className="px-6 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
              onClick={handleApprove}
            >
              Approve
            </button>
            <button
              className="px-6 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
              onClick={handleDeselectAll}
            >
              Deselect All
            </button>
          </div>
        </>
      ) : (
        !error && <p className="text-gray-600 text-center">No trips available for approval.</p>
      )}
    </div>
  );
};

export default TripApproval;
