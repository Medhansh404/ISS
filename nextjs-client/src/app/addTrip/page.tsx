import Navbar from '@/components/Navbar';
import AddTrip from '@/components/AddTrip';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AddTripPage() {
  return (
    <div className="app bg-gray-800">
      <Navbar />
      <div className="pt-16">
        <ProtectedRoute allowedRoles={[2020, 2021, 2022, 2023]}>
          <AddTrip />
        </ProtectedRoute>
      </div>
    </div>
  );
} 