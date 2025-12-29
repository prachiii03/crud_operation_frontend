import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-white text-2xl font-bold">
            CRUD App
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                isActive('/')
                  ? 'bg-white text-blue-600'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Home
            </Link>
            <Link
              to="/users"
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                isActive('/users')
                  ? 'bg-white text-blue-600'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Users
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;