const FEATURES = [
  { icon: "🪪", title: "Voter ID", desc: "Registration, correction & download" },
  { icon: "🏛️", title: "Election Commission", desc: "ECI structure & functions" },
  { icon: "🗺️", title: "Polling Stations", desc: "Find your booth & constituency" },
  { icon: "⚖️", title: "Electoral Laws", desc: "RPA, MCC & voting rights" },
  { icon: "📊", title: "Election History", desc: "Past results & statistics" },
  { icon: "🏅", title: "Political Parties", desc: "National & state party info" },
];

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10 px-6 text-center">
      {/* Ashoka Chakra */}
      <div className="w-20 h-20 mb-6">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#000080" strokeWidth="4" />
          <circle cx="50" cy="50" r="8" fill="#000080" />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const x1 = 50 + 10 * Math.cos(angle);
            const y1 = 50 + 10 * Math.sin(angle);
            const x2 = 50 + 44 * Math.cos(angle);
            const y2 = 50 + 44 * Math.sin(angle);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#000080" strokeWidth="2.5" />
            );
          })}
        </svg>
      </div>

      <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
        Voter <span style={{ color: "#FF9933" }}>Mitra</span>
      </h1>
      <p className="text-gray-500 text-sm mb-1 max-w-sm">
        Your AI guide to Indian elections, voting rights, and civic participation.
      </p>
      <div className="flex items-center gap-1.5 mb-8">
        <span className="text-lg">🇮🇳</span>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
          Jai Hind · Democratic India
        </span>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg mb-8">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="bg-white border border-gray-200 rounded-xl p-3 text-left hover:border-orange-300 hover:shadow-sm transition-all cursor-default"
          >
            <span className="text-xl">{f.icon}</span>
            <p className="text-sm font-semibold text-gray-800 mt-1">{f.title}</p>
            <p className="text-[11px] text-gray-500 leading-tight">{f.desc}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="px-8 py-3 text-white font-semibold rounded-xl shadow hover:opacity-90 active:scale-95 transition-all text-sm"
        style={{ backgroundColor: "#FF9933" }}
      >
        Start a Conversation →
      </button>
    </div>
  );
}
