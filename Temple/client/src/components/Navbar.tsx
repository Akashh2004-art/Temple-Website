import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/booking', label: 'Book Puja' },
    { path: '/donations', label: 'Donations' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Temple Name with custom Bengali font */}
          <Link to="/" className="flex items-center">
  <span 
    className="text-xl md:text-2xl lg:text-3xl font-bold transition-all duration-300"
    style={{ 
      fontFamily: "'Noto Serif Bengali', serif",
      color: '#1a1a1a'
    }}
  >
    বীরশিবপুর শ্রী শ্রী সাধারণ হরিসভা
  </span>
</Link>

{/* Desktop Navigation */}
<div className="hidden md:flex items-center space-x-4">
  {navLinks.map((link) => (
    <Link
      key={link.path}
      to={link.path}
      className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-orange-500 hover:text-white transition-all duration-300"
    >
      {link.label}
    </Link>
  ))}

            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                <span className="text-gray-600">{user.name}</span>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-orange-500 transition-colors duration-300 p-2"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with immediate slide animation */}
      <div 
        className={`md:hidden fixed top-16 left-0 right-0 bg-white shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'h-auto visible' 
            : 'h-0 invisible'
        }`}
        style={{ overflow: 'hidden' }}
      >
        <div className="py-2 flex flex-col items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-4 text-sm font-medium text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition-all duration-200 border-b border-orange-100"
            >
              {link.label}
            </Link>
          ))}
          
          {/* ... rest of the menu items ... */}
        </div>
      </div>

      {/* Mobile menu with gradient background */}
      <div 
        className={`md:hidden fixed top-16 left-0 w-full bg-gradient-to-b from-orange-50 to-white backdrop-blur-sm shadow-lg z-50 transition-all duration-300 transform ${
          isOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="py-2 flex flex-col items-center bg-white/30">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-4 text-sm font-medium text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition-all duration-200 border-b border-orange-100"
            >
              {link.label}
            </Link>
          ))}
          
          {user ? (
            <>
              <div className="w-full text-center px-4 py-4 text-sm font-medium text-gray-700 border-b border-orange-100">
                {user.name}
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full text-center px-4 py-4 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 last:border-b-0"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center px-4 py-4 text-sm font-medium text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition-all duration-200 border-b border-orange-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="w-full text-center px-4 py-4 text-sm font-medium text-gray-700 hover:bg-orange-100 hover:text-orange-500 transition-all duration-200 last:border-b-0"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;