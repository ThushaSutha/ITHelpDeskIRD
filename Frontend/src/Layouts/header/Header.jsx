import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImageSrc from '../../images/logo-light.svg';
import { FaBars, FaTimes } from 'react-icons/fa'; // For hamburger and close icons
import LogoutButton from '../../components/common/LogoutButton';

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem('token');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const role = localStorage.getItem("userRole");

  return (
    <header className="p-6 shadow-lg bg-gray-900  w-full top-0 z-10">
  <div className="flex items-center justify-between">
    {/* Logo and Name Section */}
    <div className="flex items-center">
      <img src={logoImageSrc} alt="Logo" className="w-24" />
      <h2 className="text-2xl lg:text-5xl text-white font-serif ml-5">IRD</h2>
    </div>

    {/* Navigation Links for Desktop */}
    <nav className="hidden lg:flex space-x-8 ml-auto">
      <Link to="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link>
      {token != null ?(
        <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">Dashboard</Link>
      ):(
        ""
      )}
      {location.pathname === '/' ? (
        <>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">FAQ</a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">About Us</a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">Contact</a>
          {token != null ?(
            <></>
          ):(
            <Link
            to="/signIn"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            Login
          </Link>
          )}
          
        </>
      ) : (
        <>
  {role === "admin" ? (
    <>
      <Link to="/users" className="text-gray-300 hover:text-white transition duration-300">Manage Users</Link>
      <Link to="/tickets" className="text-gray-300 hover:text-white transition duration-300">Manage Tickets</Link>
      
    </>
  ) : (
    <>
      <Link to="/tickets" className="text-gray-300 hover:text-white transition duration-300">My Ticket</Link>
      <Link to="/new-ticket" className="text-gray-300 hover:text-white transition duration-300">Create Ticket</Link>
    </>
  )}
  <a href="#" className="text-gray-300 hover:text-white transition duration-300">Contact</a>
  <a href="#" className="text-gray-300 hover:text-white transition duration-300">FAQ</a>
  <LogoutButton />
</>
      )}
    </nav>

    {/* Hamburger Icon for Mobile */}
    <div className="lg:hidden">
      <button onClick={toggleMenu} aria-label="Toggle Menu" className="text-white focus:outline-none">
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    </div>
  </div>

  {/* Navigation Links for Mobile */}
  <nav className={`lg:hidden space-y-4 mt-4 ${menuOpen ? "block" : "hidden"}`}>
    <Link to="/" className="block text-gray-300 hover:text-white transition duration-300">Home</Link>
    {location.pathname === '/' ? (
      <>
        <a href="#" className="block text-gray-300 hover:text-white transition duration-300">FAQ</a>
        <a href="#" className="block text-gray-300 hover:text-white transition duration-300">About Us</a>
        <a href="#" className="block text-gray-300 hover:text-white transition duration-300">Contact</a>
        <Link
          to="/signIn"
          className="block bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Login
        </Link>
      </>
    ) : (
      <>
        <Link to="/dashboard/my-ticket" className="block text-gray-300 hover:text-white transition duration-300">My Ticket</Link>
        <Link to="/dashboard/create-ticket" className="block text-gray-300 hover:text-white transition duration-300">Create Ticket</Link>
        <a href="#" className="block text-gray-300 hover:text-white transition duration-300">Contact</a>
        <a href="#" className="block text-gray-300 hover:text-white transition duration-300">FAQ</a>
        <Link
          to="/"
          className="block bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Logout
        </Link>
      </>
    )}
  </nav>
</header>

  );
};

export default Header;
