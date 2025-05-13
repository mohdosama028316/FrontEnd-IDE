import React, { useState } from 'react';
import logo from "../images/logos/logo2-a.png";
import { Link, useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';

const SignUp = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName,
        email,
        pwd
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        navigate("/login");
      } else {
        toast.error(data.msg);
      }
    });
  };

  return (
    <div className="con flex flex-col items-center justify-center min-h-screen px-4">
      <form
        onSubmit={submitForm}
        className='w-full max-w-sm flex flex-col items-center bg-[#0f0e0e] p-6 rounded-lg shadow-xl shadow-black/50'
      >
        <img className='w-[200px] object-cover mb-4' src={logo} alt="Logo" />

        <div className="inputBox w-full mb-3">
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            placeholder='Full Name'
            required
            className="w-full px-3 py-2 rounded bg-[#1c1c1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="inputBox w-full mb-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder='Email'
            required
            className="w-full px-3 py-2 rounded bg-[#1c1c1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="inputBox w-full mb-3">
          <input
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            type="password"
            placeholder='Password'
            required
            className="w-full px-3 py-2 rounded bg-[#1c1c1c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <p className='text-gray-400 text-sm mt-1 self-start'>
          Already have an account? <Link to="/login" className='text-blue-500'>Login</Link>
        </p>

        <button className="btnNormal mt-4 w-full py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-all">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
