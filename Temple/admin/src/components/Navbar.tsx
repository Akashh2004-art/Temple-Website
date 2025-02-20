// Navbar.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
            <Link to="/users" className="text-gray-700 hover:text-blue-600">Users</Link>
            <Link to="/events" className="text-gray-700 hover:text-blue-600">Events</Link>
            <Link to="/bookings" className="text-gray-700 hover:text-blue-600">Bookings</Link>
            <Link to="/donations" className="text-gray-700 hover:text-blue-600">Donations</Link>
            <Link to="/gallery" className="text-gray-700 hover:text-blue-600">Gallery</Link>
            <button className="text-red-600 hover:text-red-800">Logout</button>
          </div>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
          >
            {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full p-4">
          <ul className="space-y-3 text-center">
            <li><Link to="/" className="block p-2" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
            <li><Link to="/users" className="block p-2" onClick={() => setMenuOpen(false)}>Users</Link></li>
            <li><Link to="/events" className="block p-2" onClick={() => setMenuOpen(false)}>Events</Link></li>
            <li><Link to="/bookings" className="block p-2" onClick={() => setMenuOpen(false)}>Bookings</Link></li>
            <li><Link to="/donations" className="block p-2" onClick={() => setMenuOpen(false)}>Donations</Link></li>
            <li><Link to="/gallery" className="block p-2" onClick={() => setMenuOpen(false)}>Gallery</Link></li>
            <li><button className="w-full text-center p-2 text-red-600 hover:bg-gray-100 rounded" onClick={() => setMenuOpen(false)}>Logout</button></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
