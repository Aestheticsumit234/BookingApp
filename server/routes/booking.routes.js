import express from "express";
import {
  bookEvent,
  cancleBookings,
  confirmBookings,
  getMyBookings,
  sendBookingOtp,
} from "../controllers/booking.controller.js";
import { isAdmin, protect } from "../middlewares/auth.middleware.js";

const bookingRoutes = express.Router();

bookingRoutes.post("/", protect, bookEvent);
bookingRoutes.post("/send-otp", protect, sendBookingOtp);
bookingRoutes.get("/my-bookings", protect, getMyBookings);
bookingRoutes.put("/:id/confirm", protect, isAdmin, confirmBookings);
bookingRoutes.delete("/:id", protect, cancleBookings);

export default bookingRoutes;
