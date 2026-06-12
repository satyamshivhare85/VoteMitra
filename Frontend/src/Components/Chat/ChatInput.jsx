import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
  "How do I register to vote?",
  "What is the Voter ID card process?",
  "How does the EVM work?",
  "When are Lok Sabha elections held?",
];

export default function ChatInput({ onSend, isStreaming, onStop, disabled }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const autoResize = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  };

  useEffect(() => { autoResize(); }, [value]);

  const handleSubmit = () => {
    if (!value.trim() || isStreaming) return;
    onSend(value);
    setValue("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white px-4 pt-3 pb-4">
      {/* Suggestion chips — shown only when empty */}
      {value === "" && !isStreaming && (
        <div className="flex flex-wrap gap-2 mb-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onSend(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-saffron-400 hover:text-saffron-600 hover:bg-orange-50 transition-all bg-white"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div className="flex items-end gap-3 bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-2 focus-within:border-saffron-400 focus-within:bg-white transition-all">
        {/* Flag icon */}
        <span className="text-lg mb-0.5 flex-shrink-0">🗳️</span>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          disabled={disabled}
          placeholder="Ask about voter registration, elections, parties…"
          rows={1}
          className="flex-1 bg-transparent resize-none text-sm text-gray-800 placeholder-gray-400 focus:outline-none py-1 leading-relaxed"
          style={{ maxHeight: "120px" }}
        />

        {/* Send / Stop button */}
        {isStreaming ? (
          <button
            onClick={onStop}
            className="flex-shrink-0 w-9 h-9 mb-0.5 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
            title="Stop"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!value.trim() || disabled}
            className="flex-shrink-0 w-9 h-9 mb-0.5 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#FF9933" }}
            title="Send (Enter)"
          >
            <svg className="w-4 h-4 text-white rotate-90" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        )}
      </div>
      <p className="text-[10px] text-gray-400 text-center mt-2">
        Voter Mitra only answers questions about Indian elections · Press Enter to send
      </p>
    </div>
  );
}
