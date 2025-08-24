import Navbar from '@/components/Navbar';
import Status from '@/components/Status';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function StatusPage() {
  return (
    <div className="app bg-gray-800">
      <Navbar />
      <div className="pt-16">
        <ProtectedRoute allowedRoles={[2020, 2021, 2022, 2023]}>
          <Status />
        </ProtectedRoute>
      </div>
    </div>
  );
} 