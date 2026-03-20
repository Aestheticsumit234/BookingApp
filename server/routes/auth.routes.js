import express from "express";
import {
  loginUser,
  registerUser,
  verifyOtp,
} from "../controllers/auth.contoller.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/verify-otp", verifyOtp);

export default authRoutes;
