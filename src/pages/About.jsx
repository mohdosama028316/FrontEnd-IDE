import React from 'react';
import Navbar from '../components/Navbar';
import { Code, Brain, Users } from 'lucide-react';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12 text-center text-white">
        <h1 className="text-4xl font-bold mb-6">About Our Application</h1>

        <p className="text-lg mb-4 max-w-2xl mx-auto">
          Welcome to our platform! We're on a mission to revolutionize the way developers write and review code.
          With a seamless interface, AI-powered insights, and collaboration features — your development process becomes faster, smarter, and smoother.
        </p>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-[#1f1f1f] p-6 rounded-lg shadow hover:shadow-lg transition-all">
            <Code size={40} className="mx-auto text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-Time Coding</h3>
            <p>Write, run, and test your code in an instant with our powerful editor.</p>
          </div>

          <div className="bg-[#1f1f1f] p-6 rounded-lg shadow hover:shadow-lg transition-all">
            <Brain size={40} className="mx-auto text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Code Review</h3>
            <p>Leverage AI to detect bugs, suggest improvements, and follow best practices.</p>
          </div>

          <div className="bg-[#1f1f1f] p-6 rounded-lg shadow hover:shadow-lg transition-all">
            <Users size={40} className="mx-auto text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
            <p>Work with your team in real-time — share, review, and edit code together.</p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-300">
            We aim to empower developers with tools that not only make coding efficient but also fun and collaborative.
            Our focus is on creating a community where learning, building, and innovating happen together.
          </p>
        </div>

        {/* Team or Vision Statement */}
        <div className="mt-20 bg-[#1a1a1a] py-10 px-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Built by Developers, for Developers</h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Our team consists of passionate engineers, designers, and AI enthusiasts who understand the challenges of modern development.
            This application is our attempt to make your life a little easier — and a lot more productive.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
