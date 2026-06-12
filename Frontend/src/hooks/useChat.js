import { useState, useEffect, useCallback } from "react";
import { api } from "../utils/Chatapi.js";

export const useChat = () => {
  const [sessions, setSessions] = useState([]);

  const [currentSession, setCurrentSession] =
    useState(null);

  const [messages, setMessages] = useState([]);

  const [isLoading, setIsLoading] =
    useState(false);

  const [ollamaStatus, setOllamaStatus] =
    useState(null);



  // =========================
  // HEALTH CHECK
  // =========================

  useEffect(() => {
    api
      .healthCheck()
      .then(setOllamaStatus)
      .catch(() =>
        setOllamaStatus({
          status: "error",
          ollama: false,
        })
      );
  }, []);



  // =========================
  // REFRESH SESSIONS
  // =========================

  const refreshSessions = useCallback(
    async () => {
      try {
        const data = await api.getSessions();

        setSessions(data.sessions || []);
      } catch (error) {
        console.error(
          "Failed to load sessions:",
          error
        );
      }
    },
    []
  );



  useEffect(() => {
    refreshSessions();
  }, [refreshSessions]);



  // =========================
  // CREATE NEW SESSION
  // =========================

  const startNewSession = useCallback(
    async () => {
      try {
        const data = await api.newSession();

        setCurrentSession(data.sessionId);

        setMessages(data.messages || []);

        await refreshSessions();

        return data.sessionId;
      } catch (error) {
        console.error(
          "New session error:",
          error
        );
      }
    },
    [refreshSessions]
  );



  // =========================
  // LOAD SESSION
  // =========================

  const loadSession = useCallback(
    async (sessionId) => {
      try {
        const data = await api.getSession(
          sessionId
        );

        setCurrentSession(sessionId);

        setMessages(data.messages || []);
      } catch (error) {
        console.error(
          "Load session error:",
          error
        );
      }
    },
    []
  );



  // =========================
  // DELETE SESSION
  // =========================

  const deleteSession = useCallback(
    async (sessionId) => {
      try {
        await api.deleteSession(sessionId);

        if (currentSession === sessionId) {
          setCurrentSession(null);

          setMessages([]);
        }

        await refreshSessions();
      } catch (error) {
        console.error(
          "Delete session error:",
          error
        );
      }
    },
    [currentSession, refreshSessions]
  );



  // =========================
  // SEND MESSAGE
  // =========================

  const sendMessage = useCallback(
    async (content) => {
      if (!content.trim() || isLoading)
        return;

      setIsLoading(true);

      let sessionId = currentSession;

      try {
        // CREATE SESSION IF NOT EXISTS

        if (!sessionId) {
          const data =
            await api.newSession();

          sessionId = data.sessionId;

          setCurrentSession(sessionId);

          setMessages(data.messages || []);

          await refreshSessions();
        }



        // USER MESSAGE

        const userMessage = {
          id: Date.now(),

          role: "user",

          content,

          timestamp:
            new Date().toISOString(),
        };



        // LOADING MESSAGE

        const loadingId =
          Date.now() + 1;

        const loadingMessage = {
          id: loadingId,

          role: "assistant",

          content: "",

          _loading: true,

          timestamp:
            new Date().toISOString(),
        };



        setMessages((prev) => [
          ...prev,
          userMessage,
          loadingMessage,
        ]);



        // API CALL

        const data =
          await api.sendMessage(
            sessionId,
            content
          );



        // REPLACE LOADING WITH REAL RESPONSE

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loadingId
              ? {
                  id: loadingId,

                  role: "assistant",

                  content:
                    data.reply,

                  timestamp:
                    new Date().toISOString(),
                }
              : msg
          )
        );



        await refreshSessions();
      } catch (error) {
        console.error(
          "Send message error:",
          error
        );



        setMessages((prev) =>
          prev.map((msg) =>
            msg._loading
              ? {
                  role: "assistant",

                  content: `⚠️ ${error.message}`,

                  error: true,

                  timestamp:
                    new Date().toISOString(),
                }
              : msg
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [
      currentSession,
      isLoading,
      refreshSessions,
    ]
  );



  return {
    sessions,

    currentSession,

    messages,

    isStreaming: isLoading,

    ollamaStatus,

    startNewSession,

    loadSession,

    deleteSession,

    sendMessage,

    stopStreaming: () => {},
  };
};
