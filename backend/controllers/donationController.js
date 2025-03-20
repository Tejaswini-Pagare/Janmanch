import { Donation } from "../models/donationModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createGoodsDonation = async (req, res) => {
  try {
    const { userId, material, description, recipient } = req.body;
    const donation = new Donation({
      donationType: "goods",
      goodsDetails: { material, description, recipient },
      user: userId,
    });

    await donation.save();
    res.status(201).json({ message: "Goods donation successful!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to donate goods", error: error.message });
  }
};

export const createMoneyDonation = async (req, res) => {
  try {
    const { userId, amount, token } = req.body;

    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: "INR",
      source: token.id,
      description: "Donation Payment",
    });

    const donation = new Donation({
      donationType: "money",
      moneyDetails: { amount, description: "Money Donation", paymentMethod: "stripe", transactionId: charge.id },
      user: userId,
    });

    await donation.save();
    res.status(201).json({ message: "Money donation successful!", transactionId: charge.id });
  } catch (error) {
    res.status(500).json({ message: "Failed to donate money", error: error.message });
  }
};
