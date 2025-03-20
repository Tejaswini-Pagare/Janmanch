import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    voterID: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    profilePic: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
