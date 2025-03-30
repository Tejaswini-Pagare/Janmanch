import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx"; // ✅ Import XLSX for CSV export

function Donations() {
  const [donations, setDonations] = useState([]);
  const [goodsDonations, setGoodsDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [activeTab, setActiveTab] = useState("money");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const [moneyRes, goodsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/donations/get_donations"),
          axios.get("http://localhost:5000/api/donations/get_goods"),
        ]);

        setDonations(moneyRes.data);
        setGoodsDonations(goodsRes.data);

        const total = moneyRes.data.reduce((acc, donation) => acc + donation.amount, 0);
        setTotalAmount(total);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Filter Donations Based on Search Query
  const filteredMoneyDonations = donations.filter((donation) =>
    donation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGoodsDonations = goodsDonations.filter((item) =>
    item.goodsDetails.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.goodsDetails.material.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🛠 Function to Export Data as CSV
  const exportToCSV = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.csv`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">Donations</h2>

      {/* Tabs for Donation Type */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("money")}
          className={`px-6 py-2 rounded-l-md text-lg font-semibold transition ${
            activeTab === "money" ? "bg-blue-700 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          Money Donations
        </button>
        <button
          onClick={() => setActiveTab("goods")}
          className={`px-6 py-2 rounded-r-md text-lg font-semibold transition ${
            activeTab === "goods" ? "bg-blue-700 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          Goods Donations
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder={`Search ${activeTab === "money" ? "donor name" : "recipient/material"}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 w-1/2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading & Error Handling */}
      {loading && <div className="text-center text-blue-500 text-lg">Loading...</div>}
      {error && <div className="text-red-500 text-center">Error: {error.message}</div>}

      {!loading && !error && (
        <div className="space-y-8">
          {/* Money Donations Table */}
          {activeTab === "money" && (
            <div className="bg-white p-6 rounded-lg shadow-lg transition-all">
              <div className="flex justify-between mb-4">
                <h3 className="text-2xl font-semibold text-green-700">Money Donations (Total: ₹{totalAmount})</h3>
                <button
                  onClick={() => exportToCSV(filteredMoneyDonations, "Money_Donations")}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 shadow-md">
                  <thead>
                    <tr className="bg-blue-100 text-gray-700">
                      <th className="border border-gray-300 p-3">Donor Name</th>
                      <th className="border border-gray-300 p-3">Amount (₹)</th>
                      <th className="border border-gray-300 p-3">Contact</th>
                      <th className="border border-gray-300 p-3">Date</th>
                      <th className="border border-gray-300 p-3">Payment Method</th>
                      <th className="border border-gray-300 p-3">Transaction ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMoneyDonations.length > 0 ? (
                      filteredMoneyDonations.map((donation) => (
                        <tr key={donation._id} className="text-center hover:bg-gray-50">
                          <td className="border border-gray-300 p-3">{donation.name}</td>
                          <td className="border border-gray-300 p-3">{donation.amount}</td>
                          <td className="border border-gray-300 p-3">{donation.contact}</td>
                          <td className="border border-gray-300 p-3">
                            {new Date(donation.date).toLocaleDateString()}
                          </td>
                          <td className="border border-gray-300 p-3">{donation.paymentMethod}</td>
                          <td className="border border-gray-300 p-3">{donation.transactionId}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center p-3 text-gray-500">
                          No matching donations found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Goods Donations Table */}
          {activeTab === "goods" && (
            <div className="bg-white p-6 rounded-lg shadow-lg transition-all">
              <div className="flex justify-between mb-4">
                <h3 className="text-2xl font-semibold text-indigo-700">Goods Donations</h3>
                <button
                  onClick={() => exportToCSV(filteredGoodsDonations, "Goods_Donations")}
                  className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
                >
                  Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 shadow-md">
                  <thead>
                    <tr className="bg-purple-100 text-gray-700">
                    <th className="border border-gray-300 p-3">Donor ID</th>
                      <th className="border border-gray-300 p-3">Recipient</th>
                      <th className="border border-gray-300 p-3">Material</th>
                      <th className="border border-gray-300 p-3">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGoodsDonations.length > 0 ? (
                      filteredGoodsDonations.map((item) => (
                        <tr key={item._id} className="text-center hover:bg-gray-50">
                          <td className="border border-gray-300 p-3">user_{item.user}</td>
                          <td className="border border-gray-300 p-3">{item.goodsDetails.recipient}</td>
                          <td className="border border-gray-300 p-3">{item.goodsDetails.material}</td>
                          <td className="border border-gray-300 p-3">{item.goodsDetails.description}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center p-3 text-gray-500">No matching donations found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Donations;
