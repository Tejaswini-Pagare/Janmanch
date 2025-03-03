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

  return (
    <div className="p-4 sm:p-6 font-sans max-w-6xl mx-auto">
      {/* <Navbar/> */}
      <div className="border rounded-lg p-6 bg-orange-400 shadow-lg mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white border-b-2 border-slate-200 transition-transform shadow-lg rounded-lg pb-3">
          Corporator Details
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-11">
          <img
            src={corporatorInfo.image}
            alt="Corporator"
            className="w-40 h-40 sm:w-60 sm:h-60 rounded-full shadow-lg hover:shadow-teal-500 hover:scale-105 transition-transform"
          />
          <ul className="space-y-3 text-center md:text-left text-white">
            <li className="flex items-center">
              <FaUserTie className="mr-2 sm:mr-3 text-lg sm:text-xl" />
              <span className="text-base sm:text-lg font-bold">Name: {corporatorInfo.name}</span>
            </li>
            <hr />
            <li className="flex items-center">
              <FaBalanceScale className="mr-2 sm:mr-3 text-lg sm:text-xl" />
              <span className="text-base sm:text-lg font-bold">Party: {corporatorInfo.party}</span>
            </li>
            <hr />
            <li className="flex items-center">
              <FaClock className="mr-2 sm:mr-3 text-lg sm:text-xl" />
              <span className="text-base sm:text-lg font-bold">Tenure: {corporatorInfo.tenure}</span>
            </li>
            <hr />
            <li className="flex items-center">
              <FaMoneyBillWave className="mr-2 sm:mr-3 text-lg sm:text-xl" />
              <span className="text-base sm:text-lg font-bold">Budget: {corporatorInfo.budget}</span>
            </li>
            <hr />
            <li className="flex items-center">
              <FaMoneyBillWave className="mr-2 sm:mr-3 text-lg sm:text-xl" />
              <span className="text-base sm:text-lg font-bold">Income: {corporatorInfo.income}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-2 border-slate-700 rounded-lg p-6 sm:p-7 bg-gray-300 bg-opacity-50 shadow-lg w-full md:w-11/12 mx-auto flex flex-wrap gap-4 justify-center">
        {[
          { color: "bg-green-400", label: "Grievances Solved" },
          { color: "bg-blue-400", label: "Grievances Solving" },
          { color: "bg-lime-400", label: "Grievances Received" },
          { color: "bg-yellow-400", label: "Projects Developed" },
          { color: "bg-red-400", label: "Projects Developing" },
        ].map((item, index) => (
          <div
            key={index}
            className={`${item.color} items-center justify-center p-4 rounded-lg shadow-lg w-5/12 sm:w-3/12 text-center hover:scale-95 transition-transform`}
          >
            <h1 className="text-3xl sm:text-5xl font-bold font-mono">10+</h1>
            <span className="text-lg sm:text-2xl font-semibold">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CorporatorDetails;
