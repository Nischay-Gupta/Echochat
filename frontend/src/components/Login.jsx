import React, { useContext, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import Context from "../context/Context.js"
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate()
 const {handleLogin,cheakAuth,Success}=useContext(Context)

  const userNameRef = useRef()
  const passwordref = useRef()
  if (Success) {
    navigate("/echochat")
  }
  useEffect(() => {
    cheakAuth()
  }, [])

  const handleclick = (e) => {
    e.preventDefault()
    const userName = userNameRef.current.value
    const password = passwordref.current.value
    const loginstatus = handleLogin({
      userName,
      password,
    })


    passwordref.current.value = ""
    userNameRef.current.value = ""

  }
  return (
    <>
      
      <div class="flex justify-center items-center h-screen w-full" style={{ backgroundColor: "#020b1f" }}>
        <div class="grid gap-8 w-full max-w-md">
          <section
            id="back-div"
            class="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl"
          >
            <div
              class="border-4 border-transparent rounded-xl bg-white dark:bg-gray-900 shadow-xl p-8 mx-4 my-6"
              style={{ height: "450px;" }}
            >
              <h1 class="text-5xl font-bold text-center cursor-default dark:text-gray-300 text-gray-900">
                Log in
              </h1>
              <form class="space-y-6 mt-4 flex-grow" 
              onSubmit={handleclick}
              >
                <div>
                  <label for="Username" class="block mb-2 text-lg dark:text-gray-300">Username</label>
                  <input
                    id="Username"
                    ref={userNameRef}
                    class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                    type="text"
                    placeholder="Username"
                    required=""
                  />
                </div>
                <div>
                  <label for="password" class="block mb-2 text-lg dark:text-gray-300">Password</label>
                  <input
                    id="password"
                    ref={passwordref}
                    class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300"
                    type="password"
                    placeholder="Password"
                    required=""
                  />
                </div>
                <button
                  onClick={handleclick}
                  class="w-full p-3 mt-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="submit"
                >
                  LOG IN
                </button>
              </form>
              <div class="flex flex-col mt-4 text-sm text-center dark:text-gray-300">
                <p>
                  Don't have an account?
                  <Link to="/register" class="text-blue-400 transition hover:underline">Register</Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Login
