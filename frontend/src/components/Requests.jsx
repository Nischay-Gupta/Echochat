import React, { useContext, useEffect } from 'react';
import FriendRequests from './FriendRequests';
import Context from '../context/Context';
import SideBar  from "./SideBar.jsx"
import {  useNavigate } from 'react-router-dom';
const Requests = () => {
  const { friendRequests,Requests } = useContext(Context)
  const navigate = useNavigate()
  
  useEffect(()=>{
    friendRequests()
  },[])
  return (
    <>
      <div className="friends-container flex flex-col lg:flex-row w-full h-screen lg:h-auto">
        {/* Main Content Area */}
        <SideBar/>

        <div
          className="main-content w-full p-4 bg-[#020b1f] text-white flex-grow lg:ml-64 lg:mt-2 mt-14 overflow-y-auto"
          style={{
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* Internet Explorer and Edge */
          }}
        >
          {/* Hide scrollbar for WebKit browsers */}
          <style>
            {`
              .main-content::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          {/* Header Section */}
          <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-4">
            {/* Back Button */}
            <svg
              className="w-6 h-6 text-white cursor-pointer mr-2"
              fill="white" // Set fill to white
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={()=>{
                navigate("/echochat")
              }}

            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12H3m0 0l6 6m-6-6l6-6"
              />
            </svg>
            <span className="font-bold">Accept or Reject Friend Requests</span>
          </div>

          {/* Friend List Container */}
          <div
            className="friend-list mt-6 space-y-4"
            style={{
              maxHeight: 'calc(100vh - 140px)', /* Adjust height for header and margin */
              overflowY: 'auto',
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* Internet Explorer and Edge */
            }}
          >
            <style>
              {`
                .friend-list::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            { Requests.length > 0 ? (Requests.map((data) =>
              <FriendRequests
                key={data.sender}
                userName={data.sender} />)) : (
                  <p className="text-gray-400 text-center">No new friends Request found.</p>
                )}
 
          </div>
        </div>
      </div>
    </>
  );
};

export default Requests;
