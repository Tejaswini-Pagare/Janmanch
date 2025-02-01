import React, { useState } from "react";
import Navbar from "../components/Navigation/Navbar";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "1234567890",
    voterID: "ABC1234567",
  });

  const [editMode, setEditMode] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState(userInfo);
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo({ ...updatedInfo, [name]: value });
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleSave = () => {
    setUserInfo(updatedInfo);
    setEditMode(false);
    setFocusedField(null);
  };

  const handleCancel = () => {
    setUpdatedInfo(userInfo);
    setEditMode(false);
    setFocusedField(null);
  };

  const getLabelClassName = (field) =>
    `font-medium text-left mb-1 cursor-pointer ${focusedField === field ? "text-teal-500" : "text-black"}`;

  return (
    <div><Navbar/>
    <div className="p-6 max-w-xl mx-auto text-center font-sans">
<h1 className="text-3xl font-bold text-gray-800 mb-6">User Information</h1>
      <form className="flex flex-col gap-6 bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <div className="flex flex-col">
          <label htmlFor="name" className={getLabelClassName("name")}>
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`p-3 border rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            }`}
            value={editMode ? updatedInfo.name : userInfo.name}
            onChange={handleInputChange}
            onFocus={() => handleFocus("name")}
            readOnly={!editMode}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className={getLabelClassName("email")}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`p-3 border rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            }`}
            value={editMode ? updatedInfo.email : userInfo.email}
            onChange={handleInputChange}
            onFocus={() => handleFocus("email")}
            readOnly={!editMode}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className={getLabelClassName("phoneNumber")}>
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            className={`p-3 border rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            }`}
            value={editMode ? updatedInfo.phoneNumber : userInfo.phoneNumber}
            onChange={handleInputChange}
            onFocus={() => handleFocus("phoneNumber")}
            readOnly={!editMode}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="voterID" className={getLabelClassName("voterID")}>
            Voter ID
          </label>
          <input
            type="text"
            name="voterID"
            id="voterID"
            className={`p-3 border rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
            }`}
            value={editMode ? updatedInfo.voterID : userInfo.voterID}
            onChange={handleInputChange}
            onFocus={() => handleFocus("voterID")}
            readOnly={!editMode}
          />
        </div>

        {editMode ? (
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg transition-all"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg transition-all"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg transition-all"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        )}
      </form>
    </div>
    </div>
  );
};

export default UserInfo;
