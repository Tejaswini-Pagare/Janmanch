import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.jwt; // req.cookies.'cookie-name'
  try {

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    // decode the cookie to get the user _id out of it as we pass _id while generating a token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token!" });
    }

    const user = await User.findById(decoded.userId).select("-password"); // fetch all the fields for the user with decoded Id except password

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.user = user; 

    next(); // calling next function after this
  }  catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Role-based middleware for authorization
export const roleMiddleware = (requiredRole) => (req, res, next) => {
  if (req.user.role !== requiredRole) {
    return res
      .status(403)
      .json({ message: "Access de1nied: insufficient permissions" });
  }
  next();
};
