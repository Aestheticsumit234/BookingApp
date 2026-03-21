import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Music", "Sports", "Tech", "Art", "Business", "Other"],
    },
    totalSeats: {
      type: Number,
      required: true,
      min: [1, "Seats cannot be less than 1"],
    },
    availableSeats: {
      type: Number,
      required: true,
      default: function () {
        return this.totalSeats;
      },
    },
    ticketPrice: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    imageUrl: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/400x200?text=Zion+Event",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

eventSchema.pre("save", async function () {
  if (this.availableSeats === undefined || this.availableSeats === null) {
    this.availableSeats = this.totalSeats;
  }
  if (this.availableSeats > this.totalSeats) {
    this.availableSeats = this.totalSeats;
  }
});
const Event = mongoose.model("Event", eventSchema);
export default Event;
