// The JWT stored in the cookie is typically used for authentication. For example:
// When the user logs in, the server generates a JWT, stores it in a cookie, and sends it back to the client.
// On subsequent requests, the client automatically sends the cookie back to the skoerver. The server can verify the JWT to authenticate the userimport jwt from "jsonwebtoken";

import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {  // generating token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {    // sending token to user in a 'cookie'
    // cookie() is a method from Express used to set cookies in the HTTP response  // "jwt" is the name of the cookie beint set
    maxAge: 7 * 24 * 60 * 60 * 1000, // After 7 days, the cookie will automatically expire and be removed from the browser.
    httpOnly: true, // makes the cookie accessible only by the server, not by client-side JavaScript.... helps to prevent the XSS attacks (cross-side scripting attacks)
    sameSite: "strict",  // cross-site request forgery attacks (CSRF)
    secure: process.env.NODE_ENV !== "development", // will be false when in development and true during production
  });

  return token;
};
