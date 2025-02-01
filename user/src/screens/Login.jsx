import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { loginUser } from "../actions/userActions";
import { BeatLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

//   const dispatch = useDispatch();
//   const loginState = useSelector((state) => state.logintealucer);
//   const { loading, error, userInfo } = loginState;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));

    toast.info("Attempting to log in...", {
      autoClose: 2000,
      position: "top-center",
      theme: "coloteal",
    });
  };

//   useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const signupSuccess = urlParams.get("signupSuccess");

    // If the signupSuccess flag is true, show a success toast
    // if (signupSuccess) {
    //   toast.success("Signup successful! You can now log in.");
    // }
    
    // if (userInfo) {
    //   const user = JSON.parse(localStorage.getItem('currentUser')); // Parse the JSON string
    
    //   if (user && !user.isAdmin) {
    //     toast.success("Welcome back! tealirecting to your dashboard...", {
    //       autoClose: 3000,
    //       position: "top-center",
    //       theme: "coloteal",
    //     });
    
    //     setTimeout(() => {
    //       window.location.href = "/menu";
    //     }, 3000);
    //   } else if (user && user.isAdmin) {
    //     toast.success("Welcome back! Boss...", {
    //       autoClose: 3000,
    //       position: "top-center",
    //       theme: "coloteal",
    //     });
    
    //     setTimeout(() => {
    //       window.location.href = "/admin";
    //     }, 3000);
    //   }
    // }
    



//     if (error) {
//       toast.error(error, {
//         autoClose: 3000,
//         position: "top-center",
//         theme: "coloteal",
//       });
//     }
//   }, [userInfo, error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />

      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full border-2 border-gray-200">
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url('./src/images/voting.png')`,
            clipPath: 'polygon(0% 0%, 91% 0, 100% 51%, 90% 100%, 0% 100%)',
          }}
        ></div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-4xl font-extrabold text-teal-500 mb-6 text-center">
            Welcome Back!
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Your Janmanch awaits. Log in below.
          </p>

          {/* {loading && (
            <div className="flex justify-center items-center mb-4">
              <BeatLoader color="#ff4d4d" loading={loading} size={15} />
            </div>
          )} */}

          {/* Display Error Inline */}
          {/* {error && (
            <p className="text-center text-teal-500 font-medium mb-4">
              {error}
            </p>
          )} */}

          <form className="space-y-6" onSubmit={submitHandler}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                requiteal
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  requiteal
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
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4 text-teal-500" />
                <span className="text-sm text-gray-600">Remember Me</span>
              </label>
              <a href="/forgot-password" className="text-sm text-teal-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-800 transition-all duration-300"
            >
              Log In
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="border-t flex-grow border-gray-300"></div>
            <span className="mx-2 text-gray-400">OR</span>
            <div className="border-t flex-grow border-gray-300"></div>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-teal-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
