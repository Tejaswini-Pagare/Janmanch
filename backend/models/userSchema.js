import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
},{
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

export default mongoose.model("User", userSchema);