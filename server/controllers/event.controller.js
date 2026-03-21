import mongoose from "mongoose";
import Event from "../models/event.model.js";

export const getAllEvents = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.location) {
      filter.location = { $regex: req.query.location, $options: "i" };
    }

    if (req.query.ticketPrice) {
      filter.ticketPrice = { $lte: Number(req.query.ticketPrice) };
    }

    const events = await Event.find(filter).sort({ date: 1 });
    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching events",
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const eventsId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(eventsId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format" });
    }

    const event = await Event.findById(eventsId).populate(
      "createdBy",
      "name email",
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      location,
      category,
      totalSeats,
      ticketPrice,
      imageUrl,
    } = req.body;

    if (!title || !date || !totalSeats) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const ExistingEvent = await Event.findOne({ title });
    if (ExistingEvent) {
      return res.status(400).json({
        success: false,
        message: "Event already exists",
      });
    }

    const event = await Event.create({
      title,
      description,
      date,
      location,
      category,
      totalSeats,
      availableSeats: totalSeats,
      ticketPrice,
      imageUrl,
      createdBy: req.user._id,
    });
    console.log(event);
    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Event ID" });
    }

    const event = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Event ID" });
    }

    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
