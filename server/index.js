import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./DB/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import eventsRoutes from "./routes/event.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
