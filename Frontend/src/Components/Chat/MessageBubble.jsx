import ReactMarkdown from "react-markdown";

const ChakraIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="46" fill="none" stroke="#000080" strokeWidth="5" />
    <circle cx="50" cy="50" r="7" fill="#000080" />
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 15 * Math.PI) / 180;
      const x1 = 50 + 9 * Math.cos(angle);
      const y1 = 50 + 9 * Math.sin(angle);
      const x2 = 50 + 42 * Math.cos(angle);
      const y2 = 50 + 42 * Math.sin(angle);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#000080" strokeWidth="2.5" />;
    })}
  </svg>
);

const TypingDots = () => (
  <div className="flex items-center gap-1.5 py-1 px-1">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-2 h-2 rounded-full bg-gray-400"
        style={{ animation: `pulse3 1.2s infinite ease-in-out ${i * 0.2}s` }}
      />
    ))}
    <style>{`
      @keyframes pulse3 {
        0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
        40% { transform: scale(1); opacity: 1; }
      }
    `}</style>
  </div>
);

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const isLoading = message._loading;
  const isError = message.error;

  return (
    <div className={`msg-animate flex gap-3 mb-5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow"
            style={{ backgroundColor: "#FF9933" }}>
            U
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 shadow flex items-center justify-center p-1">
            <ChakraIcon />
          </div>
        )}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
        <span className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: isUser ? "#FF9933" : "#000080" }}>
          {isUser ? "You" : "Voter Mitra"}
        </span>

        <div
          className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
            isUser
              ? "text-white rounded-tr-sm"
              : isError
              ? "bg-red-50 border border-red-200 text-red-700 rounded-tl-sm"
              : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm"
          }`}
          style={isUser ? { backgroundColor: "#FF9933" } : {}}
        >
          {isLoading ? (
            <TypingDots />
          ) : isUser ? (
            <p>{message.content}</p>
          ) : (
            <div className="bot-content">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {message.timestamp && !isLoading && (
          <span className="text-[10px] text-gray-400">
            {new Date(message.timestamp).toLocaleTimeString("en-IN", {
              hour: "2-digit", minute: "2-digit",
            })}
          </span>
        )}
      </div>
    </div>
  );
}
