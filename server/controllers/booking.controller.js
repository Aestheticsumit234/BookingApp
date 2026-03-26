import Booking from "../models/bookings.model.js";
import Event from "../models/event.model.js";
import { sendBookingEmail } from "../utils/mail.utils.js";

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("eventId")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch bookings" });
  }
};

export const cancleBookings = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.status === "confirmed") {
      await Event.findByIdAndUpdate(booking.eventId, {
        $inc: { availableSeats: 1 },
      });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Booking canceled successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error canceling booking" });
  }
};

export const getAllBookingsForAdmin = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("eventId", "title date location ticketPrice")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch admin logs" });
  }
};

export const confirmBookings = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "userId",
      "email name",
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.status === "confirmed")
      return res.status(400).json({ message: "Already confirmed" });

    const event = await Event.findOneAndUpdate(
      { _id: booking.eventId, availableSeats: { $gt: 0 } },
      { $inc: { availableSeats: -1 } },
      { returnDocument: "after" },
    );

    if (!event) return res.status(400).json({ message: "No seats available!" });

    booking.paymentStatus = "paid";
    booking.status = "confirmed";
    await booking.save();

    await sendBookingEmail(
      booking.userId.email,
      booking.userId.name,
      event.title,
    );

    res
      .status(200)
      .json({ success: true, message: "Booking confirmed by admin" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Manual confirmation failed" });
  }
};
