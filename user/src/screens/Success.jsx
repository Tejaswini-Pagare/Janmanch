// import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState(null);
  const [transactionId,setTransactionId] = useState(null);

  useEffect(() => {
    if (sessionId) {
      fetch(`https://janmanch-cep.onrender.com/api/stripe/verify-payment?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setTransaction(data);
          setTransactionId(sessionId);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [sessionId]);

  const today = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {loading ? (
        <h2 className="text-lg font-semibold text-gray-600 animate-pulse">Verifying payment...</h2>
      ) : transaction ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful! 🎉</h2>
          <hr className="my-4" />

          <h2 className="text-xl font-semibold text-gray-600 mb-2">Transaction Details</h2>
          {/* <hr className="my-4" /> */}
          
          <table className="w-full border-collapse text-left shadow-sm rounded-lg overflow-hidden">
            <tbody>
              <tr className="bg-gray-200">
                <td className="border border-gray-300 font-bold text-lg px-4 py-2">Name:</td>
                <td className="border border-gray-300 text-lg px-4 py-2">{transaction.name}</td>
              </tr>
              <tr className="bg-white">
                <td className="border border-gray-300 font-bold text-lg px-4 py-2">Date: </td>
                <td className="border border-gray-300 text-lg px-4 py-2">{today}</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="border border-gray-300 font-bold text-lg px-4 py-2">Amount:</td>
                <td className="border border-gray-300 text-lg px-4 py-2 text-green-600 font-semibold">
                  ₹{transaction.amount}
                </td>
              </tr>
            </tbody>
          </table>

          <p className="text-gray-700 mt-4 font-medium">Thank you for your donation, {transaction.name}!</p>
          
          <p className="text-gray-600 mt-2">Transaction ID:</p>
          <div className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-mono overflow-auto break-words max-w-full">
            {transactionId}
          </div>

          <a
            href="/"
            className="mt-4 px-5 py-2 inline-block text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Go to Home
          </a>
        </div>
      ) : (
        <p className="text-lg font-semibold text-red-500">Payment verification failed.</p>
      )}
    </div>
  );
};

export default Success;
