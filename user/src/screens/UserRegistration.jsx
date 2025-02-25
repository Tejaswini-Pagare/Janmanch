import React, { useState } from "react";
import axios from "axios";

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    voterID: "",
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [voterVerified, setVoterVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [focusedField, setFocusedField] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  const handleVoterIDCheck = async () => {
    const { voterID } = formData;
    const voterIDRegex = /^[A-Za-z]{3}[0-9]{7}$/;

    if (!voterIDRegex.test(voterID)) {
      setErrorMessage("Invalid voter ID format.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/verify-voter?voterid=${formData.voterID}`
      );

      if (response.data.verified) {
        setVoterVerified(true);
        setErrorMessage("");
        setSuccessMessage("Voter ID verified successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setVoterVerified(false);
        setErrorMessage("Voter ID not found. Please enter a valid voter ID.");
      }
    } catch (error) {
      setVoterVerified(false);
      setErrorMessage("Error verifying voter ID. Please try again.");
    }
  };

  const validateForm = () => {
    const { name, email, phoneNumber, password, confirmPassword } = formData;

    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Invalid email format.");
      return false;
    }

    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      setErrorMessage("Phone number must be 10 digits.");
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage("Registration successful! You can now log in.");
      setErrorMessage("");
      window.location.href="/login"

      // Reset form after successful registration
      setFormData({
        voterID: "",
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });

      setVoterVerified(false);

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  const getLabelClass = (fieldName) =>
    `block font-semibold text-left ${
      focusedField === fieldName ? "text-teal-500" : "text-black"
    }`;

  return (
    <div className="max-w-lg p-8 mx-auto font-sans text-center h-screen bg-gray-100"> 
      <h2 className="mb-6 text-2xl font-bold">User Registration</h2>
      <form
        className="p-6 pb-2 space-y-4 bg-white border border-gray-200 rounded-lg shadow-lg items-center"
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
            className="w-full py-2 pt-3 mt-5 font-semibold text-white transition duration-300 bg-teal-600 rounded hover:bg-teal-700"
            onClick={handleVoterIDCheck}
          >
            Verify Voter ID
          </button>
        </div>

        {successMessage && (
          <p className="mt-4 font-bold text-green-600">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-4 font-bold text-red-600">{errorMessage}</p>
        )}

        {voterVerified && (
          <div className="pb-9">
            <div className="">
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
              className="w-full py-2 font-semibold text-white transition duration-300 bg-teal-600 rounded hover:bg-teal-700"
            >
              Register
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserRegistration;
