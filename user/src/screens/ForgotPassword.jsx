import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true); // Start loading state

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      toast.success(response.data.message || "Reset link sent successfully!");
      setEmail(""); // Clear input after success
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-8 bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-lg w-[700px] flex flex-col">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="text-left">
          <div className="mb-6">
            <label
              className={`block font-semibold mb-2 ${
                focused === "email" ? "text-teal-600" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full p-4 text-lg text-white transition-all rounded-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
            disabled={loading} // Disable button while sending request
          >
            {loading ? "Sending..." : "Send Reset Link"} {/* Dynamic text */}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/login" className="text-teal-600 hover:underline">
            Back to Login
          </a>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ForgotPassword;
