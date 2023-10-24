import { createBrowserRouter, Navigate } from "react-router-dom"; 
 import React from "react"; 
 // import ProtectedRoute from "./ProtectedRoute"; 
 import AccountLayout from "../layouts/accounts" 
 import Signin from "../pages/signin"; 
 import Signup from "../pages/signup"; 
 import Logout from "../pages/logout"; 
 import Dashboard from "../pages/Dashboard"; 
 import ArticleDetailsModel from "../pages/articles/ArticleDetailsModel"; 
  
  
 const router = createBrowserRouter([ 
     // { path: "/", element: <Navigate to="/account/projects" replace /> }, 
  
  
     { 
         path: "/signin", 
         element: <Signin /> 
     }, 
     { 
         path: "/Signup", 
         element: <Signup /> 
     }, 
     { 
         path: "/logout", 
         element: <Logout /> 
     }, 
     // Protected Routes 
     { 
         path: "/", 
         element: ( 
             // <ProtectedRoute> 
             <AccountLayout /> 
             // </ProtectedRoute> 
         ), 
         children: [ 
             { index: true, element: <Dashboard /> }, 
             { 
                 path: "/", 
                 element: <Dashboard />, 
                 children: [ 
                     { 
                         path: "articles", 
                         children: [ 
                             { index: true, element: <></> }, 
                             { 
                                 path: ":articleID", 
                                 element: <ArticleDetailsContainer /> 
                             }, 
                             { 
                                 path: ":sportID/:articleID", 
                                 element: <ArticleDetailsContainer /> 
                             } 
                         ] 
                     }, 
                 ] 
             }, 
             { 
                 path: ":sportID", 
                 element: <Dashboard />, 
  
             }, 
  
         ] 
     }, 
  
     // { 
     //     path: "*", 
     //     element: <NotFound /> 
     // } 
 ]); 
  
 export default router;