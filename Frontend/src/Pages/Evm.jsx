import React, { useEffect, useState } from "react";
import PartyOption from "../components/VotingBooth/PartyOption";
import ThankYou from "../components/VotingBooth/ThankYou";
import { useNavigate } from "react-router-dom";


const parties = [
  {
    id: 1,
    name: "Bharatiya Janata Party (BJP)",
    symbol: "🪷",
    color: "text-orange-400",
  },
  {
    id: 2,
    name: "Indian National Congress (INC)",
    symbol: "✋",
    color: "text-cyan-400",
  },
  {
    id: 3,
    name: "Aam Aadmi Party (AAP)",
    symbol: "🧹",
    color: "text-yellow-300",
  },
  {
    id: 4,
    name: "Bahujan Samaj Party (BSP)",
    symbol: "🐘",
    color: "text-blue-400",
  },
];

const EVM = () => {
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState("");
  const [isVoting, setIsVoting] = useState(false);
  const [voted, setVoted] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (!storedToken) {
      // Redirect to login if no token is found
      window.location.href = "/";
    } else {
      setToken(storedToken);
    }
  }, []);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const castVote = async (partyName) => {
    if (!token || isVoting) return;
    
    setIsVoting(true);
    setStatus("Submitting your vote...");

    try {
      const res = await fetch("http://localhost:8000/api/cast-vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ party: partyName }),
      });

      if (res.status === 201) {
        sessionStorage.removeItem("token");
        localStorage.removeItem("token");
        setVoted(true);
        speak("Thank you for voting. Your vote has been recorded successfully.");

        setTimeout(() => {
         navigate("/");
        }, 5000);
      } else if (res.status === 409) {
        setStatus("⚠️ You have already voted! Redirecting...");
        speak("Error. You have already voted.");

        setTimeout(() => {
          window.location.href = "/home.html";
        }, 4000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Server error. Could not connect.");
      speak("Server error. Could not connect.");
      setIsVoting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0E0E10] text-white">
      {/* Header */}
      <div className="w-full bg-yellow-600 text-black text-center p-2 font-bold">
        ⚠️ Secure Session Active. Do not navigate away.
      </div>

      <main className="flex flex-col items-center justify-center p-4 w-full">
        {!voted ? (
          <div className="bg-gray-900 p-6 rounded-lg shadow-2xl w-full max-w-2xl border-2 border-gray-700">
            <h1 className="text-center text-2xl font-black mb-4">
              ELECTION COMMISSION OF INDIA
            </h1>

            <p className="text-center text-green-400 mb-4">
              {token ? "✅ Voter Authenticated" : "❌ Verification Required"}
            </p>

            <div className="space-y-3">
              {parties.map((p) => (
                <PartyOption
                  key={p.id}
                  index={p.id}
                  symbol={p.symbol}
                  name={p.name}
                  color={p.color}
                  disabled={!token || isVoting}
                  onVote={() => castVote(p.name)}
                />
              ))}
            </div>

            <p className="mt-4 text-center text-sm text-gray-400">{status}</p>
          </div>
        ) : (
          <ThankYou />
        )}
      </main>

      <footer className="text-center p-4 text-gray-500 text-sm">
        Helpline: 1950 | ECI: 011-23052205
      </footer>
    </div>
  );
};

export default EVM;