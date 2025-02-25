import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    voterID: { type: String, required: true },  
    name: { type: String, required: true },     
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }, // Default role is 'user'
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export const User = mongoose.model("User", userSchema);
