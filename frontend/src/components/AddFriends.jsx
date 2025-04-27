import React, { useContext, useEffect } from 'react';
import AddFriendComponent from './AddFriendComponent';
import Context from '../context/Context';
import { useNavigate } from "react-router-dom";
const AddFriends = () => {
  const navigate = useNavigate()
  const { addNewFriends, addFriends } = useContext(Context)
  useEffect(() => {
    addFriends()
  }, [])
  return (
    <>
      <div className="friends-container flex flex-col lg:flex-row w-full h-screen lg:h-auto">
        {/* Main Content Area for Laptops */}
        <div className="main-content w-full lg:ml-64 p-4 bg-[#020b1f] text-white flex-grow mt-12 lg:mt-0 overflow-y-auto hide-scrollbar">
          {/* Header Section */}
          <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-4">
            <h2 className="text-xl font-bold">Add New Friends</h2>
            <a href="#" className="text-blue-400 underline hover:text-blue-600"
              onClick={() => {
                navigate("/Requests")
              }}
            >
              Requests
            </a>
          </div>

          {/* Friend List Section */}
          <div className="friend-list mt-6 space-y-4 h-[calc(100vh-120px)] lg:h-auto overflow-y-auto hide-scrollbar">
            {addNewFriends && addNewFriends.length > 0 ? (
              addNewFriends.map((data) => (
                <AddFriendComponent
                  key={data.userName}
                  userName={data.userName}
                />
              ))
            ) : (
              <p className="text-gray-400 text-center">No new friends found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFriends;
