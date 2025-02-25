import mongoose from "mongoose";

// Define the Corporator Schema
const corporatorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "corporator" }, // Role will be corporator by default
    political_party: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the model
export const Corporator = mongoose.model("Corporator", corporatorSchema);
