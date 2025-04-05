import React, { useState } from 'react'
import ChatFriends from './ChatFriends'  // Your component to display the list of friends
import ChatComponent from "./ChatComponent";  // The updated chat component

const ChatLayout = () => {
    const [selectedFriend, setSelectedFriend] = useState(null);

    const handleFriendClick = (friend) => {
      setSelectedFriend(friend);
    };
  
  return (
    <>
        <div className="flex-1 p-4 lg:ml-64">
      
      <div className="lg:hidden">
       
        {selectedFriend ? (
          <div className="max-w-full w-[calc(100%-30px)] mx-auto">
            <ChatComponent friend={selectedFriend}  />
          </div>
        ) : (
          <ChatFriends onFriendClick={handleFriendClick} />
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex">
        {/* Left Column (Friends List) */}
        <div className="w-1/3">
          <ChatFriends onFriendClick={handleFriendClick} />
        </div>

        {/* Right Column (Chat Component) */}
        <div className="flex-1 pl-8">
          {selectedFriend ? (
            <div className="max-w-full w-[calc(90%-15px)] mx-auto h-[calc(100vh-20px)]">
              <ChatComponent friend={selectedFriend} />
            </div>
          ) : (
            <div className="text-white">
              <h2 className="text-2xl">Tap a friend to start chatting</h2>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default ChatLayout
