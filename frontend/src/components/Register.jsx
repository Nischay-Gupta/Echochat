import React, { useContext, useRef } from 'react'
import {Link} from "react-router-dom"
import Context from "../context/Context.js"


const Register = () => {
const {handleRegister}=useContext(Context)
const userNameRef=useRef()
const passwordref=useRef()
const emailref=useRef()

const handleclick=(e)=>{
  e.preventDefault()
  const userName=userNameRef.current.value
  const password=passwordref.current.value
  const email=emailref.current.value

  handleRegister({
    userName,
    password,
    email
  })
  emailref.current.value=""
  passwordref.current.value=""
  userNameRef.current.value=""
}

  return (
    <>
   
      <div className="flex justify-center items-center h-screen w-full bg-black" style={{backgroundColor: "#020b1f"}}>
  <div className="grid gap-8 w-full max-w-md">
    <section
      id="back-div"
      className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl"
    >
      <div
        className="border-4 border-transparent rounded-xl bg-white dark:bg-gray-900 shadow-xl p-8 mx-4 my-6"
        style={{height: "500px;"}}
      >
        <h1 className="text-5xl font-bold text-center cursor-default dark:text-gray-300 text-gray-900">
          Register
        </h1>
        <form className="space-y-6 mt-4 flex-grow">
          <div>
            <label htmlFor="Username" className="block mb-2 text-lg dark:text-gray-300">Username</label>
            <input
              id="Username"
              ref={userNameRef}
              className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
              type="text"
              placeholder="Username"
              required=""
            />
          </div>
          <div>
            <label htmlFor="Email" className="block mb-2 text-lg dark:text-gray-300">Email</label>
            <input
              id="Email"
              ref={emailref}
              className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
              type="email"
              placeholder="Email"
              required=""
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-lg dark:text-gray-300">Password</label>
            <input
              id="password"
              ref={passwordref}
              className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
              type="password"
              placeholder="Password"
              required=""
            />
          </div>
          <button
            className="w-full p-3 mt-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleclick}
            type="submit"
          >
            REGISTER
          </button>
        </form>
        <div className="flex flex-col mt-4 text-sm text-center dark:text-gray-300">
          <p>
            Already have an account?    
          <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </section>
  </div>
</div>

    </>
  )
}

export default Register
