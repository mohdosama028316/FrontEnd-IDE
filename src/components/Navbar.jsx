import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../images/logos/logo2-a.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  return (
    <nav className="bg-[#0f0e0e] px-8 md:px-[100px] h-[90px] flex items-center justify-between relative shadow-lg">
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <img src={logo} className="w-[150px] md:w-[170px] object-cover transition-transform duration-300 hover:scale-105" alt="Logo" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-center flex-1">
        <div className="flex gap-[30px] text-white text-lg">
          <Link className="hover:text-blue-400 hover:underline" to="/">Home</Link>
          <Link className="hover:text-blue-400 hover:underline" to="/about">About</Link>
          <Link className="hover:text-blue-400 hover:underline" to="/contact">Contact</Link>
        </div>
      </div>

      {/* Right Buttons */}
      <div className="hidden md:flex items-center gap-4 ml-auto text-white">
        <button 
          onClick={() => { window.location.href = "/review"; }} 
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
        >
          AI Review
        </button>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg shadow-md hover:shadow-lg"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[90px] left-0 w-full bg-[#0f0e0e] flex flex-col items-center gap-4 py-5 text-white z-50 shadow-lg animate-fade-in">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <button 
            onClick={() => { window.location.href = "/review"; }} 
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
          >
            AI Review
          </button>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
