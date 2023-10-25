/* eslint-disable @typescript-eslint/no-unused-vars */
import { Disclosure } from '@headlessui/react'
import Logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom"

const Appbar = () => {
  const token = localStorage.getItem("authToken") ?? "";

  return (
    <Disclosure as="nav" className="bg-gray-900 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div>
            <img
              className="h-10"
              src={Logo}
              alt="Smarter Tasks"
            />
          </div>

          <div className="flex items-center space-x-4">
            {token ? (
              <Link to="/logout" className="text-white hover:text-gray-300 font-semibold focus:outline-none">
                Logout
              </Link>
            ) : (
              <div className="flex space-x-4">
                <Link to="/signin" className="text-white hover:text-gray-300 font-semibold focus:outline-none">
                  Sign In
                </Link>
                <Link to="/signup" className="text-white hover:text-gray-300 font-semibold focus:outline-none">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  )
}

export default Appbar;
