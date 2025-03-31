import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import corpRoutes from "./routes/corpRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import cookieParser from "cookie-parser";
import grievanceRoutes from "./routes/grievienceRoutes.js";
import { connectDB } from "./lib/db.js";
import donationRoutes from "./routes/donationRoutes.js";
// import stripeRoutes from "./routes/stripeRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
dotenv.config();

const app = express();
app.use(cookieParser());

// Middlewares
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://janmanch.vercel.app/"], // Allow both local and deployed frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies (if needed)
  })
);

// Routes
app.use(express.static("public"));
app.use(express.json({ verify: (req, res, buf) => { if (req.originalUrl === "/api/stripe/webhook") { req.rawBody = buf.toString(); } } }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/corps", corpRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/grievance", grievanceRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", corpRoutes);
const PORT = process.env.PORT || 5000;

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit with failure status
  });
