import React, { useContext, useState } from 'react';
import Context from '../context/Context';

const AddFriendComponent = ({ userName }) => {
  const { sendFriendRequest, cancelFriendRequest } = useContext(Context);
  
  const [requestSent, setRequestSent] = useState(false);

  // Send friend request function
  const handleSendRequest = async () => {
    try {
      await sendFriendRequest(userName); // Send the friend request
      setRequestSent(true); // Update the state to reflect the request has been sent
    } catch (error) {
      console.error("Error sending friend request", error);
    }
  };

  // Cancel friend request function
  const handleCancelRequest = async () => {
    try {
      await cancelFriendRequest(userName); // Cancel the friend request
      setRequestSent(false); // Update the state to reflect the request has been canceled
    } catch (error) {
      console.error("Error canceling friend request", error);
    }
  };

  return (
    <div className="friend-item flex justify-between items-center p-4 mb-4 bg-[#1c2541] bg-opacity-60 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg">
      <div className="text-white font-semibold text-lg">
        {userName}
      </div>

      {/* Conditionally render buttons based on `requestSent` */}
      {!requestSent ? (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          onClick={handleSendRequest}
        >
          Add Friend
        </button>
      ) : (
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          onClick={handleCancelRequest}
        >
          Cancel Request
        </button>
      )}
    </div>
  );
};

export default AddFriendComponent;
