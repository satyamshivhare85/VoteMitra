const API_BASE = "http://localhost:8000/api/chat";

export const api = {
  // =========================
  // GET ALL SESSIONS
  // =========================

  async getSessions() {
    const res = await fetch(`${API_BASE}/sessions`);

    if (!res.ok) {
      throw new Error("Failed to fetch sessions");
    }

    return res.json();
  },



  // =========================
  // CREATE NEW SESSION
  // =========================

  async newSession() {
    const res = await fetch(`${API_BASE}/sessions`, {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Failed to create session");
    }

    return res.json();
  },



  // =========================
  // GET SINGLE SESSION
  // =========================

  async getSession(id) {
    const res = await fetch(`${API_BASE}/sessions/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch session");
    }

    return res.json();
  },



  // =========================
  // DELETE SESSION
  // =========================

  async deleteSession(id) {
    const res = await fetch(`${API_BASE}/sessions/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete session");
    }

    return res.json();
  },



  // =========================
  // HEALTH CHECK
  // =========================

  async healthCheck() {
    const res = await fetch(`${API_BASE}/health`);

    return res.json();
  },



  // =========================
  // SEND MESSAGE
  // =========================

  async sendMessage(sessionId, content) {
    const res = await fetch(
      `${API_BASE}/sessions/${sessionId}/messages`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          content,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.error || "Failed to send message"
      );
    }

    return data;
  },
};
