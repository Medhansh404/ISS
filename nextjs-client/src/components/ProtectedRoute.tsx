'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: number[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('ProtectedRoute useEffect - User:', user);
    console.log('ProtectedRoute useEffect - Allowed roles:', allowedRoles);
    console.log('ProtectedRoute useEffect - IsLoading:', isLoading);
    
    if (!isLoading) {
      if (!user) {
        console.log('No user, redirecting to login');
        router.push('/login');
        return;
      }

      if (allowedRoles && user.role) {
        console.log('User roles:', user.role);
        const hasRequiredRole = user.role.some(role => allowedRoles.includes(role));
        console.log('Has required role:', hasRequiredRole);
        if (!hasRequiredRole) {
          console.log('User does not have required role, redirecting to dashboard');
          router.push('/dashboard');
          return;
        }
      }
    }
  }, [user, isLoading, allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (allowedRoles && user.role) {
    const hasRequiredRole = user.role.some(role => allowedRoles.includes(role));
    if (!hasRequiredRole) {
      return null;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute; 