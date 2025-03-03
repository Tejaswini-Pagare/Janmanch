import bcrypt from "bcryptjs";
import User from '../models/userSchema.js';
import { generateToken } from "../utils/utils.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // hash passwords using bcrypt.js
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (password.length < 6) {
      // first check the password field validation
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters!" });
    }

    const user = await User.findOne({ email }); // check if it's an existing user
    if (user) return res.status(400).json({ message: "User Already Exists" });
    const salt = await bcrypt.genSalt(10); // generating hashed password for new user
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      // creating a new user
      email, // same as email: email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate JWT token
      generateToken(newUser._id, res); // calling a function to generate token and send it using cookie to user ..... newuser._id is the unique field assigned by MongoDb to each document

      await newUser.save(); // saving user to database

      // console.log(salt);
      // console.log(hashedPassword);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data!" });
    }
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

// Get projects by category (common for users and corporators)
export const getProjectsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const query = category === "all" ? {} : { category };
    const projects = await Project.find(query);

    if (!projects || projects.length === 0) {
      return res
        .status(404)
        .json({ message: "No projects found for this category!" });
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
