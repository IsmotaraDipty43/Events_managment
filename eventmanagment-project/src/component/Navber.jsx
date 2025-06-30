import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdLogIn } from 'react-icons/io';
import { RiLogoutCircleLine } from 'react-icons/ri';
import logo from '../assets/logo.png';
import { useAuth } from '../AuthContext'; // Auth context hook

const Navber = () => {
  const { user, logoutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false); // user dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // mobile nav menu
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    setDropdownOpen(false);
    navigate('/login');
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  // Nav links array (used for desktop and mobile menu)
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/events', label: 'Events' },
    { to: '/addevents', label: 'Add Event' },
    { to: '/myevents', label: 'My Event' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full  z-20 ">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 bg-black/30 backdrop-blur-sm">
        {/* Logo + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Hamburger button for mobile */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <img src={logo} alt="Logo" className="w-8 h-8" />
            Organizo
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-lg font-semibold transition duration-300 ${
                  isActive
                    ? 'text-red-500 border-b-2 border-red-500 pb-1'
                    : 'text-white hover:text-red-400'
                }`
              }
              end
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right Side: User or Login */}
        <div className="flex items-center gap-4 relative">
          {user ? (
            <div className="relative">
              <img
                src={user.image}
                alt="User"
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-30">
                  <p className="px-4 py-2 text-sm text-gray-700 font-medium border-b">
                    {user.name}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                  >
                    <RiLogoutCircleLine /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center gap-1 px-3 py-2 bg-white text-black rounded-md font-semibold text-lg hover:bg-gray-100"
            >
              <IoMdLogIn /> Login
            </NavLink>
          )}
        </div>
      </div>

    {mobileMenuOpen && (
  <nav className="lg:hidden bg-white rounded-md shadow-lg px-4 py-4 border border-gray-300 max-w-xs mt-1 ml-2">
    <ul className="flex flex-col space-y-3">
      {navLinks.map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block text-gray-800 text-lg font-semibold px-3 py-2 rounded-md transition-colors duration-300 ${
                isActive ? 'bg-red-100' : 'hover:bg-red-50'
              }`
            }
            end
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
)}



    </div>
  );
};

export default Navber;
