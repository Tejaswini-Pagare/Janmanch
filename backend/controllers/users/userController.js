import bcrypt from "bcryptjs";
import { User } from "../../models/userSchema.js";
// import { Corporator } from "../../models/corporatorSchema.js";
import { generateToken } from "../../lib/utils.js";
import { Project } from "../../models/projectSchema.js";
import cloudinary from "../../lib/cloudinary.js";

export const register = async (req, res) => {
  const {
    voterID,
    name,
    email,
    phoneNumber,
    password,
    confirmPassword,
    profilePic, // ✅ Now part of req.body
  } = req.body;

  console.log("REQ BODY:", req.body);
  console.log(profilePic);
  console.log("Profile Picture URL:", profilePic);

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
      profilePic: profilePic || "",
    });

    await newUser.save();

    generateToken(newUser._id, "user", res);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Error in register controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
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
      name: user.name,
      email: user.email,
      profilePic: user.profilePic, // ✅ Include Profile Pic
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
  try {
    const user = await User.findById(req.user?.userId).select(
      "_id name email phoneNumber voterID profilePic"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      voterID: user.voterID,
      profilePic: user.profilePic,
    });

    console.log("User found id is", user._id);
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
              public_id: `profile_${req.user.userId}_${Date.now()}`,
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

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updatedData },
      { new: true }
    );

    console.log("Updated User Data:", updatedUser);

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        profilePic: updatedUser.profilePic,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
