

import { v4 as uuidv4 } from "uuid";
import Chat from "../models/Chat.js";

const OLLAMA_BASE_URL =
  process.env.OLLAMA_URL || "http://localhost:11434";

const OLLAMA_MODEL =
  process.env.OLLAMA_MODEL || "llama3.2";

const SYSTEM_PROMPT = `You are Voter Mitra, a specialized AI assistant for Indian election and voting information.

Your expertise covers:
- Voter registration process and requirements
- Voter ID card (EPIC) application, correction, and download
- Polling station information and booth details
- Electoral roll search and verification
- Election Commission of India (ECI) structure and functions
- Indian electoral laws
- Political parties
- Election schedule and history
- EVMs and NOTA

Rules:
1. ONLY answer questions related to Indian elections and voting.
2. Be neutral and unbiased.
3. Provide factual information.
4. Use Hindi terms when useful.
5. Encourage democratic participation.
`;



// =========================
// OLLAMA CALL
// =========================

const callOllama = async (messages) => {
  const ollamaMessages = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      model: OLLAMA_MODEL,

      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },

        ...ollamaMessages,
      ],

      stream: false,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();

    throw new Error(
      `Ollama error: ${response.status} - ${errText}`
    );
  }

  const data = await response.json();

  return (
    data.message?.content ||
    "Unable to generate response."
  );
};



// =========================
// GET ALL SESSIONS
// =========================

export const getSessions = async (req, res) => {
  try {
    const chats = await Chat.find()
      .sort({ updatedAt: -1 });

    const sessions = chats.map((chat) => ({
      id: chat._id,

      createdAt: chat.createdAt,

      preview:
        chat.messages.find(
          (m) => m.role === "user"
        )?.content?.substring(0, 40) || "New Chat",

      messageCount: chat.messages.length,
    }));

    res.json({ sessions });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



// =========================
// CREATE SESSION
// =========================

export const newSession = async (req, res) => {
  try {
    const chat = await Chat.create({
      title: "New Chat",

      messages: [
        {
          role: "assistant",

          content:
            "Namaste! 🇮🇳 I am Voter Mitra, your AI guide to Indian elections. How can I assist you today?",
        },
      ],
    });

    res.json({
      sessionId: chat._id,

      messages: chat.messages,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



// =========================
// GET SINGLE SESSION
// =========================

export const getSessionById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        error: "Session not found",
      });
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



// =========================
// DELETE SESSION
// =========================

export const removeSession = async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};



// =========================
// SEND MESSAGE
// =========================

export const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;

    const { id } = req.params;

    if (!content?.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const chat = await Chat.findById(id);

    if (!chat) {
      return res.status(404).json({
        error: "Session not found",
      });
    }

    // USER MESSAGE SAVE

    chat.messages.push({
      role: "user",
      content,
    });

    await chat.save();

    // OLLAMA RESPONSE

    const botReply = await callOllama(
      chat.messages
    );

    // ASSISTANT MESSAGE SAVE

    chat.messages.push({
      role: "assistant",
      content: botReply,
    });

    await chat.save();

    res.json({
      reply: botReply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};



// =========================
// HEALTH CHECK
// =========================

export const healthCheck = async (req, res) => {
  try {
    const response = await fetch(
      `${OLLAMA_BASE_URL}/api/tags`
    );

    const data = await response.json();

    res.json({
      status: "ok",

      ollama: true,

      models:
        data.models?.map((m) => m.name) || [],

      activeModel: OLLAMA_MODEL,
    });
  } catch {
    res.json({
      status: "degraded",

      ollama: false,

      error: "Ollama not reachable",
    });
  }
};
