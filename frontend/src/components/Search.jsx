import React, { useState, useEffect, useContext } from 'react'
import AddFriendComponent from './AddFriendComponent'
import Context from '../context/Context'

const Search = () => {
  const { addNewFriends, addFriends } = useContext(Context)
  const [searchQuery, setSearchQuery] = useState('') // State for search query

  useEffect(() => {
    addFriends()  // Fetch all friends (assuming this populates addNewFriends)
  }, [addFriends])

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value) // Update the search query
  }

  // Filter the friends directly based on search query
  const filteredFriends = addNewFriends?.filter((friend) =>
    friend.userName?.toLowerCase().includes(searchQuery?.toLowerCase())
  )

  return (
    <>
      <div className="friends-container flex flex-col lg:flex-row w-full h-screen lg:h-auto">
        {/* Main Content Area */}
        <div className="main-content w-full p-4 bg-[#020b1f] text-white flex-grow lg:ml-64 lg:mt-0 mt-14">
          {/* Header Section */}
          <div className="flex flex-col">
            {/* Heading */}
            <h2 className="text-xl font-bold mb-2">Search and Add New Friends</h2>
            <hr className="border-gray-600 mb-4" />

            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery} // Bind search input to state
                onChange={handleSearchChange} // Handle search query change
                placeholder="Search for friends..."
                className="w-full p-2 bg-[rgb(28,37,65)] border border-gray-600 rounded-lg text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Friend List Container */}
          <div className="friend-list mt-6">
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend, index) => (
                <AddFriendComponent key={friend._id} userName={friend.userName} />
              ))
            ) : (
              <p>No friends found</p> // Display message when no friends match the search
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search
