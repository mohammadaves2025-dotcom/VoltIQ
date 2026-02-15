import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiZap } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();

  return (

    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
          <FiZap className="text-yellow-400 text-2xl" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            VoltIQ
          </h1>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-white font-medium">
          <Link to="/" className="hover:text-yellow-400 transition duration-300">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-yellow-400 transition duration-300">
            Dashboard
          </Link>
          <Link to="/howitworks" className="hover:text-yellow-400 transition duration-300">
            About
          </Link>
        </div>

        {/* CTA Button */}
        <Link
          to="/dashboard"
          className="hidden md:inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-5 py-2 rounded-full shadow-md hover:scale-105 transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

