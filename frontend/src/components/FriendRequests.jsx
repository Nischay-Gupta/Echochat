import React, { useContext } from 'react'
import Context from '../context/Context';

const FriendRequests = ({ userName }) => {
  const { acceptRequest, rejectRequest } = useContext(Context)
  const handleAcceptRequest = async (userName) => {
    try {
      await acceptRequest(userName);
    } catch (error) {
      console.error("Error sending friend request", error);
    }
  };


  const handleRejectRequest = async (userName) => {
    try {
      await rejectRequest(userName);

    } catch (error) {
      console.error("Error canceling friend request", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between bg-[#1e2634] p-4 border-b m-2 border-gray-700 rounded-lg shadow-lg">

        <span className="text-white text-lg font-bold">{userName}</span>

        <div className="flex space-x-2">

          <button
            className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg transition duration-300 hover:bg-blue-500"
            onClick={() => { handleAcceptRequest(userName) }}
          >
            Accept
          </button>

          <button
            className="bg-transparent border border-gray-500 text-gray-400 font-semibold py-2 px-5 rounded-lg transition duration-300 hover:bg-gray-500 hover:text-white"
            onClick={() => { handleRejectRequest(userName) }}
          >
            Reject
          </button>
        </div>
      </div>

    </>
  )
}

export default FriendRequests
