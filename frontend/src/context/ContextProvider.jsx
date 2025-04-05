import React, { useState } from 'react'
import Context from './Context.js'

const ContextProvider = ({ children }) => {
    const [currentTab, setcurrentTab] = useState("friends");
    const [userName, setuserName] = useState("");
    const [addNewFriends, setaddNewFriends] = useState([])
    const [Friends, setFriends] = useState([])
    const [Requests, setRequests] = useState([])
    const [Success, setSuccess] = useState(false);
   

    const handleRegister = async (Register) => {
        const data = await fetch("http://localhost:8000/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Register)
        })
        const parsedData = await data.json()
        if (parsedData.success === true) {
           alert("you have been registered")
        } else if (parsedData.success === false) {
            alert("you have not been registered")
        }
    }
    const handleLogin = async (Login) => {
        const data = await fetch("http://localhost:8000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(Login)
        })
        const parsedData = await data.json()
        if (parsedData.success === true) {
            setSuccess(parsedData.success)
            alert("you are now logged in")
        }
        else if (parsedData.success === false) {
           alert("an error occoured")
        }
    }
    const cheakAuth = async () => {
        const data = await fetch("http://localhost:8000/user/cheakauth", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        const parsedData = await data.json()
        console.log(parsedData);
        
        setSuccess(parsedData.success)
    }
    const addFriends = async () => {
        const data = await fetch("http://localhost:8000/friend/allusers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        const parsedData = await data.json()
        setaddNewFriends(parsedData.data)
    }
    const sendFriendRequest = async (userName) => {
        const data = await fetch(`http://localhost:8000/friend/sendrequest/${userName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        const parsedData = await data.json()
        console.log(parsedData);

    }
    const cancelFriendRequest = async (userName) => {
        const data = await fetch(`http://localhost:8000/friend/cancelrequest/${userName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        const parsedData = await data.json()
        console.log(parsedData);

    }
    const friendRequests = async () => {
        const data = await fetch("http://localhost:8000/friend/pendingrequests", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        const parsedData = await data.json()
        setRequests(parsedData.allPendingRequests);

    }
    const acceptRequest = async (userName) => {
        const data = await fetch(`http://localhost:8000/friend/acceptrequest/${userName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        const parsedData = await data.json()
console.log(parsedData)
    }
    const rejectRequest = async (userName) => {
        const data = await fetch(`http://localhost:8000/friend/rejectrequest/${userName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        const parsedData = await data.json()
        console.log(parsedData);

    }
    const chatFriends = async () => {
        const data = await fetch(`http://localhost:8000/friend/allfriends`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        const parsedData = await data.json()
        if (parsedData.success) {
            setuserName(parsedData.userName);
            setFriends(parsedData.friendslist)
        }
    }
    return (
        <>
            <Context.Provider value={{
                Friends,
                userName,
                chatFriends,
                acceptRequest,
                rejectRequest,
                friendRequests,
                Requests,
                cancelFriendRequest,
                addNewFriends
                , addFriends
                , currentTab
                , setcurrentTab
                , Success
                , handleRegister
                , handleLogin
                , cheakAuth,
                sendFriendRequest
            }} >
                {children}
            </Context.Provider>
        </>
    )
}

export default ContextProvider
