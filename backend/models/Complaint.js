// models/Complaint.js

import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Complaint", complaintSchema);