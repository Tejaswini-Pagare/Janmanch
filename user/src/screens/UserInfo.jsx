import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { motion } from "framer-motion";
import UserHistory from "./UserHistory";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    voterID: "",
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    profilePic: "",
  });
  const [grievances, setGrievances] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [profilePreview, setProfilePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    toast.dismiss();
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://janmanch-cep.onrender.com/api/users/me", {
          withCredentials: true,
        });
        setUserInfo({ ...res.data, password: "" });
        setProfilePreview(res.data.profilePic);
      } catch (error) {
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchGrievances();
}, []);

const fetchGrievances = async () => {
    try {
        const response = await axios.get("https://janmanch-cep.onrender.com/api/grievance/get_grievance");
        setGrievances(response.data);
        localStorage.setItem("grievancesfromuser", JSON.stringify(response.data));
        setLoading(false);
    } catch (error) {
        toast.error("Failed to fetch grievances.");
        setLoading(false);
    }
};

  const handleEdit = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
      uploadImageToCloudinary(file);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "user_profile_upload");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dlkuwbjzr/image/upload",
        formData
      );
      handleEdit("profilePic", res.data.secure_url);
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!userInfo.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      tempErrors.email = "Invalid email format";
    }
    if (!userInfo.phoneNumber.match(/^\d{10}$/)) {
      tempErrors.phoneNumber = "Invalid phone number";
    }
    if (userInfo.password && userInfo.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      const updatedData = {
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        ...(userInfo.password && { password: userInfo.password }),
        profilePic: userInfo.profilePic,
      };
      await axios.put("https://janmanch-cep.onrender.com/api/users/update", updatedData, {
        withCredentials: true,
      });
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mb-4 text-4xl font-bold text-gray-800"
      >
        My Profile
      </motion.h1>

      {/* Card Replacement */}
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-2xl">
        <div className="flex justify-center mb-6">
          {profilePreview ? (
            <img
              src={profilePreview}
              alt="Profile"
              className="object-cover w-32 h-32 rounded-full border-2 border-gray-300"
            />
          ) : (
            <FaUserCircle className="text-gray-400 text-8xl" />
          )}
        </div>

        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          id="profilePic"
        />
        <label
          htmlFor="profilePic"
          className="block text-center text-blue-600 cursor-pointer hover:underline"
        >
          Change Profile Picture
        </label>

       <input
          value={"user_"+userInfo.id}
          disabled
          className="w-full p-2 mt-3 border rounded-md bg-gray-200 cursor-not-allowed"
        /> 
        {/* Input Fields */}
        <input
          value={userInfo.voterID}
          disabled
          className="w-full p-2 mt-3 border rounded-md bg-gray-200 cursor-not-allowed"
        />
        <input
          value={userInfo.name}
          disabled
          className="w-full p-2 mt-3 border rounded-md bg-gray-200 cursor-not-allowed"
        />
        <input
          value={userInfo.email}
          onChange={(e) => handleEdit("email", e.target.value)}
          className={`w-full p-2 mt-3 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          value={userInfo.phoneNumber}
          onChange={(e) => handleEdit("phoneNumber", e.target.value)}
          className={`w-full p-2 mt-3 border rounded-md ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`}
          placeholder="Phone Number"
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

        {/* Password Field */}
        <div className="relative mt-3">
          <input
            type={showPassword ? "text" : "password"}
            value={userInfo.password}
            onChange={(e) => handleEdit("password", e.target.value)}
            className={`w-full p-2 border rounded-md pr-10 ${errors.password ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter new password"
          />
          <span
            className="absolute text-gray-400 cursor-pointer right-3 top-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOff size={22} /> : <IoEye size={22} />}
          </span>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save Changes"}
        </motion.button>
      </div>

      <br /><br />

      <UserHistory/>
    </div>
  );
};

export default UserInfo;
