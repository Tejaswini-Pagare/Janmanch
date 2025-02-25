import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from "react-router-dom"
import { Provider } from "react-redux";
import store from "../store";
import Navbar from "./components/Navigation/Navbar"
import UserPosts from './screens/UserPosts'
import UserHome from "./screens/UserHome"
import GrievanceForm from "./screens/GrievanceForm"
import WardData from "./screens/WardData"
import CorporatorDetails from "./screens/CorporatorDetails"
import CorporatorHome from './screens/CorporatorHome'
import CorporatorCommunity from "./screens/CorporatorCommunity"
import LoginPage from './screens/Login'
import Chatbox from './components/Chatbot/chatbox'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Navbar/>
      
      <Routes>
        {/* <Route path='/' element={<UserHome/>}/> */}
        <Route path='/' element={<CorporatorHome/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path='/usercommunity' element={<UserPosts/>}/>
        <Route path='/community' element={<CorporatorCommunity/>}/>
        <Route path='/citizen-voice' element={<GrievanceForm/>}/>
        <Route path='/ward-details' element={<WardData/>}/>
        <Route path='/corporator-details' element={<CorporatorDetails/>}/>
      </Routes>
    </>
  )
}
export default App
