import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "../Modal/ProfileDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Community", to: "/community" },
    { name: "Citizen's Voice", to: "/citizen-voice" },
    { name: "Ward Details", to: "/ward-details" },
    { name: "Corporator Details", to: "/corporator-details" },
  ];

  return (
    <div>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border border-white/20 shadow-lg lg:bg-white/30 lg:backdrop-blur-lg transition-all duration-500 ease-in-out transform">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <img
                  className="w-auto h-14 sm:h-20"
                  src="src/images/janmanch_logo.png"
                  alt="Janmanch Logo"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-6">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="relative group inline-flex flex-col items-center text-gray-700 font-medium transition-all duration-300"
                >
                  <span className="relative transition-all duration-300 group-hover:translate-y-1">
                    {link.name}
                  </span>
                  <span className="w-0 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out group-hover:w-full group-hover:translate-y-1"></span>
                </Link>
              ))}
            </div>

            {/* Profile Section - Visible on Desktop */}
            <div className="hidden lg:flex items-center">
              <ProfileMenu />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu */}
      {isOpen && (
        <>
          {/* Gray Overlay (Background Dimming) */}
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40" onClick={closeMenu}></div>

          {/* Sliding Side Menu */}
          <div
            className="fixed top-0 left-0 w-3/4 sm:w-64 h-full bg-white shadow-md z-50 transition-transform duration-300 ease-in-out"
            style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
          >
            <div className="flex flex-col items-start py-1 space-y-4 px-4 h-full">
              {/* Logo inside mobile menu */}
              <div className="flex items-center justify-center">
                <Link to="/" onClick={closeMenu}>
                  <img className="w-auto h-14 sm:h-20" src="src/images/janmanch_logo.png" alt="Janmanch Logo" />
                </Link>
                <span className="font-bold px-2 text-xl text-gray-700">Janmanch</span>
              </div>

              {/* Mobile Menu Links */}
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="relative group text-gray-700 hover:text-gray-900 font-medium transition-all duration-300"
                  onClick={closeMenu}
                >
                  <span className="relative transition-all duration-300 group-hover:translate-y-1">
                    {link.name}
                  </span>
                  <span className="w-0 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out group-hover:w-full group-hover:translate-y-1"></span>
                </Link>
              ))}

              {/* Profile Section at Bottom-Right Corner */}
              <div className="rounded-full place-self-end">
                <ProfileMenu />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
