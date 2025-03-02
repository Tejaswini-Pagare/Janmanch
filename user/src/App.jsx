import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Components
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Navigation/Footer";
import Corp_chatbox from "./components/Chatbot/Corp_chatbox";
import ContactUs from "./screens/ContactUs";

// Screens
import LoginPage from "./screens/Login";
import SignupPage from "./screens/UserRegistration";
import UserHome from "./screens/UserHome";
import CorporatorHome from "./screens/CorporatorHome";
import UserCommunity from "./screens/UserPosts";
import CorporatorCommunity from "./screens/CorporatorCommunity";
import GrievanceForm from "./screens/GrievanceForm";
import WardData from "./screens/WardData";
import CorporatorDetails from "./screens/CorporatorDetails";
import NotFound from "./screens/NotFound";
import UserInfo from "./screens/UserInfo";
import Chatbox from './components/Chatbot/chatbox'
import GrievanceList from "./screens/GrievanceList";



function App() {
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const role = localStorage.getItem("userRole");

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);


  return (
    <>
      {
        isAuthenticated && (<Navbar />)
      }
      {/* <Navbar /> */}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <LoginPage
              setIsAuthenticated={setIsAuthenticated}
              setUserRole={setUserRole}
            />
          }
        />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <>
            {userRole === "user" && (
              <>
                <Route path="/" element={<UserHome />} />
                <Route path="/community" element={<UserCommunity />} />
                <Route path="/citizen-voice" element={<GrievanceForm />} />
                <Route path="/ward-details" element={<WardData />} />
                <Route path="/corporator-details" element={<CorporatorDetails />} />
                <Route path='/user-info' element={<UserInfo/>}/>
                <Route path="*" element={<NotFound />} />
              </>
            )}

            {userRole === "corporator" && (
              <>
                <Route path="/" element={<CorporatorHome />} />
                <Route path="/community" element={<CorporatorCommunity />} />
                <Route path="/citizen-voice" element={<GrievanceList />} />
                <Route path="/ward-details" element={<WardData />} />
                <Route path="/corporator-details" element={<CorporatorDetails />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </>
        ) : (
          <>
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
          <Route path="*" element={isAuthenticated ? <NotFound /> : <Navigate to="/login" />} />
          </>
        )}
      </Routes>
    
      {userRole === "user" && (
              <Chatbox/>
            
            )}
      {userRole === "corporator" && (
              <Corp_chatbox/>
            )}

      <ContactUs/>
      <Footer />
    </>
  );
}

export default App;
