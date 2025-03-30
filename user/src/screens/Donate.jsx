// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Donate = () => {
//   const [donationType, setDonationType] = useState(""); // 'goods' or 'money'
//   const [goodsDetails, setGoodsDetails] = useState({
//     material: "",
//     description: "",
//     recipient: "",
//   });
//   const [moneyAmount, setMoneyAmount] = useState("");
//   const navigate = useNavigate();

//   const handleDonateGoods = async () => {
//     try {
//       const userId = localStorage.getItem("userId");

//       const response = await axios.post("http://localhost:5000/api/users/goods", {
//         ...goodsDetails,
//         userId,
//       });
//       toast.success(response.data.message);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to donate goods.");
//     }
//   };

//   const handleDonateMoney = async () => {
//     try {
//       const userId = localStorage.getItem("userId");

//       const response = await axios.post("http://localhost:5000/api/users/money", {
//         amount: moneyAmount,
//         paymentMethod: "stripe",
//         userId,
//       });
//       toast.success(response.data.message);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to donate money.");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (donationType === "goods") {
//       handleDonateGoods();
//     } else if (donationType === "money") {
//       handleDonateMoney();
//     } else {
//       toast.error("Please select a donation type.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
//       <h1 className="mb-6 text-4xl font-bold text-gray-800">Donate to Your Ward</h1>

//       <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-xl">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block mb-2 text-lg font-medium text-gray-700">Choose Donation Type:</label>
//             <div className="flex items-center space-x-6">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   value="goods"
//                   checked={donationType === "goods"}
//                   onChange={() => setDonationType("goods")}
//                   className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-400"
//                 />
//                 <span className="text-gray-700">Donate Goods</span>
//               </label>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   value="money"
//                   checked={donationType === "money"}
//                   onChange={() => setDonationType("money")}
//                   className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-400"
//                 />
//                 <span className="text-gray-700">Donate Money</span>
//               </label>
//             </div>
//           </div>

//           {/* Goods Donation Form */}
//           {donationType === "goods" && (
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 value={goodsDetails.material}
//                 onChange={(e) => setGoodsDetails({ ...goodsDetails, material: e.target.value })}
//                 placeholder="Material (e.g., Clothes, Food)"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
//               />
//               <textarea
//                 value={goodsDetails.description}
//                 onChange={(e) => setGoodsDetails({ ...goodsDetails, description: e.target.value })}
//                 placeholder="Description of Material"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
//               />
//               <input
//                 type="text"
//                 value={goodsDetails.recipient}
//                 onChange={(e) => setGoodsDetails({ ...goodsDetails, recipient: e.target.value })}
//                 placeholder="Recipient (Organization or Individual)"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//           )}

//           {/* Money Donation Form */}
//           {donationType === "money" && (
//             <div className="space-y-4">
//               <input
//                 type="number"
//                 value={moneyAmount}
//                 onChange={(e) => setMoneyAmount(e.target.value)}
//                 placeholder="Amount to Donate"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
//               />
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   value="stripe"
//                   checked={true}
//                   readOnly
//                   className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-400"
//                 />
//                 <span className="text-gray-700">Stripe</span>
//               </div>
//             </div>
//           )}

//           {/* Google Map */}
//           <div className="mt-6">
//             <h3 className="mb-2 text-lg font-medium text-gray-700">Ward Office Location</h3>
//             <div className="rounded-lg overflow-hidden shadow-md">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7560.384380815452!2d73.75138204826246!3d18.655369698998843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e373408279%3A0xd48083d76e095422!2z4Kq44KuH4KqV4KuN4Kqf4KqwIE5vLiAyNiwg4Kqq4KuN4Kqw4Kq-4Kqn4Kq_4KqV4Kqw4KqjLCDgqqjgq4DgqpfgqrPgq4AsIOCqquCrgOCqruCrjeCqquCqsOCrgC3gqprgq4Dgqqjgq43gqprgq43gqrXgqr7gqqYsIOCqruCqueCqvuCqsOCqvuCqt-CrjeCqn-CrjeCqsCA0MTEwNDQ!5e0!3m2!1sgu!2sin!4v1742063849256!5m2!1sgu!2sin"
//                 width="100%"
//                 height="300"
//                 className="border-0"
//                 allowFullScreen=""
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//               ></iframe>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-400"
//           >
//             Submit Donation
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Donate;


import React, { useState } from "react";
import StripeDonate from "./StripeDonate";
import { toast } from "react-toastify";
import axios from "axios";

const Donate = () => {
  const [donationType, setDonationType] = useState("");
  const [goodsDetails, setGoodsDetails] = useState({ material: "", description: "", recipient: "" });
  
  const handleDonateGoods = async () => {
    try {
      toast.success("Take your goods to the nearest ward office.");
      const userId = localStorage.getItem("userId");
      
      const response = await axios.post("http://localhost:5000/api/users/goods", { ...goodsDetails, userId });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to donate goods.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (donationType === "goods") handleDonateGoods();

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
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Submit Goods Donation</button>
          </form>
        )}
        {donationType === "money" && <StripeDonate />}
      </div>
    </div>
  );
};
export default Donate;