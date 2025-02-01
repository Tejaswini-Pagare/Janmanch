import express from "express";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";
import { addProject, updateProject } from "../controllers/corporators/corpController.js";
import { login, logout, register } from "../controllers/corporators/corpController.js";

const router = express.Router();

// Add a new project (corporator only)

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post(
  "/add",
  authMiddleware,
  roleMiddleware('corporator'),
  addProject
);


// Update an existing project (corporator only)
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("corporator"),
  updateProject
);

export default router;
