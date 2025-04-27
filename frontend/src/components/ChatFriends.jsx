import React, { useContext, useEffect } from 'react';
import FriendItem from './FriendItem';  // Assuming FriendItem is already created
import Context from '../context/Context';



const ChatFriends = ({ onFriendClick }) => {
  const { chatFriends,Friends } = useContext(Context)
  useEffect(() => {
    chatFriends()
   
  }, [])
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Friends</h2>
      <hr className="border-gray-700 mb-4" />
      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-150px)]"> 
        {Friends?.map((friend) => (
          <FriendItem
            key={friend}
            name={friend}
            onClick={() => onFriendClick(friend)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatFriends;
