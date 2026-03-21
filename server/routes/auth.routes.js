import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  verifyOtp,
} from "../controllers/auth.contoller.js";
import { protect } from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/verify-otp", verifyOtp);
authRoutes.get("/me", protect, getUser);
authRoutes.post("/logout", protect, logoutUser);

export default authRoutes;
