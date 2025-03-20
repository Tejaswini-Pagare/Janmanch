import mongoose from "mongoose";

const GoodsDonationSchema = new mongoose.Schema({
  material: { type: String, required: true },
  description: { type: String, required: true },
  recipient: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const GoodsDonation = mongoose.model("GoodsDonation", GoodsDonationSchema);

export default GoodsDonation;
