import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "../controllers/event.controller.js";
import { isAdmin, protect } from "../middlewares/auth.middleware.js";

const eventRoutes = express.Router();

console.log("Protect function:", typeof protect);
console.log("IsAdmin function:", typeof isAdmin);
console.log("CreateEvent function:", typeof createEvent);

eventRoutes.get("/", getAllEvents);
eventRoutes.get("/:id", getEventById);

eventRoutes.post("/create-event", protect, isAdmin, createEvent);

eventRoutes.delete("/delete-event/:id", protect, isAdmin, deleteEvent);

eventRoutes.put("/update-event/:id", protect, isAdmin, updateEvent);

export default eventRoutes;
