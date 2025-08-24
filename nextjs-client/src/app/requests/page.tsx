import Navbar from '@/components/Navbar';
import Requests from '@/components/Requests';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function RequestsPage() {
  return (
    <div className="app bg-gray-800">
      <Navbar />
      <div className="pt-16">
        <ProtectedRoute allowedRoles={[2021, 2022, 2023]}>
          <Requests />
        </ProtectedRoute>
      </div>
    </div>
  );
} 