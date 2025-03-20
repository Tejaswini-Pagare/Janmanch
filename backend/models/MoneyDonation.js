import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";  // ✅ Use import instead of require

const MoneyDonationSchema = new mongoose.Schema({
  name: String,
  contact: String,
  amount: Number,
  paymentMethod: String,
  transactionId: { type: String, default: uuidv4 },
  date: { type: Date, default: Date.now },
});

const MoneyDonation = mongoose.model("MoneyDonation", MoneyDonationSchema);
export default MoneyDonation;  // ✅ Correct export
