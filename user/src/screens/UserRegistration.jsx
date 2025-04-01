import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    toast.info("Uploading profile picture...");

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
        profilePic: response.data.secure_url,
      }));

      toast.success("Profile picture uploaded!");
    } catch (error) {
      toast.error("Failed to upload profile picture.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleVoterIDCheck = async () => {
    const { voterID } = formData;
    const voterIDRegex = /^[A-Za-z]{3}[0-9]{7}$/;

    if (!voterIDRegex.test(voterID)) {
      toast.error("Invalid voter ID format.");
      return;
    }

    setIsVerifying(true);
    toast.info("Verifying Voter ID...");

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
    } finally {
      setIsVerifying(false);
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

    setIsLoading(true);
    toast.info("Registering your account...");

    try {
      await axios.post(
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
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold">Voter ID</label>
            <input
              type="text"
              name="voterID"
              className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 transition duration-200"
              value={formData.voterID}
              onChange={handleInputChange}
              placeholder="Enter your voter ID"
              required
            />
            <button
              type="button"
              className="mt-3 w-full py-2 bg-teal-600 text-white font-semibold rounded hover:bg-teal-700 transition"
              onClick={handleVoterIDCheck}
              disabled={isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify Voter ID"}
            </button>
          </div>

          {voterVerified && (
            <>
              <div>
                <label className="block text-gray-700 font-semibold">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              {["name", "email", "phoneNumber"].map((field, index) => (
  <div key={index}>
    <label className="block text-gray-700 font-semibold">
      {field.charAt(0).toUpperCase() + field.slice(1)}
    </label>
    <input
      type="text"
      name={field}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 transition duration-200"
      value={formData[field]}
      onChange={handleInputChange}
      placeholder={`Enter your ${field}`}
      required
    />
  </div>
))}

              <div>
                <label className="block text-gray-700 font-semibold">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full py-3 px-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 transition duration-200"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="w-full py-3 px-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 transition duration-200"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-600 text-white font-semibold rounded hover:bg-teal-700 transition"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;