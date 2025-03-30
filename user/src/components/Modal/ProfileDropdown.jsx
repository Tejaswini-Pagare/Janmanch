import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileMenu = ({ userImage }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

   useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const res = await axios.get("/api/users/me", {
            withCredentials: true,
          });
          setProfilePic(res.data.profilePic);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      };

      const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  
      fetchUserProfile();
    }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );

      // Clear user session
      localStorage.removeItem("userToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");

      toast.success("Logged out successfully!");

      // Redirect to login page
      window.location.reload();
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed!");
    }
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center" ref={menuRef}>
      {/* Profile Icon */}
      <button type="button" className="focus:outline-none" onClick={toggleMenu}>
        {profilePic ? (
          <div className="relative w-14 h-14 overflow-hidden rounded-full p-1">
            <img
              src={profilePic}
              alt="User avatar"
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className="absolute w-10 h-10 text-gray-400 left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <ul
          role="menu"
          className="absolute z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white p-1.5 shadow-lg focus:outline-none"
          style={{ top: "0", left: "-12rem" }}
        >
          {role !== "corporator" && (
          <li
            role="menuitem"
            onClick={() => role === "admin" ? navigate("/dashboard") : navigate("/profile")}
            className="flex items-center w-full p-3 text-sm text-gray-800 transition-all rounded-md cursor-pointer hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                clipRule="evenodd"
              />
            </svg>
            
  <p className="ml-2 font-medium">
    <span>{role === "admin" ? "Admin Dashboard" : "My Profile"}</span>
  </p>

          </li>
        )}
          {/* <li
            role="menuitem"
            className="flex items-center w-full p-3 text-sm text-gray-800 transition-all rounded-md cursor-pointer hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="ml-2 font-medium">Edit Profile</p>
          </li> */}
          <li
            role="menuitem"
            className="flex items-center w-full p-3 text-sm text-gray-800 transition-all rounded-md cursor-pointer hover:bg-gray-100"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="ml-2 font-medium">Sign Out</p>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;