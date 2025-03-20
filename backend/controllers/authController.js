import bcrypt from "bcryptjs";
import { User } from "../models/userSchema.js";
import { Corporator } from "../models/corpSchema.js";
import { generateToken } from "../lib/utils.js";
import { sendResetPasswordMail } from "../lib/sendMail.js";

export const register = async (req, res) => {
  const {
    voterID,
    name,
    email,
    phoneNumber,
    password,
    confirmPassword,
    profilePic, 
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
      profilePic: profilePic,
    });

    await newUser.save();
    console.log("User saved:", newUser);

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

// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }
//     console.log(user);

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);

//     if (!isPasswordCorrect) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }

//     const token = generateToken(user._id, user.role, res);

//     res.status(200).json({
//       success: true,
//       userId: user._id, 
//       token,
//       role: user.role,
//       name: user.name,
//       email: user.email,
//       profilePic: user.profilePic,
//     });
//   } catch (error) {
//     console.error("Error in login controller:", error.message);
//     res.status(500).json({ message: "Internal Server Error!" });
//   }
// };

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = await Corporator.findOne({ email }); // Check in corporator schema
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Compare hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password); 
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Set role based on admin email
    const role = email === "janmanch.web@gmail.com" ? "admin" : user.role;

    // Generate JWT token
    const token = generateToken(user._id, role, res);

    // Send successful response
    res.status(200).json({
      success: true,
      userId: user._id,
      token,
      role,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic || null,
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

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No account found with that email." });
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const updateResult = await User.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    if (updateResult.modifiedCount === 0) {
      return res
        .status(500)
        .json({ message: "Failed to update password. Please try again." });
    }

    console.log("Password Updated Successfully!");

    await sendResetPasswordMail(user.email, user.name, tempPassword);

    res
      .status(200)
      .json({ message: "A temporary password has been sent to your email." });
  } catch (error) {
    console.error("Forgot Password Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
