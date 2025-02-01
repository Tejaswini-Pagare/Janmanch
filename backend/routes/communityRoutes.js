import express from "express";
import Community from "../models/communitySchema.js"; // Ensure correct path
import multer from "multer";
import path from "path";

const router = express.Router();

// Get all messages (posts)
router.get("/getallmessage", async (req, res) => {
  try {
    const msgs = await Community.find({});
    res.status(200).send(msgs);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Upload route for posts
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and Description are required" });
    }

    // Ensure file URL is generated correctly
    const fileUrl = req.file ? `${req.file.filename}` : null;

    // Create new post  
    const newPost = new Community({
      sentby: "Shailaja More",
      title,
      description,
      image: fileUrl,
    });

    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error uploading post:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
