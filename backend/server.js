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

dotenv.config();

const app = express();
app.use(cookieParser());

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Update this if frontend URL changes
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use(express.static("public"));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/corps", corpRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/grievance", grievanceRoutes);

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
