import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImageSrc from '../../images/IRDlogo.png';
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
    <header className="p-4 shadow-lg bg-gradient-to-b from-[#14142c]  via-[#0f0f55] to-[#151557] border-b-4 border-[#a2c516] w-full top-0 z-10">
  <div className="flex items-center justify-between">
    {/* Logo and Name Section */}
    <div className="flex items-center">
    <img src={logoImageSrc} alt="Logo" className="w-24" />
    <h2 className="text-2xl lg:text-2xl text-white  ml-5 font-display font-bold">Sri Lanka Inland Revenue</h2>
    </div>
  

    <nav className="hidden lg:flex space-x-8 ml-auto">
  {/* Always visible */}
  <Link to="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link>

  {token != null ? (
    <>
      {/* Admin-specific links */}
      {role === "admin" ? (
        <>
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">Dashboard</Link>
          <Link to="/users" className="text-gray-300 hover:text-white transition duration-300">Manage Users</Link>
          <Link to="/tickets" className="text-gray-300 hover:text-white transition duration-300">Manage Tickets</Link>
        </>
      ) : role === "staff" ? (
        <>
          {/* Non-admin user-specific links */}
          <Link to="/tickets" className="text-gray-300 hover:text-white transition duration-300">My Ticket</Link>
          <Link to="/new-ticket" className="text-gray-300 hover:text-white transition duration-300">Create Ticket</Link>
          {/* <Link to="/add-service" className="text-gray-300 hover:text-white transition duration-300">Add Service Com</Link> */}
          {/* <Link to="/add-device" className="text-gray-300 hover:text-white transition duration-300">Add Device</Link> */}
          
        </>
      ): role === "it_director" ?(
        <>
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">Dashboard</Link>
        </>
      ): role === "it_staff" ? (
        <>
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">Assign ticket</Link>
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">update status</Link>
        </>
      ): role === "it_in_charge" ? (
        <>
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">Assign Priority</Link>
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">view pending repair requests</Link>
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">Reports</Link>
        </>
      ): role === "account_staff" ? (
        <>
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">View offsite tickets</Link>
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">Add service companies</Link>
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">payment</Link>
        </>
      ) : role === "supply_staff" ? (
        <>
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">Add new IT Equipment</Link>
        </>
      ):(
        <>
        </>
      )}
      {/* Common links for logged-in users */}
      <Link to="/Contact" className="text-gray-300 hover:text-white transition duration-300">Contact</Link>
      <Link to="/FAQ" className="text-gray-300 hover:text-white transition duration-300">FAQ</Link>
      <LogoutButton />
    </>
  ) : (
    <>
      {/* Links visible for non-logged-in users */}
      <Link to="/FAQ" className="text-gray-300 hover:text-white transition duration-300">FAQ</Link>
      <Link to="/AboutUs" className="text-gray-300 hover:text-white transition duration-300">About Us</Link>
      <Link to="/Contact" className="text-gray-300 hover:text-white transition duration-300">Contact</Link>
      <Link
        to="/signIn"
        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
        Login
      </Link>
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
        <Link to="/FAQ" className="text-gray-300 hover:text-white transition duration-300">FAQ</Link>
        <Link to="/AboutUs" className="text-gray-300 hover:text-white transition duration-300">About Us</Link>
        <Link to="/Contact" className="text-gray-300 hover:text-white transition duration-300">Contact</Link>
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
        <Link to="/Contact" className="text-gray-300 hover:text-white transition duration-300">Contact</Link>
        <Link to="/FAQ" className="text-gray-300 hover:text-white transition duration-300">FAQ</Link>
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
