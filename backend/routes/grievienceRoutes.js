import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Grievance from "../models/GrievanceSchema.js";

const router = express.Router();

// Configure Multer for file uploads
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

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { submissionType, category, description, userid, location } = req.body;

    // Validate required fields
    if (!submissionType || !category || !description || !userid) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Parse location if provided
    let parsedLocation = null;
    if (location) {
      try {
        parsedLocation = JSON.parse(location);
        if (!parsedLocation.latitude || !parsedLocation.longitude) {
          return res.status(400).json({ message: "Invalid location data" });
        }
      } catch (error) {
        return res.status(400).json({ message: "Invalid location format" });
      }
    }

    // Save grievance in database
    const newGrievance = new Grievance({
      submissionType,
      category,
      description,
      file: req.file ? req.file.filename : null,
      userid,
      location: parsedLocation,
    });

    await newGrievance.save();
    res.status(201).json({ message: "Grievance submitted successfully", grievance: newGrievance });
    console.log("📝 New Grievance:", newGrievance);

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

let grievancesCache = []; // Define outside the route

router.get("/get_grievance", async (req, res) => {
  try {
    const grievances = await Grievance.find({});
    res.status(200).json(grievances);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

router.get("/get_grievance/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from the request parameters
    const grievances = await Grievance.find({ userid: "user_"+userId }); // Filter grievances by userId
    res.status(200).json(grievances);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

router.put("/update_status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const grievance = await Grievance.findById(id);
    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }
    console.log("Hellloooo")
    grievance.status = status;
    await grievance.save();

    res.status(200).json({ message: "Grievance status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});


export default router;
