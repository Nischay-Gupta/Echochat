import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Context from '../context/Context.js';

const Landingpage = () => {
  const {cheakAuth,Success}=useContext(Context)

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/register");
  };
  if(Success){
    navigate("/echochat");
  }
  useEffect(() => {
    cheakAuth()
  }, [])
  return (
    <div className="min-h-screen bg-[#020b1f] relative overflow-hidden flex flex-col">
      {/* Navigation bar */}
      <nav className="flex justify-between items-center p-6 z-10 relative">
        <div className="text-white text-3xl font-bold">EchoChat</div>
        <button
          className="bg-white text-blue-600 font-semibold py-2 px-4 rounded shadow hover:bg-blue-200 transition duration-300 cursor-pointer"
          onClick={handleNavigate}
        >
          Get Started
        </button>
      </nav>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center h-full text-center z-10">
        <h1 className="text-6xl font-bold text-white mb-4 animate-pulse">Welcome to EchoChat</h1>
        <p className="text-lg text-gray-300 mb-8 max-w-lg">
          Connect with friends and family through seamless messaging. Join us and start your journey in the world of conversations!
        </p>
        <button
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300 cursor-pointer"
          onClick={handleNavigate}
        >
          Get Started
        </button>
      </div>

      {/* Animated background */}
      <div className="animated-background absolute top-0 left-0 w-full h-full z-0 pointer-events-none"></div>
      
      {/* Moving spheres */}
      <div className="moving-spheres absolute top-0 left-0 w-full h-full">
        <div className="sphere"></div>
        <div className="sphere"></div>
        <div className="sphere"></div>
      </div>
    </div>
  );
};

export default Landingpage;
