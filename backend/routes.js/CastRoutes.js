import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import { castVote } from "../controllers/castVoteController.js";

const Castrouter=express.Router();

Castrouter.post(
  "/cast-vote",
  protect,
  castVote
);

export default Castrouter;