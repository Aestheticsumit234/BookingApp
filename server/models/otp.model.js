import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    enum: ["account_verification", "event_booking", "password_reset"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // 5 minutes baad expire
  },
});

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
