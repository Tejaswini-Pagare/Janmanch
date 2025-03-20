import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import MoneyDonation from "../models/MoneyDonation.js";
import nodemailer from "nodemailer"; // ✅ Import nodemailer

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASSWORD,
  },
});

// ✅ Create Stripe Checkout Session & Save Donation
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount, name, contact, email } = req.body;

    if (!amount || !name || !contact || !email) {
      return res.status(400).json({ error: "All fields are required: name, contact, email, amount" });
    }

    const amountInPaise = amount * 100; // Convert INR to paise

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: `Donation by ${name}` },
            unit_amount: amountInPaise,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    const newDonation = new MoneyDonation({
      name,
      contact,
      amount,
      paymentMethod: "Stripe",
      transactionId: session.id,
      paymentStatus: "Pending", // ✅ Mark as pending until payment confirmation
    });

    await newDonation.save();
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Webhook to update donation status after successful payment
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    try {
      await MoneyDonation.findOneAndUpdate(
        { transactionId: session.id },
        { date: new Date(), paymentStatus: "Paid" }, // ✅ Update paymentStatus
        { new: true }
      );
      console.log("✅ Donation confirmed:", session.id);
    } catch (err) {
      console.error("Error updating donation:", err.message);
    }
  }

  res.json({ received: true });
});

// ✅ Verify Payment & Send Email Confirmation
router.get("/verify-payment", async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ error: "Session ID is required" });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session || session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    const donation = await MoneyDonation.findOneAndUpdate(
      { transactionId: session_id },
      { date: new Date(), paymentStatus: "Paid" },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    // ✅ Send Beautiful Email Confirmation
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: session.customer_email,
      subject: "🎉 Thank You for Your Generous Donation! 🎉",
      html: `
        <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          
          <div style="text-align: center;">
            <img src="https://i.imgur.com/7Hk4H4b.png" alt="Thank You" style="width: 100px;"/>
            <h2 style="color: #28a745;">Your Donation is Received!</h2>
          </div>

          <p style="font-size: 16px; color: #333;">Dear <b>${donation.name}</b>,</p>

          <p style="font-size: 16px; color: #555;">
            We are incredibly grateful for your generous contribution of <b>₹${donation.amount}</b>. Your support makes a real difference, and it helps us continue our mission to create a positive impact. 
          </p>

          <div style="padding: 10px; background-color: #e0fbe0; border-radius: 5px; margin: 15px 0;">
            <p style="font-size: 16px; color: #333;">
              <b>Transaction ID:</b> ${donation.transactionId}<br>
              <b>Payment Method:</b> Stripe (Card)<br>
              <b>Date:</b> ${new Date().toLocaleDateString()}
            </p>
          </div>

          <p style="font-size: 16px; color: #555;">
            If you have any questions regarding your donation, feel free to reach out to us.  
          </p>

          <p style="font-size: 16px; text-align: center;">
            🌍 <i>“No act of kindness, no matter how small, is ever wasted.”</i> 🌍
          </p>

          <div style="text-align: center; margin-top: 20px;">
            <a href="${process.env.FRONTEND_URL}" 
              style="padding: 10px 20px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Visit Our Website
            </a>
          </div>

          <p style="font-size: 14px; text-align: center; color: #888; margin-top: 20px;">
            &copy; ${new Date().getFullYear()} Your Organization Name. All rights reserved.
          </p>

        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Donation confirmation email sent!");
    alert("✅ Donation confirmation email sent!, Donation is Received!");
    res.json(donation);
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router
