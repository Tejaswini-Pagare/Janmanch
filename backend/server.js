import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import corpRoutes from "./routes/corpRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import communityRoutes from "./routes/communityRoutes.js"
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
app.use(cookieParser());

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // or whatever the frontend URL is
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use(express.static('public'))
app.use("/api/auth", authRoutes); // Routes for authentication
app.use("/api/users", userRoutes); // Routes for users
app.use("/api/corps", corpRoutes); // Routes for corporators
app.use("/api/community", communityRoutes); //Routes for communities
const PORT = process.env.PORT || 5000;

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit with failure status
  });
