import React from 'react';

const FriendItem = ({ name, onClick }) => {
  return (
    <div
      className="friend-item flex items-center justify-between p-3 rounded-lg cursor-pointer transition duration-300
        bg-[#ffffff1a] backdrop-blur-lg text-gray-300 border border-gray-600 hover:bg-[#ffffff33] m-1"
      onClick={onClick}
    >
      <span className="text-md font-medium">{name}</span>
    </div>
  );
};

export default FriendItem;
