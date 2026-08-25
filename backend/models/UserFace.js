import mongoose from "mongoose";

const userFaceSchema = new mongoose.Schema(
  {
    aadharHash: {
      type: String,
      required: true,
      unique: true,
    },




    embeddings: {
      type: [[Number]],
      required: true,
    },

    hasVoted: {
      type: Boolean,
      default: false,
    },

    votedAt: {
      type: Date,
      default: null,
    },

    registrationStatus: {
      type: String,
      enum: ["pending", "verified"],
      default: "verified",
    },

    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

export default mongoose.model("UserFace", userFaceSchema);