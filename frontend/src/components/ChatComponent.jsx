import React, { useState, useEffect, useRef, useContext } from "react";
import Context from "../context/Context";
import { io } from "socket.io-client";

const socket = io.connect(import.meta.env.VITE_API_URL);
const sampleMessages = [

];

const ChatComponent = ({ friend, }) => {
  const { userName } = useContext(Context)
  const messageRef = useRef()
  const [messages, setMessages] = useState(sampleMessages);

  const messagesEndRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault()
    const messageVal = messageRef.current.value
    if (messageVal.trim()) {
      setMessages((prevMessages) => [...prevMessages, { sender: "You", message: messageVal }])
      socket.emit("sendMessage",{room: userName,message: messageVal,reciver: friend})
    }
    messageRef.current.value = ""
  };

  useEffect(() => {
    socket.emit("joinroom", userName);
  
    const handleReceive = (room, message) => {
      setMessages(prev => [...prev, { sender: room, message }]);
    };
  
    const handleDisconnect = () => {
      console.log("User disconnected from the server");
      // You can also add a toast or update UI state here if needed
    };
  
    socket.on("receiveMessage", handleReceive);
    socket.on("disconnect", handleDisconnect);
  
    return () => {
      socket.off("receiveMessage", handleReceive);
      socket.off("disconnect", handleDisconnect);
    };
  }, [userName]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  

  return (
    <div className="flex flex-col h-full lg:h-[calc(100vh-20px)] max-w-full bg-gray-800 rounded-lg text-white overflow-hidden">
      {/* Chat Header */}
      <div className="px-4 py-3 sm:px-6 sm:py-4">
        <h2 className="text-2xl font-bold">{`Chat with ${friend}`}</h2>
      </div>
      <hr className="border-gray-700 my-4" />

      {/* Messages Display */}
      <div className="flex-grow overflow-y-auto p-4 mb-4 max-w-full h-[calc(100vh-220px)] sm:h-[calc(100vh-170px)]">
        { messages && messages.map((msg) => (
          <div

            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"
              } mb-2`}
          >
            <div
              className={`max-w-xs p-2 rounded-lg ${msg.sender === "You" ? "bg-blue-500" : "bg-gray-600"
                }`}
            >
              <p className="break-words">{msg.message} </p>
            </div>
          </div>
        ))}
        {/* Scroll to the last message */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field and Send Button at the Bottom */}
      <div className="flex items-center space-x-2 border-t border-gray-700 bg-gray-800 p-4 lg:p-2">
        <input
          type="text"

          ref={messageRef}
          placeholder="Type a message..."
          className="flex-grow p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 p-2 rounded-lg text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
