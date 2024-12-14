import React from "react";
import { Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { auth } = useAuth();
  const { role } = auth.roles || {}; // Safely destructure role

  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link to="/">My App</Link>
          </div>
          {/* Links */}
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="hover:text-gray-300 transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-gray-300 transition duration-200"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-gray-300 transition duration-200"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/allTours"
                className="hover:text-gray-300 transition duration-200"
              >
                Tours
              </Link>
            </li>
            {role && [2021, 2022, 2023].includes(role) && (
              <li>
                <Link
                  to="/requests"
                  className="hover:text-gray-300 transition duration-200"
                >
                  Requests
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
