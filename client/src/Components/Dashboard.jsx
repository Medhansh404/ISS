import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
    <div className="bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <h2 className="text-2xl font-semibold mb-4">Tours</h2>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">All Tours</h3>
          <Link to="/allTours" className="text-blue-500 hover:underline">Look up</Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Create Tour</h3>
          <Link to="/addTrip" className="text-blue-500 hover:underline">Add Trip</Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Pending Approval</h3>
          <Link to="/pending" className="text-blue-500 hover:underline">Update</Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Disapproved Requests</h3>
          <Link to="/disapproved" className="text-blue-500 hover:underline">Correct</Link>
        </div>
        {/* <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Disapproved Requests</h3>
          <Link to="/approval" className="text-blue-500 hover:underline">Approve</Link>
        </div> */}
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
