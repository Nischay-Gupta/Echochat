import React, { useContext, useState } from "react";
import ChatLayout from "./components/ChatLayout";
import Sidebar from "./components/SideBar";
import Search from "./components/Search";
import AddFriends from "./components/AddFriends";
import './index.css'

import Context from "./context/Context.js";
const App = () => {
  const { currentTab
  } = useContext(Context)
  return (
    <>
      <div className="flex h-screen bg-[#020b1f]">
        {/* Sidebar for Larger Screens */}
        <Sidebar />
        {currentTab === "chats" && <ChatLayout />}
        {currentTab === "search" && <Search />}
        {currentTab === "friends" && <AddFriends />}
        
      </div>
    </>
  );
};

export default App;
