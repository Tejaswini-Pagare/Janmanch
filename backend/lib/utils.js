import jwt from "jsonwebtoken";

export const generateToken = (userId, role, res) => {
  const token = jwt.sign(
    { userId, role },  // Pass the 'userId' and 'role' directly
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, 
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development", 
  });

  return token;
};
