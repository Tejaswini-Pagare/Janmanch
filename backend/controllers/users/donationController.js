import { Donation } from "../../models/Donation.js";
import { User } from "../../models/userSchema.js"; 

export const donateGoods = async (req, res) => {
  try {
    const { material, description, recipient, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newDonation = new Donation({
      donationType: "goods",
      goodsDetails: { material, description, recipient },
      user: userId,
    });

    await newDonation.save();

    res.status(200).json({ message: "Goods donation successfully recorded!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to donate goods." });
  }
};

export const donateMoney = async (req, res) => {
  try {
    const { amount, description, paymentMethod, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newDonation = new Donation({
      donationType: "money",
      moneyDetails: { amount, description, paymentMethod },
      user: userId,
    });

    await newDonation.save();

    res.status(200).json({ message: "Money donation successfully processed!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to process money donation." });
  }
};
