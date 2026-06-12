import express from "express";
import { verifyVoter } from "../controllers/voteController.js";

const Voterouter = express.Router();

Voterouter.post("/vote", verifyVoter);

export default Voterouter;