import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    voterID: "",
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const [voterVerified, setVoterVerified] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("upload_preset", "user_profile_upload");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dlkuwbjzr/image/upload",
        fileData
      );

      setFormData((prev) => ({
        ...prev,
        profilePic: response.data.secure_url, // ✅ Store Cloudinary URL
      }));
    } catch (error) {
      toast.error("Failed to upload profile picture. Try again.");
    }
  };

  const handleFocus = (fieldName) => setFocusedField(fieldName);

  const handleBlur = () => setFocusedField("");

  const handleVoterIDCheck = async () => {
    const { voterID } = formData;
    const voterIDRegex = /^[A-Za-z]{3}[0-9]{7}$/;

    if (!voterIDRegex.test(voterID)) {
      toast.error("Invalid voter ID format.");
      return;
    }

    try {
      const response = await axios.get(
        `https://janmanch-cep.onrender.com/api/auth/verify-voter?voterid=${voterID}`
      );

      if (response.data.verified) {
        setVoterVerified(true);
        toast.success("Voter ID verified successfully!"); 
      } else {
        setVoterVerified(false);
        toast.error("Voter ID not found. Please enter a valid voter ID.");
      }
    } catch (error) {
      setVoterVerified(false);
      toast.error("Error verifying voter ID. Please try again.");
    }
  };

  const validateForm = () => {
    const { name, email, phoneNumber, password, confirmPassword } = formData;

    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }

    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      toast.error("Phone number must be 10 digits.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Sending Data:", formData); 

    try {
      const response = await axios.post(
        "https://janmanch-cep.onrender.com/api/auth/register",
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(
        "Error in registration:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  const getLabelClass = (fieldName) =>
    `block font-semibold text-left ${
      focusedField === fieldName ? "text-teal-500" : "text-black"
    }`;

  return (
    <div className="max-w-lg p-8 mx-auto font-sans text-center"> 
      <h2 className="mb-6 text-2xl font-bold">User Registration</h2>
      <form
        className="p-6 pb-2 space-y-4 bg-white border border-gray-200 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="voterID" className={getLabelClass("voterID")}>
            Voter ID
          </label>
          <input
            type="text"
            name="voterID"
            id="voterID"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={formData.voterID}
            onChange={handleInputChange}
            onFocus={() => handleFocus("voterID")}
            onBlur={handleBlur}
            placeholder="Enter your voter ID"
            required
          />
          <button
            type="button"
            className="w-full py-2 mt-3 font-semibold text-white bg-teal-600 rounded hover:bg-teal-700"
            onClick={handleVoterIDCheck}
          >
            Verify Voter ID
          </button>
        </div>

        {voterVerified && (
          <>
            <div>
              <label htmlFor="profilePicture" className="block font-semibold">
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {formData.profilePicture && (
                <img
                  src={formData.profilePicture}
                  alt="Profile"
                  className="w-20 h-20 mt-2 rounded-full"
                />
              )}
            </div>

            <div>
              <label htmlFor="name" className={getLabelClass("name")}>
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className={getLabelClass("email")}>
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className={getLabelClass("phoneNumber")}
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                onFocus={() => handleFocus("phoneNumber")}
                onBlur={handleBlur}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className={getLabelClass("password")}>
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => handleFocus("password")}
                onBlur={handleBlur}
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className={getLabelClass("confirmPassword")}
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onFocus={() => handleFocus("confirmPassword")}
                onBlur={handleBlur}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 font-semibold text-white bg-teal-600 rounded hover:bg-teal-700"
            >
              Register
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default UserRegistration;
