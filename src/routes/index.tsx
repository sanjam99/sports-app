import { createBrowserRouter } from "react-router-dom"; 
 import Signin from "../pages/signin"; 
 import Signup from "../pages/signup"; 
 import Logout from "../pages/logout"; 
   import Home from "../pages/Home"; 
  
  
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
    element: <Home />,
  },
]);

export default router;