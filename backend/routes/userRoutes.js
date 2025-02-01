import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getProjectsByCategory, login, logout, register } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/:category", authMiddleware, getProjectsByCategory);

// router.get("/community");
// router.post("/grievance");
// router.get("/wardinfo/:id");
// router.get("/corpinfo/:id");

export default router;