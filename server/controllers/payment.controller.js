import crypto from "crypto";
import Razorpay from "razorpay";
import Booking from "../models/bookings.model.js";
import Event from "../models/event.model.js";
import { sendBookingEmail } from "../utils/mail.utils.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const existingBooking = await Booking.findOne({
      userId,
      eventId,
      status: "confirmed",
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "You have already booked this event!" });
    }

    if (event.availableSeats <= 0) {
      return res
        .status(400)
        .json({ message: "Sorry, this event is sold out!" });
    }

    const amountInPaise = event.ticketPrice * 100;

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_event_${event._id}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    if (!razorpayOrder) {
      return res
        .status(500)
        .json({ message: "Failed to create Razorpay order" });
    }

    const newBooking = await Booking.create({
      userId,
      eventId,
      status: "pending",
      paymentStatus: "unpaid",
      amount: event.ticketPrice,
      razorpay_order_id: razorpayOrder.id,
    });

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order: razorpayOrder,
      bookingId: newBooking._id,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error during payment initiation" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed. Invalid Signature.",
      });
    }

    const updatedBooking = await Booking.findOneAndUpdate(
      { razorpay_order_id: razorpay_order_id },
      {
        paymentStatus: "paid",
        status: "confirmed",
        razorpay_payment_id,
        razorpay_signature,
      },
      { new: true },
    ).populate("eventId userId");

    if (updatedBooking) {
      await Event.findByIdAndUpdate(updatedBooking.eventId._id, {
        $inc: { availableSeats: -1 },
      });

      try {
        await sendBookingEmail(
          updatedBooking.userId.email,
          updatedBooking.userId.name,
          updatedBooking.eventId.title,
        );
      } catch (err) {
        console.log("Email failed but booking confirmed");
      }
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully. Booking confirmed!",
      bookingId: updatedBooking._id,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error during verification" });
  }
};
