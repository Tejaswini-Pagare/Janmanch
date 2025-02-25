import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import "../images/voting.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const role = localStorage.getItem("userRole");
    if (token) {
      navigate(role === "corporator" ? "/" : "/");
    }

    setIsCheckingAuth(false); // Mark auth check as complete
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      toast.success("Login successful! Redirecting...");

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userRole", data.role);

      // Delayed redirection to avoid flickering
      setTimeout(() => {
        navigate(data.role === "corporator" ? "/" : "/");
      }, 500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  // Prevent rendering until auth check is complete
  if (isCheckingAuth) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white border-2 border-gray-200 rounded-lg shadow-lg md:flex-row">
        <div
          className="hidden bg-center bg-cover md:block md:w-1/2"
          style={{
            backgroundImage: `url('../src/images/voting.png')`,
            clipPath: "polygon(0% 0%, 91% 0, 100% 51%, 90% 100%, 0% 100%)",
          }}
        ></div>

        <div className="w-full p-8 md:w-1/2">
          <h2 className="mb-6 text-4xl font-extrabold text-center text-teal-500">
            Welcome Back!
          </h2>
          <p className="mb-6 text-center text-gray-600">
            Your Janmanch awaits. Log in below.
          </p>

          {loading && (
            <p className="text-center text-gray-500">Logging in...</p>
          )}

          <form className="space-y-6" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                required
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-600 hover:to-teal-800"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-teal-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
