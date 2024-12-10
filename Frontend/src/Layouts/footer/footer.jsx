import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#d6d6d8]  via-[#f5f5f8] to-[#fcfcfd] text-gray-900 py-6">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6">
          {/* Facebook */}
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-gray-600 hover:text-blue-500"
          >
            <FaFacebook />
          </a>

          {/* Twitter */}
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-gray-600 hover:text-blue-400"
          >
            <FaTwitter />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-gray-600 hover:text-pink-500"
          >
            <FaInstagram />
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-900 ">
          &copy; {new Date().getFullYear()} IT Help Desk Ticketing System - IRD. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;