import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImageSrc from '../../images/IRDlogo.png';
import { FaBars, FaTimes } from 'react-icons/fa'; // For hamburger and close icons
import LogoutButton from '../../components/common/LogoutButton';

const Header = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null); // State for active submenu
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const token = localStorage.getItem('token');
  const role = localStorage.getItem("userRole");

  // Toggle submenu for specific services
  const toggleMenu = (menuId) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };


  return (
    <header className="p-4 shadow-lg bg-gradient-to-b from-[#14142c] via-[#0f0f55] to-[#151557] border-b-4 border-[#a2c516] w-full top-0 z-10">
      <div className="flex items-center justify-between align-bottom">
        {/* Logo and Name Section */}
        <div className="flex items-center">
          <img src={logoImageSrc} alt="Logo" className="w-80" />
         
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-10 ml-8">
          <Link to="/" className="text-gray-300 hover:text-white transition duration-300">
            Home
          </Link>

          {token ? (
            <>
              {role === "admin" && (
                <>
                  <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">
                    Dashboard
                  </Link>
                  <Link to="/users" className="text-gray-300 hover:text-white transition duration-300">
                    Manage Users
                  </Link>
                 
                 
                  <div className="relative">
                  <button
                    onClick={() => toggleMenu('tickets')}
                    className="text-gray-300 hover:text-white transition duration-300 focus:outline-none flex items-center"
                  >
                   Tickets
                    <span className="ml-2 text-sm">&#9660;</span>
                  </button>
                  {activeMenu === 'tickets' && (
                    <div className="absolute mt-2 bg-white shadow-lg rounded-lg py-2 w-48"> 
                      <Link to="/tickets" className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white">
                        Manag Tickets
                      </Link>
                      <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white">
                        Assign Priority
                      </Link>
                      <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white">
                      View Pending Requests
                      </Link>
                    </div>
                  )}
                </div>


                  <div className="relative">
                  <button
                    onClick={() => toggleMenu('report')}
                    className="text-gray-300 hover:text-white transition duration-300 focus:outline-none flex items-center"
                  >
                    Reports
                    <span className="ml-2 text-sm">&#9660;</span>
                  </button>
                  {activeMenu === 'report' && (
                    <div className="absolute mt-2 bg-white shadow-lg rounded-lg py-2 w-48"> 
                      <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white">
                        Report 1
                      </Link>
                      <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white">
                        Report 2
                      </Link>
                    </div>
                  )}
                </div>
                </>
              )}

              {role === "staff" && (
                <>
                  <Link to="/tickets" className="text-gray-300 hover:text-white transition duration-300">My Ticket</Link>
                  <Link to="/new-ticket" className="text-gray-300 hover:text-white transition duration-300">Create Ticket</Link>
                </>
              )}

              {role === "it_director" && (
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">Dashboard</Link>
              )}

              {role === "it_staff" && (
                <>
                  <Link to="/assign-ticket" className="text-gray-300 hover:text-white transition duration-300">Assign Ticket</Link>
                  <Link to="/update-status" className="text-gray-300 hover:text-white transition duration-300">Update Status</Link>
                </>
              )}

              {role === "it_officier" && (
                <>
                  <Link to="/assign-priority" className="text-gray-300 hover:text-white transition duration-300">Assign Priority</Link>
                  <Link to="/pending-requests" className="text-gray-300 hover:text-white transition duration-300"> View Pending Requests</Link>
                  <Link to="/reports" className="text-gray-300 hover:text-white transition duration-300">Reports</Link>
                </>
              )}

              {role === "account_staff" && (
<>
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">View offsite tickets</Link>    
                <div className="relative">
                  <button
                    onClick={() => toggleMenu('servicecompany')}
                    className="text-gray-300 hover:text-white transition duration-300 focus:outline-none flex items-center"
                  >
                    Service Company
                    <span className="ml-2 text-sm">&#9660;</span>
                  </button>
                  {activeMenu === 'servicecompany' && (
                    <div className="absolute mt-2 bg-white shadow-lg rounded-lg py-2 w-48"> 
                      <Link to="/add-service" className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white">
                        Add Service Company
                      </Link>
                      <Link to="/service" className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white">
                        Manage Service
                      </Link>
                    </div>
                  )}
                </div>
                          <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">payment</Link>
                </>
              )}

              {role === "supply_staff" && (
                <>
                <Link to="/add-device" className="text-gray-300 hover:text-white transition duration-300">Add New IT Equipment</Link>
                <Link to="/manage-device" className="text-gray-300 hover:text-white transition duration-300">Manage Equipments</Link>
                </>
              )}

              {/* Common Links for All Logged-in Users */}
              <Link to="/contact" className="text-gray-300 hover:text-white transition duration-300">Contact</Link>
              <Link to="/faq" className="text-gray-300 hover:text-white transition duration-300">FAQ</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              {/* Links for Non-logged-in Users */}
              
              <Link to="AboutUs" className="text-gray-300 hover:text-white transition duration-300">About Us</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition duration-300">Contact</Link>
              <Link
                to="/signIn"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300"
              >
                Login
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger Icon */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu" className="text-white focus:outline-none">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`lg:hidden space-y-4 mt-4 ${menuOpen ? "block" : "hidden"}`}>
        <Link to="/" className="block text-gray-300 hover:text-white transition duration-300">
          Home
        </Link>
        {token ? (
          <>
            <Link to="/dashboard/my-ticket" className="block text-gray-300 hover:text-white transition duration-300">
              My Ticket
            </Link>
            <Link to="/dashboard/create-ticket" className="block text-gray-300 hover:text-white transition duration-300">
              Create Ticket
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition duration-300">
              Contact
            </Link>
            <Link to="/faq" className="text-gray-300 hover:text-white transition duration-300">
              FAQ
            </Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link to="/faq" className="text-gray-300 hover:text-white transition duration-300">
              FAQ
            </Link>
            <Link to="/about-us" className="text-gray-300 hover:text-white transition duration-300">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition duration-300">
              Contact
            </Link>
            <Link
              to="/signIn"
              className="block bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;