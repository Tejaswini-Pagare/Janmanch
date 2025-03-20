import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    if (sessionId) {
      fetch(`http://localhost:5000/api/stripe/verify-payment?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setTransaction(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <h2 className="text-lg font-semibold text-gray-600">Verifying payment...</h2>
      ) : transaction ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-600">Payment Successful! 🎉</h2>
          <p className="text-gray-700 mt-2">Thank you for your donation, {transaction.name}!</p>
          <p className="text-gray-600 mt-1">Amount: ₹{transaction.amount}</p>
          <p className="text-gray-600">Transaction ID: {transaction.transactionId}</p>
          <a href="/" className="block mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 text-center">Go to Home</a>
        </div>
      ) : (
        <p className="text-lg font-semibold text-red-500">Payment verification failed.</p>
      )}
    </div>
  );
};

export default Success;
