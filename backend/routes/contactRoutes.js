import express from "express";
const router = express.Router();
import Contact from "../models/contactSchema.js";

router.post("/insert", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, subject, message });

    await newContact.save();  // ✅ Removed callback to prevent multiple responses

    res.status(201).json({ message: "Contact inserted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

router.get("/all", async (req, res) => {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 }); // Sort by latest entry
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });

export default router;
