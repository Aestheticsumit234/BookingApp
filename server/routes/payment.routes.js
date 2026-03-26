import express from "express";
import {
  createOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const paymentRoutes = express.Router();

paymentRoutes.post("/create-order", protect, createOrder);
paymentRoutes.post("/verify", protect, verifyPayment);

export default paymentRoutes;
