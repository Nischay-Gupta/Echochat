import React, { useContext } from 'react'
import Context from '../context/Context'

const SideBar = () => {
  const { currentTab
    , setcurrentTab } = useContext(Context)
  return (
    <>  {/* Sidebar for larger screens */}
      <div className="hidden lg:flex lg:flex-col fixed top-0 left-0 w-64 h-full bg-[#020b1f] border-r border-gray-700 text-white">
        <div className="flex items-center justify-start h-16 border-b border-gray-700 pl-6">
          <h1 className="text-2xl font-bold">EchoChat</h1>
        </div>

        <nav className="flex-grow p-4">
          <ul className="space-y-4">
            <li className={`flex items-center ${currentTab === "friends" ? "bg-blue-500" : "hover:bg-blue-500"} p-2 rounded transition duration-300`}
              onClick={() => {
                setcurrentTab("friends")
              }}
            >
              <span>Friends</span>
            </li>
            <li className={`flex items-center ${currentTab === "search" ? "bg-blue-500" : "hover:bg-blue-500"} p-2 rounded transition duration-300`}
              onClick={() => {
                setcurrentTab("search")
              }}>
              <span>Search</span>
            </li>
            <li className={`flex items-center ${currentTab === "chats" ? "bg-blue-500" : "hover:bg-blue-500"} p-2 rounded transition duration-300`}
              onClick={() => {
                setcurrentTab("chats")
              }}
            >

              <span>Chats</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#020b1f] p-4 flex items-center justify-between z-10">
        <h1 className="text-xl font-bold text-white">EchoChat</h1>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#020b1f] flex justify-around p-2 border-t border-gray-700 z-10">
        <button className={`text-white ${currentTab==="friends" &&  "bg-blue-500" }`}
          onClick={() => {
            setcurrentTab("friends")
          }}
        >Friends</button>
        <button className={`text-white ${currentTab==="search" &&  "bg-blue-500" }`}
          onClick={() => {
            setcurrentTab("search")
          }}
        >Search</button>
        <button className={`text-white ${currentTab==="chats" &&  "bg-blue-500" }`}
          onClick={() => {
            setcurrentTab("chats")
          }}
        >Chats</button>
      </div>
    </>
  )
}

export default SideBar
