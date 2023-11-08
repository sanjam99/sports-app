import { createBrowserRouter } from "react-router-dom"; 
import Signin from "../pages/signin"; 
import Signup from "../pages/signup";  // Use lowercase "signup"
import Logout from "../pages/logout"; 
import Home from "../pages/Home";  // Use lowercase "home"
import Preferences from "../pages/preference";  // Use uppercase "Preferences"

const router = createBrowserRouter([
  {
    path: "/preference",
    element: <Preferences />,  // Use uppercase "Preferences"
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,  // Use lowercase "signup"
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/",
    element: <Home />,  // Use lowercase "home"
  },
]);

export default router;
