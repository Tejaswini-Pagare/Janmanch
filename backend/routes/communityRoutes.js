import express from "express";
import Community from "../models/communitySchema.js"; // Ensure correct path
import multer from "multer";
import path from "path";
import fs from "fs";
import mongoose from "mongoose"; // Required for ID validation

const router = express.Router();

// 📌 GET all messages
router.get("/getallmessage", async (req, res) => {
  try {
    const msgs = await Community.find({});
    res.status(200).json(msgs);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

// 📌 Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "public/Images";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// 📌 Upload Post Route
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and Description are required" });
    }

    const fileUrl = req.file ? req.file.filename : null;

    const newPost = new Community({
      sentby: "Shailaja More",
      title,
      description,
      image: fileUrl,
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// 📌 Edit Post Route
router.put("/edit/:id", upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Post ID format" });
    }

    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and Description are required" });
    }

    const post = await Community.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let newImage = post.image;
    if (req.file) {
      if (post.image) {
        const oldImagePath = path.join("public/Images", post.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      newImage = req.file.filename;
    }

    const updatedPost = await Community.findByIdAndUpdate(
      id,
      { title, description, image: newImage },
      { new: true }
    );

    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error: " + error.message });
  }
});

// 📌 Delete Post Route
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Post ID format" });
    }

    const post = await Community.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.image) {
      const imagePath = path.join("public/Images", post.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Community.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
