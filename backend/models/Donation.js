import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donationType: {
    type: String,
    enum: ["goods", "money"],
    required: true,
  },
  goodsDetails: {
    material: {
      type: String,
      required: function () {
        return this.donationType === "goods";
      },
    },
    description: {
      type: String,
      required: function () {
        return this.donationType === "goods";
      },
    },
    recipient: {
      type: String,
      required: function () {
        return this.donationType === "goods";
      },
    },
  },
  moneyDetails: {
    amount: {
      type: Number,
      required: function () {
        return this.donationType === "money";
      },
    },
    description: {
      type: String,
      required: function () {
        return this.donationType === "money";
      },
    },
    paymentMethod: {
      type: String,
      enum: ["stripe"],
      required: function () {
        return this.donationType === "money";
      },
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: "User",
    required: true,
  },
});

export const Donation = mongoose.model("Donation", donationSchema,"donations");

