import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./App.css"
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import ContextProvider from "./context/ContextProvider.jsx"
import Requests from "./components/Requests";
import Login from "./components/Login.jsx"
import Register from "./components/Register.jsx"
import Landingpage from "./components/Landingpage.jsx"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />

  }
  ,

  {
    path: "/register",
    element: <Register />

  },
  {
    path: "/Requests",
    element: <Requests />

  }
  ,
  {
    path: "/",
    element: <Landingpage />

  }
  ,
  {
    path: "/echochat",
    element: <App />

  }

])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
<RouterProvider  router={router}>

      <App />
</RouterProvider>

    </ContextProvider>


  </StrictMode>

  ,
)
