import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import { Corporator } from "../models/corpSchema.js";

// export const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.jwt;
//   try {
//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized - No Token Provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded);
//     if (!decoded) {
//       return res.status(401).json({ message: "Unauthorized - Invalid Token!" });
//     }

//     let user;
//     if (decoded.role === 'corporator') {
//       user = await Corporator.findById(decoded.userId);
//     } else {
//       user = await User.findById(decoded.userId).select("-password");
//     }

//     if (!user) {
//       return res.status(404).json({ message: "User not found!" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };

export const authMiddleware = (req, res, next) => {
  // console.log("Received Cookies:", req.cookies);
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token found!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user (id, role) to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, invalid token!" });
  }
};

// Role-based middleware for authorization
export const roleMiddleware = (requiredRole) => (req, res, next) => {
  if (req.user.role !== requiredRole) {
    return res
      .status(403)
      .json({ message: "Access denied: insufficient permissions" });
  }
  next();
};
