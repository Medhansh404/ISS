import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <div className="app bg-gray-800">
      <Navbar />
      <div className="pt-16">
        <ProtectedRoute allowedRoles={[2020, 2021, 2022, 2023]}>
          <Dashboard />
        </ProtectedRoute>
      </div>
    </div>
  );
} 