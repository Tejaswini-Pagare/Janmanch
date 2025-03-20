import React from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-red-600">Payment Cancelled ❌</h2>
        <p className="text-gray-700 mt-2">Your donation was not completed.</p>
        <button
          onClick={() => navigate("/donate")}
          className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Cancel;
