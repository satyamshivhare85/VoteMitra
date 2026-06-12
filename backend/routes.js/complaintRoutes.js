import express from "express";
import { createComplaint } from "../controllers/complaintController.js";

const Complaintrouter = express.Router();

// POST complaint
 Complaintrouter.post("/complaint", createComplaint);

export default  Complaintrouter;