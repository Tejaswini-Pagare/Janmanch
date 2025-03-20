import bcrypt from "bcryptjs";
import User from '../models/userSchema.js';
import Project from '../models/projectSchema.js'; // Import the Project model
import cloudinary from 'cloudinary'; // Import Cloudinary
import { generateToken } from "../utils/utils.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters!" });
    }

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User  Already Exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser  = new User({
      email,
      password: hashedPassword,
    });

    // Save user and generate token
    await newUser .save();
    generateToken(newUser ._id, res);

    res.status(201).json({
      _id: newUser ._id,
      email: newUser .email,
      profilePic: newUser .profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error in signup controller", error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log("Error in login controller", error.message);
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log("Error in logout controller", error.message);
  }
};

export const getProjectsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const query = category === "all" ? {} : { category };
    const projects = await Project.find(query);

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No projects found for this category!" });
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user?.userId).select("name email phoneNumber voterID profilePic");

    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      voterID: user.voterID,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { email, phoneNumber, password, profilePic } = req.body;

  try {
    let updatedData = {};

    if (email) updatedData.email = email;
    if (phoneNumber) updatedData.phoneNumber = phoneNumber;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    if (profilePic) {
      if (!profilePic.startsWith("http")) {
        try {
          const uploadedResponse = await cloudinary.uploader.upload(
            profilePic,
            {
              folder: "user_profiles",
              public_id: `profile_${req.user.userId}_${Date.now()}`, // Use backticks
              allowed_formats: ["jpg", "jpeg", "png"],
              transformation: [{ width: 300, height: 300, crop: "fill" }],
              overwrite: true,
            }
          );
          console.log("Cloudinary URL:", uploadedResponse.secure_url);
          updatedData.profilePic = uploadedResponse.secure_url;
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError);
          return res.status(400).json({ message: "Failed to upload image" });
        }
      } else {
        updatedData.profilePic = profilePic;
      }
    }

    const updatedUser  = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updatedData },
      { new: true }
    );

    console.log("Updated User Data:", updatedUser );

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        email: updatedUser .email,
        phoneNumber: updatedUser .phoneNumber,
        profilePic: updatedUser .profilePic,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};