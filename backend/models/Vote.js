import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserFace",
    required: true,
    unique: true
  },

  party: {
    type: String,
    required: true
  },

  votedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Vote", voteSchema);