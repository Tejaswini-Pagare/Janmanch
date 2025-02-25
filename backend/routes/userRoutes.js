import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getProjects, login, logout, myProfile, register } from "../controllers/users/userController.js";

const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", authMiddleware, logout);

router.get("/projects", authMiddleware, getProjects);
router.get("/community");
router.post("/grievance");
router.get("/wardinfo/:id");
router.get("/corpinfo/:id");

router.get("/me", authMiddleware, myProfile);
  

export default router;
