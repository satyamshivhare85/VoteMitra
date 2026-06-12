import { useState, useRef, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar.jsx"
import Sidebar from "../Components/Chat/Sidebar.jsx"
import MessageBubble from "../Components/Chat/MessageBubble.jsx"
import ChatInput from "../Components/Chat/ChatInput.jsx"
import WelcomeScreen from "../Components/Chat/ChatInput.jsx"
import StatusBar from "../Components/Chat/StatusBar.jsx"
import { useChat } from "../hooks/useChat.js"
import "../styles/chatbot.css"

export default function ChatbotPage() {
  const {
    sessions,
    currentSession,
    messages,
    isStreaming,
    ollamaStatus,
    startNewSession,
    loadSession,
    deleteSession,
    sendMessage,
    stopStreaming,
  } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (content) => {
    await sendMessage(content);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden" style={{ paddingTop: "4rem" }}>
        <Sidebar
          sessions={sessions}
          currentSession={currentSession}
          onNewChat={startNewSession}
          onLoadSession={loadSession}
          onDeleteSession={deleteSession}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main chat panel */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Tricolor top stripe */}
          <div className="h-1 w-full flex-shrink-0">
            <div className="h-full w-full" style={{
              background: "linear-gradient(90deg, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)"
            }} />
          </div>

          {/* Chat card */}
          <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto bg-white shadow-xl rounded-none overflow-hidden my-0 md:my-4 md:rounded-2xl">
            {/* Chat header */}
            <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white flex-shrink-0">
              <div className="flex items-center gap-3">
                {/* Mobile: sidebar toggle */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden p-1.5 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <div>
                  <h2 className="text-sm font-bold text-gray-900">
                    🇮🇳 Indian Voting Info Assistant
                  </h2>
                  <p className="text-[11px] text-gray-500">Your AI guide to elections in India</p>
                </div>
              </div>

              <StatusBar status={ollamaStatus} />
            </header>

            {/* Messages area */}
            <main className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50">
              {!currentSession ? (
                <WelcomeScreen onStart={startNewSession} />
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400 text-sm">Loading…</p>
                </div>
              ) : (
                <>
                  {messages.map((msg, idx) => (
                    <MessageBubble key={msg._id || idx} message={msg} />
                  ))}
                  <div ref={bottomRef} />
                </>
              )}
            </main>

            {/* Input */}
            <ChatInput
              onSend={handleSend}
              isStreaming={isStreaming}
              onStop={stopStreaming}
              disabled={!currentSession && isStreaming}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
