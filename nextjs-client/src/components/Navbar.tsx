'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link href="/">ISI Travel</Link>
          </div>
          
          {/* Links */}
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/"
                className="hover:text-gray-300 transition duration-200"
              >
                Home
              </Link>
            </li>
            
            {user ? (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-gray-300 transition duration-200"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/allTours"
                    className="hover:text-gray-300 transition duration-200"
                  >
                    Tours
                  </Link>
                </li>
                {user.role && [2021, 2022, 2023].some(r => user.role.includes(r)) && (
                  <li>
                    <Link
                      href="/requests"
                      className="hover:text-gray-300 transition duration-200"
                    >
                      Requests
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={logout}
                    className="hover:text-gray-300 transition duration-200"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="hover:text-gray-300 transition duration-200"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 