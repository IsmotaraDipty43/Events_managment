import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import logo from "../assets/logo.png"; 

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6 md:px-20 w-full md:container mx-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <div>
          <img src={logo} alt="Organizo Logo" className="h-12 mb-4" />
          <p className="text-base">
            Organizo is your all-in-one event management partner, making moments unforgettable.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
          <p className="text-base">Phone: +880 1234 567890</p>
          <p className="text-base">Email: support@organizo.com</p>
          <p className="text-base">Location: Dhaka, Bangladesh</p>
        </div>

        {/* Email Subscription */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Subscribe</h3>
          <p className="text-base mb-3">Get updates and offers directly in your inbox.</p>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white px-4 py-2 rounded-md text-black text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-5 py-2 rounded-md transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-base">
        <p className="text-gray-500 mb-4 md:mb-0">
          © {new Date().getFullYear()} Organizo. All rights reserved.
        </p>
        <div className="flex gap-4 text-lg">
          <a href="#" className="hover:text-white text-lg"><FaFacebookF /></a>
          <a href="#" className="hover:text-white text-lg"><FaTwitter /></a>
          <a href="#" className="hover:text-white text-lg"><FaInstagram /></a>
          <a href="#" className="hover:text-white text-lg"><FaEnvelope /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
