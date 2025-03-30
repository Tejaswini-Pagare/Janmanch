import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  getProjects,
  myProfile,
  updateProfile,
} from "../controllers/users/userController.js";
import {
  donateGoods,
  donateMoney,
  getDonations,
} from "../controllers/users/donationController.js";

const router = express.Router();

// Routes for projects and profile management
router.get("/projects", authMiddleware, getProjects);
router.get("/community");
router.post("/grievance");
router.get("/wardinfo/:id");
router.get("/corpinfo/:id");
router.get("/me", authMiddleware, myProfile);
router.put("/update", authMiddleware, updateProfile);
router.post("/goods", donateGoods);
router.post("/money", donateMoney);
router.post("/get_donations",getDonations)
export default router;
