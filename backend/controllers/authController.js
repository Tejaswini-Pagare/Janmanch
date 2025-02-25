import bcrypt from "bcryptjs";
import { User } from "../models/userSchema.js";
import { Corporator } from "../models/corpSchema.js";
import { generateToken } from "../lib/utils.js";

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

    const existingUser = await User.findOne({ $or: [{ email }, { voterID }] });
    const existingCorporator = await Corporator.findOne({ email });

    if (existingUser || existingCorporator) {
      return res
        .status(400)
        .json({ message: "Email or Voter ID is already in use!" });
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
    let user = await User.findOne({ email });
    let role = "user"; // Default role

    if (!user) {
      user = await Corporator.findOne({ email });
      role = "corporator";
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = generateToken(user._id, role, res);

    res.status(200).json({
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      token,
      profilePic: user.profilePic,
      role,
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
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

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user); // send the user back to the client
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log("Error in checkAuth controller", error.message);
  }
};
