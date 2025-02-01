import React, { useState } from "react";
import Profile from "../Modal/ProfileDropdown"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Community", href: "/community" },
    { name: "Citizen's Voice", href: "/citizen-voice" },
    { name: "Ward Details", href: "/ward-details" },
    { name: "Corporator Details", href: "/corporator-details" },
    // { name: "User Info", href: "/user-info" },
  ];

  return (
    <nav className="backdrop-filter sticky top-0 z-10 backdrop-blur-lg bg-white-200 p-4 shadow-lg rounded-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#">
              <img
                className="w-auto h-16 sm:h-24 "
                src="src/images/janmanch_logo.png"
                alt="Logo"
              />
            </a>
          </div>


          {/* Hamburger Menu */}
          <div className="flex lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none"
              aria-label="toggle menu"
            >
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Links (Desktop) */}
          <div
            className={`lg:flex lg:items-center lg:space-x-6 ${
              isOpen ? "block" : "hidden"
            } w-full lg:w-auto`}
          >
            <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-2 lg:space-y-0">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="relative inline-flex items-center justify-start overflow-hidden font-medium text-black transition-transform duration-300 ease-in-out hover:translate-y-2 rounded-lg  py-1.5 px-2.5 group"
                  // className="relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-black text-white rounded-lg border-2 border-black py-1.5 px-2.5 group"
                  onClick={closeMenu}
                >
                  
                  <span className="w-56 h-48 rounded  absolute bottom-0 left-0 translate-y-full ease-out duration-500 transition-all translate-y-50 mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  
                  <span className="relative w-full text-left transition-transform transform  duration-300 ease-in-out group-hover:scale-105 group-hover:text-gray-800">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Profile (Desktop) */}
          <Profile/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
