import { Router } from "express";
import {
  getSessions,
  newSession,
  getSessionById,
  removeSession,
  sendMessage,
  healthCheck,
} from "../controllers/chatController.js";

const Chatrouter = Router();

Chatrouter.get("/health", healthCheck);
Chatrouter.get("/sessions", getSessions);
Chatrouter.post("/sessions", newSession);
Chatrouter.get("/sessions/:id", getSessionById);
Chatrouter.delete("/sessions/:id", removeSession);
Chatrouter.post("/sessions/:id/messages", sendMessage);

export default Chatrouter;
