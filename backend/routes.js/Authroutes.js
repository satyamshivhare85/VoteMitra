// routes/authRoutes.js

import express from "express";

import { registerUser } from "../controllers/authController.js";

const Authrouter = express.Router();

Authrouter.post("/register", registerUser);

export default Authrouter;