import bcrypt from "bcryptjs";
import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import { sendOTPMail } from "../utils/mail.utils.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isVerified: false,
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.create({
      email,
      otp,
      action: "account_verification",
    });

    await sendOTPMail(email, otp, "account_verification");

    res.status(201).json({
      message: "User registered successfully please verify your account",
      Email: user.email,
    });
  } catch (error) {
    console.log(`Internal Server Error Aaya bro`);
    res.status(500).json({ message: "Internal Server Error Aaya bro" });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified && user.role === "user") {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await OTP.deleteMany({ email, action: "account_verification" }); // purna delete krne ke liye

      await OTP.create({
        email,
        otp,
        action: "account_verification",
      });

      await sendOTPMail(email, otp, "account_verification");
      return res
        .status(401)
        .json({ message: "Account not verified. A new OTP has been sent" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {}
};
export const verifyOtp = async (req, res) => {};
