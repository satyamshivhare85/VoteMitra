export default function Sidebar({
  sessions,
  currentSession,
  onNewChat,
  onLoadSession,
  onDeleteSession,
  isOpen,
  onClose,
}) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:relative top-0 left-0 h-full z-30 md:z-auto
          w-64 bg-white border-r border-gray-200 flex flex-col
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{ paddingTop: "4.5rem" }}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Conversations
          </span>
          <button
            onClick={onNewChat}
            className="flex items-center gap-1 px-3 py-1.5 bg-saffron-500 hover:bg-saffron-600 text-white text-xs font-semibold rounded-lg transition-colors"
            title="New Chat"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            New
          </button>
        </div>

        {/* Session list */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
          {sessions.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-8 px-3">
              No conversations yet. Start a new chat!
            </p>
          )}
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`group relative flex items-center rounded-lg cursor-pointer transition-all ${
                session.id === currentSession
                  ? "session-active"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => { onLoadSession(session.id); onClose(); }}
            >
              <div className="flex-1 min-w-0 px-3 py-2.5">
                <p className="text-sm text-gray-800 truncate font-medium">
                  {session.preview || "New Chat"}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {session.messageCount} messages
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 mr-1 rounded-md hover:bg-red-50 hover:text-red-500 text-gray-400 transition-all"
                title="Delete"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </nav>

        {/* Footer branding */}
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-india-green animate-pulse" />
            <span className="text-xs text-gray-500">Powered by Ollama</span>
          </div>
        </div>
      </aside>
    </>
  );
}
