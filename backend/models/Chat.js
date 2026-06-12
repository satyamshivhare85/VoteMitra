// // In-memory store (swap with MongoDB/SQLite for persistence)
// const sessions = new Map();

// export const createSession = (sessionId) => {
//   const session = {
//     id: sessionId,
//     createdAt: new Date().toISOString(),
//     messages: [
//       {
//         role: "assistant",
//         content:
//           "Namaste! 🇮🇳 I am **Voter Mitra**, your AI guide to Indian elections. I can help you with voter registration, finding polling stations, electoral laws, political parties, election history, and the Election Commission of India. How can I assist you today?",
//         timestamp: new Date().toISOString(),
//       },
//     ],
//   };
//   sessions.set(sessionId, session);
//   return session;
// };

// export const getSession = (sessionId) => {
//   return sessions.get(sessionId) || null;
// };

// export const getAllSessions = () => {
//   return Array.from(sessions.values()).map((s) => ({
//     id: s.id,
//     createdAt: s.createdAt,
//     preview:
//       s.messages.find((m) => m.role === "user")?.content?.substring(0, 40) ||
//       "New Chat",
//     messageCount: s.messages.length,
//   }));
// };

// export const addMessage = (sessionId, role, content) => {
//   const session = sessions.get(sessionId);
//   if (!session) return null;
//   const message = { role, content, timestamp: new Date().toISOString() };
//   session.messages.push(message);
//   return message;
// };

// export const deleteSession = (sessionId) => {
//   return sessions.delete(sessionId);
// };


import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "New Chat",
    },

    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;