import bcrypt from "bcryptjs";
import { User } from "../../models/userSchema.js";

import { generateToken } from "../../lib/utils.js";
import { Project } from "../../models/projectSchema.js";

export const register = async (req, res) => {
  const { voterID, name, email, phoneNumber, password, confirmPassword } =
    req.body;
  try {
    if (
      !voterID ||
      !name ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters!" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }
    const existingUser = await User.findOne({ email });
    const existingCorporator = await Corporator.findOne({ email });
    if (existingUser || existingCorporator) {
      return res.status(400).json({ message: "Email is already in use!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      voterID,
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    await newUser.save();
    generateToken(newUser._id, "user", res);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error in register controller:", error.message);
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

    generateToken(user._id, user.role, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      proflePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log("Error in login controller", error.message);
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); // just clearing up the stored cookie of the user with name jwt , empty token and age of 0
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log("Error in logout controller", error.message);
  }
};

export const getProjects = async (req, res) => {
  const { category } = req.query;
  // console.log("Received category:", category);
  try {
    const filter =
      category && category !== "all"
        ? { category: { $regex: new RegExp(category, "i") } }
        : {}; // making the category wise filtering case insensitive

    const projects = await Project.find(filter).sort({ startDate: -1 }); // Sort by startDate, most recent first

    res.json({ message: "Projects fetched successfully", projects });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects", error });
  }
};

export const myProfile = async (req, res) => {
  console.log("Decoded user:", req.user);
  try {
    const user = await User.findById(req.user?.userId).select("name");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ name: user.name });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
