import Navbar from '@/components/Navbar';
import Tours from '@/components/Tours';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AllToursPage() {
  return (
    <div className="app bg-gray-800">
      <Navbar />
      <div className="pt-16">
        <ProtectedRoute allowedRoles={[2020, 2021, 2022, 2023]}>
          <Tours />
        </ProtectedRoute>
      </div>
    </div>
  );
} 