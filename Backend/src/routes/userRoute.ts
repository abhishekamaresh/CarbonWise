import express from "express";
import {
  SignUp,
  Login,
  getUserProfile,
  updateUserProfile,
} from "../controller/userController"; // Adjust the path as needed

const router = express.Router();

// Route to handle user sign up
router.post("/signup", SignUp);

// Route to handle user login
router.post("/login", Login);

router.get("/profile/:userId", getUserProfile);

// Update user profile
router.put("/profile/:userId", updateUserProfile);

export default router;
