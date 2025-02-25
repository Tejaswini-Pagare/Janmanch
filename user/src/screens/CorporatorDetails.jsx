import React from "react";
import { FaUserTie, FaBalanceScale, FaClock, FaMoneyBillWave } from "react-icons/fa";
import corporatorImage from "../images/Shaleja_More.jpg";
import oppositionImage from "../images/Vikas_Harishchandra_Dolas.jpeg.jpg";
import Navbar from "../components/Navigation/Navbar";

const CorporatorDetails = () => {
  const corporatorInfo = {
    name: "Shailaja More",
    party: "Bharatiya Janata Party (BJP)",
    tenure: "2021-2026",
    budget: "₹10,00,000",
    income: "₹5,00,000",
    image: corporatorImage,
  };

  const oppositionCorporators = [
    {
      name: "Pratibha Bhalerao",
      party: "NCP",
      image: "oppositionImage",
    },
    {
      name: "Sandhya Jagtap",
      party: "Individual",
      image: "oppositionImage",
    },
    {
      name: "Sarita Sane",
      party: "Shivsena",
      image: "oppositionImage",
    },
    {
      name: "Shubhangi Shinde",
      party: "Congress",
      image: "oppositionImage",
    },
  ];

  return (
    <div>
    {/* <Navbar/> */}
    <div className="p-6 font-sans max-w-6xl mx-auto">
      
      <div className="border rounded-lg p-6 bg-orange-400 shadow-lg mb-12">
        <h2 className="text-2xl font-bold text-center mb-6 text-white border-b-2 border-slate-200 transition-transform shadow-lg rounded-lg pb-3">
          Corporator Details
        </h2>
        <br />
        <div className="flex flex-col md:flex-row items-center justify-center gap-11">
          <img
            src={corporatorInfo.image}
            alt="Corporator"
            className="w-60 h-60 rounded-full shadow-lg hover:shadow-teal-500 hover:scale-105 transition-transform mr-6 mb-6 md:mb-0"
          />
          <ul className="space-y-3 text-center md:text-left">
            <li className="flex items-center">
              <FaUserTie className="mr-3 text-xl text-white font-bold" />
              <span className="text-lg font-bold text-white">Name: {corporatorInfo.name}</span>
            </li>
            <hr />
            <li className="flex items-center">
              <FaBalanceScale className="mr-3 text-xl text-white font-bold" />
              <span className="text-lg font-bold text-white">Party: {corporatorInfo.party}</span>
            </li>
            <hr />
            <li className="flex items-center">
              <FaClock className="mr-3 text-xl text-white font-bold" />
              <span className="text-lg font-bold text-white">Tenure: {corporatorInfo.tenure}</span>
            </li>
            <hr />
            <li className="flex items-center">
              <FaMoneyBillWave className="mr-3 text-xl text-white font-bold" />
              <span className="text-lg font-bold text-white">Budget: {corporatorInfo.budget}</span>
            </li>
            <hr />
            <li className="flex items-center">
              <FaMoneyBillWave className="mr-3 text-xl text-white font-bold" />
              <span className="text-lg font-bold text-white">Income: {corporatorInfo.income}</span>
            </li>
            <br /><br />
          </ul>
          <br />
        </div>
      </div>

      {/* <div className="border rounded-lg p-6 bg-gray-100 shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">Opposition Corporators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {oppositionCorporators.map((opponent, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center border rounded-lg p-4 bg-gray-200 shadow-md hover:shadow-lg transition-transform transform hover:scale-105 hover:bg-teal-300"
            >
              <img
                src={opponent.image}
                alt={opponent.name}
                className="w-28 h-28 rounded-full mb-4 shadow-lg hover:scale-110 hover:shadow-teal-700 transition-transform absolute -top-10"
              />
              <div className="mt-12 text-center">
                <p className="text-lg font-bold text-white font-semibold pt-8">{opponent.name}</p>
                <p className="text-sm italic text-gray-600">{opponent.party}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      
    </div>
    <div className="border-2 border-slate-700 rounded-lg p-7 bg-gray-300 bg-opacity-50 shadow-lg w-11/12 justify-center items-center mx-auto justify-items-center gap-4 mb-10 flex flex-wrap">
        <div className="bg-green-400 items-center justify-center p-4 rounded-lg shadow-lg w-3/12 text-center hover:scale-95 transition-transform">
            <h1 className="text-5xl font-bold font-mono">10+</h1>
            <span className="text-2xl font-semibold ">Grievances Solved</span>
        </div>
        <div className="bg-blue-400 items-center justify-center p-4 rounded-lg shadow-lg w-3/12 text-center hover:scale-95 transition-transform">
            <h1 className="text-5xl font-bold font-mono">10+</h1>
            <span className="text-2xl font-semibold">Grievances Solving</span>
        </div>
        <div className="bg-lime-400 items-center justify-center p-4 rounded-lg shadow-lg w-3/12 text-center hover:scale-95 transition-transform">
            <h1 className="text-5xl font-bold font-mono">10+</h1>
            <span className="text-2xl font-semibold">Grievances Received</span>
        </div>
        <div className="bg-yellow-400 items-center justify-center p-4 rounded-lg shadow-lg w-3/12 text-center hover:scale-95 transition-transform">
            <h1 className="text-5xl font-bold font-mono ">10+</h1>
            <span className="text-2xl font-semibold">Projects Developed</span>
        </div>
        <div className="bg-red-400 items-center justify-center p-4 rounded-lg shadow-lg w-3/12 text-center hover:scale-95 transition-transform ">
            <h1 className="text-5xl font-bold font-mono">10+</h1>
            <span className="text-2xl font-semibold">Projects Developing</span>
        </div>
      </div>
    </div>
  );
};

export default CorporatorDetails;
