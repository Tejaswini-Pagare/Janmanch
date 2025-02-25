import express from "express";
import {
  checkAuth,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";
import { MongoClient } from "mongodb";

const router = express.Router();

router.post("/register", register);
// router.post("/register/corp", registerCorp);

router.post("/login", login);
router.post("/logout", logout);
router.get("/check", authMiddleware, checkAuth);

// for verifying voters -:

// const uri = "mongodb://localhost:27017";
const uri =
  "mongodb+srv://webjanmanch:Janmanch@cluster0.kuq5u.mongodb.net/Janmanch?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "Janmanch";
const collectionName = "verified_voters";

router.get("/verify-voter", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const { voterid } = req.query;
    if (!voterid) {
      return res
        .status(400)
        .json({ verified: false, message: "Voter ID is required." });
    }

    const voter = await collection.findOne({ voterid });

    if (voter) {
      return res.status(200).json({ verified: true , name: voter.name, voterid: voter.voterid, gender: voter.gender, aadharno: voter.aadharno});
    } else {
      return res
        .status(404)
        .json({ verified: false, message: "Voter ID not found." });
    }
  } catch (error) {
    console.error("Error checking voter ID:", error);
    return res
      .status(500)
      .json({ verified: false, message: "Internal server error." });
  } finally {
    await client.close();
  }
});

export default router;
