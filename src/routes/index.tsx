import { createBrowserRouter, Navigate } from "react-router-dom"; 
 import React from "react"; 
 // import ProtectedRoute from "./ProtectedRoute"; 
 import AccountLayout from "../layouts/accounts" 
 import Signin from "../pages/signin"; 
 import Signup from "../pages/signup"; 
 import Logout from "../pages/logout"; 
   import Dashboard from "../pages/Dashboard"; 
  
  
 const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
]);

export default router;