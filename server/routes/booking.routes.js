import express from "express";
import {
  cancleBookings,
  confirmBookings,
  getAllBookingsForAdmin,
  getMyBookings,
} from "../controllers/booking.controller.js";
import { isAdmin, protect } from "../middlewares/auth.middleware.js";

const bookingRoutes = express.Router();

bookingRoutes.get("/my-bookings", protect, getMyBookings);
bookingRoutes.delete("/:id", protect, cancleBookings);

bookingRoutes.get("/all-bookings", protect, isAdmin, getAllBookingsForAdmin);
bookingRoutes.put("/:id/confirm", protect, isAdmin, confirmBookings);

export default bookingRoutes;
