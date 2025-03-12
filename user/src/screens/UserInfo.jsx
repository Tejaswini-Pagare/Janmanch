import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail, MdPhone, MdHowToVote } from "react-icons/md";

const UserInfo = () => {
  const [userInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "1234567890",
    voterID: "ABC1234567",
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      {/* Stylish Page Title */}
      <h1 className="text-4xl font-bold text-grey-500 mb-10">User Information</h1>
      
      <div className="bg-teal-600 text-white p-10 rounded-2xl shadow-2xl w-[500px] h-[550px] text-center relative">
        <div className="flex justify-center mb-6">
          <FaUserCircle className="text-9xl drop-shadow-lg" />
        </div>
        <h2 className="text-3xl font-bold">{userInfo.name}</h2>
        <div className="mt-20  bg-white text-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4 mb-5">
            <MdEmail className="text-teal-600 text-2xl" />
            <span className="text-base font-medium">{userInfo.email}</span>
          </div>
          <div className="flex items-center gap-4 mb-5">
            <MdPhone className="text-teal-600 text-2xl" />
            <span className="text-base font-medium">{userInfo.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-4">
            <MdHowToVote className="text-teal-600 text-2xl" />
            <span className="text-base font-medium">{userInfo.voterID}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
