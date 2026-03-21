import Booking from "../models/bookings.model.js";
import Event from "../models/event.model.js";
import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import { generateOTP } from "../utils/generateOTP.utils.js";
import { sendBookingEmail, sendOTPMail } from "../utils/mail.utils.js";

export const sendBookingOtp = async (req, res) => {
  const otp = generateOTP();
  try {
    await OTP.findOneAndDelete({
      email: req.user.email,
      action: "event_booking",
    });
    await OTP.create({ email: req.user.email, otp, action: "event_booking" });
    await sendOTPMail(req.user.email, otp, "event_booking");
    res.status(200).json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

export const bookEvent = async (req, res) => {
  try {
    const { eventId, otp } = req.body;

    const otpRecord = await OTP.findOne({
      email: req.user.email,
      otp,
      action: "event_booking",
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.availableSeats < 1) {
      return res.status(400).json({ message: "No more seats available" });
    }

    const existingBooking = await Booking.findOne({
      userId: req.user._id,
      eventId: eventId,
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "You have already booked this event" });
    }

    const bookings = await Booking.create({
      userId: req.user._id,
      eventId,
      status: "pending",
      paymentStatus: "unpaid",
      amount: event.ticketPrice,
    });

    await OTP.deleteOne({ _id: otpRecord._id });

    res
      .status(200)
      .json({ success: true, message: "Event booked successfully!", bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to book event", error: error.message });
  }
};

export const confirmBookings = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    if (!["paid", "unpaid"].includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    const booking = await Booking.findById(req.params.id).populate(
      "userId",
      "email",
    );

    const user = await User.findById(booking.userId._id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "confirmed") {
      return res.status(400).json({ message: "Booking is already confirmed" });
    }

    const event = await Event.findOneAndUpdate(
      { _id: booking.eventId, availableSeats: { $gt: 0 } },
      { $inc: { availableSeats: -1 } },
      { returnDocument: "after" },
    );

    if (!event) {
      return res
        .status(400)
        .json({ message: "No more seats available or event not found" });
    }

    booking.paymentStatus = paymentStatus || "paid";
    booking.status = "confirmed";
    await booking.save();

    await sendBookingEmail(booking.userId.email, user.name, event.title);

    res.status(200).json({
      success: true,
      message: "Booking confirmed and seat reserved!",
      availableSeatsNow: event.availableSeats,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to confirm booking", error: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate(
      "eventId",
    );
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ message: "Failed to get bookings" });
  }
};

export const cancleBookings = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

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
      .json({ message: "Error canceling booking", error: error.message });
  }
};
