export default function StatusBar({ status }) {
  if (!status) return null;

  const isOk = status.ollama;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-full ${
        isOk
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-red-50 text-red-700 border border-red-200"
      }`}
    >
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          isOk ? "bg-green-500 animate-pulse" : "bg-red-500"
        }`}
      />
      {isOk ? (
        <span>
          Ollama online · <strong>{status.activeModel}</strong>
        </span>
      ) : (
        <span>Ollama offline — run: <code className="font-mono bg-red-100 px-1 rounded">ollama serve</code></span>
      )}
    </div>
  );
}
