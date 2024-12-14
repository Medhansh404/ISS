import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Import useAuth for authentication

const Dashboard = () => {
  const { auth } = useAuth(); // Extract auth information
  const roles = auth.roles || []; // Get the user's roles (default to an empty array)

  // Check if the user has one of the required roles
  const canAccessApproval = roles.some((role) => [2021, 2022, 2023].includes(role));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <h2 className="text-2xl font-semibold mb-4">Tours</h2>
        <div className="space-y-4">
          {/* All Tours */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">All Tours</h3>
            <Link to="/allTours" className="text-blue-500 hover:underline">
              Look up
            </Link>
          </div>
          {/* Add Trip */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Create Tour</h3>
            <Link to="/addTrip" className="text-blue-500 hover:underline">
              Add Trip
            </Link>
          </div>
          {/* Pending Approval */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Pending Approval</h3>
            <Link to="/status" className="text-blue-500 hover:underline">
              Update
            </Link>
          </div>
          {/* Approval Section */}
          {canAccessApproval && (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Requests</h3>
              <Link to="/requests" className="text-blue-500 hover:underline">
                Correct
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
