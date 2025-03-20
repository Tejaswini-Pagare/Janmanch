import express from "express";
import { Donation } from "../models/Donation.js";
import GoodsDonation from "../models/GoodsDonation.js";
import MoneyDonation from "../models/MoneyDonation.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Goods Donation Route

router.post("/goods", async (req, res) => {
  try {
    const { name, contact, material, description, recipient } = req.body;
    const donation = await GoodsDonation.create({ name, contact, material, description, recipient });
    res.json({ message: "✅ Goods donation successful!", donation });
  } catch (error) {
    res.status(500).json({ message: "❌ Goods donation failed", error });
  }
});

// Money Donation Route
router.post("/money", async (req, res) => {
  try {
    const { name, contact, amount, paymentMethod } = req.body;
    const transactionId = uuidv4();
    const donation = await MoneyDonation.create({ name, contact, amount, paymentMethod, transactionId });

    res.json({ message: "✅ Money donation successful!", transactionId, donation });
  } catch (error) {
    res.status(500).json({ message: "❌ Money donation failed", error });
  }
});

export default router;
