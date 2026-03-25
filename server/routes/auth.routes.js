import express from "express";
import {
  forgetPassword,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  verifyOtp,
} from "../controllers/auth.contoller.js";
import { protect } from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/verify-otp", verifyOtp);
authRoutes.get("/me", protect, getUser);

authRoutes.post("/logout", protect, logoutUser);
authRoutes.post("/forgot-password", forgetPassword);
authRoutes.post("/reset-password", resetPassword);

export default authRoutes;
