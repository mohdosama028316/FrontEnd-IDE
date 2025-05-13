import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[rgb(15,14,14)] text-white flex flex-col items-center justify-center py-10 px-6">
        <h1 className="text-4xl font-bold text-blue-500 mb-6 text-center">Get in Touch</h1>

        <div className="bg-gray-900 shadow-xl rounded-lg p-8 w-full max-w-lg transition-transform transform hover:scale-105 duration-300 hover:shadow-2xl">
          <div className="space-y-4">
            <p className="flex items-center gap-3 text-lg hover:text-blue-400 transition-all">
              <MapPin className="text-blue-400 hover:text-blue-500 transition-all" />
              Lucknow, Uttar Pradesh
            </p>
            <p className="flex items-center gap-3 text-lg hover:text-blue-400 transition-all">
              <Phone className="text-green-400 hover:text-green-500 transition-all" />
              <a href="tel:+919984175921" className="hover:text-blue-400 transition-all">+91 9984175921</a>
            </p>
            <p className="flex items-center gap-3 text-lg hover:text-blue-400 transition-all">
              <Mail className="text-yellow-400 hover:text-yellow-500 transition-all" />
              <a href="mailto:mohdosama028316@gmail.com" className="hover:text-blue-400 transition-all">mohdosama028316@gmail.com</a>
            </p>
            <p className="flex items-center gap-3 text-lg hover:text-blue-400 transition-all">
              <Linkedin className="text-blue-500 hover:text-blue-600 transition-all" />
              <a href="https://www.linkedin.com/in/mohd-osama-9569a1297" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all">LinkedIn</a>
            </p>
            <p className="flex items-center gap-3 text-lg hover:text-blue-400 transition-all">
              <Github className="text-gray-400 hover:text-gray-500 transition-all" />
              <a href="https://github.com/mohdosama028316" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all">GitHub</a>
            </p>
            <p className="flex items-center gap-3 text-lg hover:text-blue-400 transition-all">
              <Globe className="text-purple-400 hover:text-purple-500 transition-all" />
              <a href="https://mohdosama028316.github.io/OsamaPortfolio/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-all">Portfolio</a>
            </p>
          </div>
        </div>

        <footer className="mt-8 text-gray-400 text-sm text-center">
          © 2025 Mohd Osama. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Contact;
