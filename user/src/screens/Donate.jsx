import React, { useState } from "react";
import StripeDonate from "./StripeDonate";
import { toast } from "react-toastify";
import axios from "axios";

const Donate = () => {
  const [donationType, setDonationType] = useState("");
  const [goodsDetails, setGoodsDetails] = useState({ material: "", description: "", recipient: "" });
  const [loading, setLoading] = useState(false);
  const handleDonateGoods = async () => {
    try {
      if (!goodsDetails.material || !goodsDetails.description || !goodsDetails.recipient) {
        toast.error("Please fill all fields.");
        return;
      }
      toast.success("Take your goods to the nearest ward office.");
      const userId = localStorage.getItem("userId");
      
      const response = await axios.post("https://janmanch-cep.onrender.com/api/users/goods", { ...goodsDetails, userId });
      
      toast.success(response.data.message);

      setGoodsDetails({ material: "", description: "", recipient: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to donate goods.");
    }
    finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (donationType === "goods") handleDonateGoods();
    setLoading(true);

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen -mt-16 bg-gray-100">
      <h1 className="mb-6 text-4xl font-bold text-gray-900">Donate to Your Ward</h1>
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-xl mx-3">
        <label className="block mb-4 text-lg font-medium text-gray-700">Choose Donation Type:</label>
        <div className="flex space-x-6">
          <label className="flex items-center">
            <input type="radio" value="goods" checked={donationType === "goods"} onChange={() => setDonationType("goods")} className="mr-2" />
            Donate Goods
          </label>
          <label className="flex items-center">
            <input type="radio" value="money" checked={donationType === "money"} onChange={() => setDonationType("money")} className="mr-2" />
            Donate Money
          </label>
        </div>
        {donationType === "goods" && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input type="text" value={goodsDetails.material} onChange={(e) => setGoodsDetails({ ...goodsDetails, material: e.target.value })} placeholder="Material (e.g., Clothes, Food)" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            <textarea value={goodsDetails.description} onChange={(e) => setGoodsDetails({ ...goodsDetails, description: e.target.value })} placeholder="Description" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            <input type="text" value={goodsDetails.recipient} onChange={(e) => setGoodsDetails({ ...goodsDetails, recipient: e.target.value })} placeholder="Recipient" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
              
              {loading ? "Submitting..." : "Submit Goods Donation"}              
              </button>
          </form>
        )}
        {donationType === "money" && <StripeDonate />}
      </div>
    </div>
  );
};
export default Donate;