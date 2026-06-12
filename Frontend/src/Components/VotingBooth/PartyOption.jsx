// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './VotingBooth.css'

// function VotingBooth() {
//   const [aadhar, setAadhar] = useState(null);
//   const [isVoting, setIsVoting] = useState(false);
//   const [statusText, setStatusText] = useState("");
//   const [hasVoted, setHasVoted] = useState(false);
//   const [flashingParty, setFlashingParty] = useState(null);

//   // --- ROUTE PROTECTION & INITIALIZATION ---
//   useEffect(() => {
//     const verifiedId = localStorage.getItem("verifiedAadhar");
    
//     // If no ID is found in local storage, immediately redirect to verification/home
//     if (!verifiedId) {
//       window.location.href = '/index.html'; // Change to your actual verification route
//       return;
//     }
    
//     setAadhar(verifiedId);

//     // Prevent Back Navigation
//     window.history.pushState(null, document.title, window.location.href);
//     const handlePopState = () => {
//       window.history.pushState(null, document.title, window.location.href);
//       alert("This action is disabled on the voting screen for security reasons.");
//     };
    
//     window.addEventListener('popstate', handlePopState);
//     return () => window.removeEventListener('popstate', handlePopState);
//   }, []);

//   // --- HELPER FUNCTIONS ---
//   const speak = (text) => {
//     window.speechSynthesis.cancel();
//     const utterance = new SpeechSynthesisUtterance(text);
    
//     const voices = window.speechSynthesis.getVoices();
//     const indianVoice = voices.find(voice => voice.lang === 'en-IN');
//     if (indianVoice) utterance.voice = indianVoice;
    
//     utterance.rate = 0.9;
//     window.speechSynthesis.speak(utterance);
//   };

//   const playBeep = () => {
//     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     const oscillator = audioContext.createOscillator();
//     oscillator.connect(audioContext.destination);
//     oscillator.type = 'sine';
//     oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
//     oscillator.start(audioContext.currentTime);
//     oscillator.stop(audioContext.currentTime + 0.5);
//   };

//   // --- CORE VOTING LOGIC ---
//   const castVote = async (party) => {
//     if (!aadhar || isVoting) return;
    
//     setIsVoting(true);
//     setStatusText("Submitting your vote...");
//     setFlashingParty(party);
//     playBeep();

//     try {
//       // Using Axios for the API Call
//       const res = await axios.post("http://localhost:5000/api/cast-vote", {
//         aadhar,
//         party
//       });

//       if (res.status === 201) {
//         localStorage.removeItem("verifiedAadhar");
//         setHasVoted(true);
//         const successMessage = "Thank you for voting. We appreciate your effort to take a step in our democratic initiative.";
//         speak(successMessage);
//         setTimeout(() => { window.location.href = '/home.html'; }, 5000);
//       }
      
//     } catch (err) {
//       console.error("Axios Error:", err);
      
//       // Axios puts non-2xx responses into the catch block
//       if (err.response && err.response.status === 409) {
//         setStatusText("⚠️ You have already voted! Redirecting...");
//         speak("Error. You have already voted.");
//         setTimeout(() => { window.location.href = '/home.html'; }, 4000);
//       } else {
//         const errorMessage = "Server error. Could not connect.";
//         setStatusText(`❌ ${errorMessage}`);
//         speak(errorMessage);
//         setIsVoting(false); // Only re-enable if it was a server error, not if they already voted
//       }
//     } finally {
//       setTimeout(() => setFlashingParty(null), 1000); // Stop flash animation
//     }
//   };

//   // Format ID for display
//   const getMaskedAadhar = () => {
//     if (!aadhar) return "";
//     const lastFour = aadhar.slice(-4);
//     return `✅ Voter ID: **** **** ${lastFour}`;
//   };

//   // --- RENDER ---
  
//   // If redirecting, don't render the UI to prevent flickering
//   if (!aadhar) return null; 

//   return (
//     <div className="flex flex-col items-center justify-between min-h-screen">
//       {/* Security Warning Header */}
//       <div className="w-full bg-yellow-600 text-black text-center p-2 font-bold shadow-lg">
//         <p>⚠️ Now this window is secure. You can't go back. In case of suspicious activity, you will be held responsible.</p>
//       </div>

//       <main className="flex flex-col items-center justify-center p-4 w-full flex-grow">
        
//         {/* Render EVM if hasn't voted, otherwise render Thank You */}
//         {!hasVoted ? (
//           <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-2xl w-full max-w-2xl border-2 border-gray-700">
//             {/* Header */}
//             <div className="flex items-center justify-center mb-4 text-center border-b-2 border-gray-600 pb-4">
//               <img 
//                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/1200px-Emblem_of_India.svg.png" 
//                 alt="Emblem of India" 
//                 className="h-12 mr-4 invert" 
//                 onError={(e) => e.target.style.display = 'none'} 
//               />
//               <div>
//                 <h1 className="text-xl sm:text-2xl font-black text-gray-200">ELECTION COMMISSION OF INDIA</h1>
//                 <p className="text-sm text-green-400 font-semibold">{getMaskedAadhar()}</p>
//               </div>
//             </div>

//             {/* Party List */}
//             <div className="space-y-3">
//               {[
//                 { id: 1, symbol: '🪷', name: 'Bharatiya Janata Party (BJP)', color: 'text-orange-400' },
//                 { id: 2, symbol: '✋', name: 'Indian National Congress (INC)', color: 'text-cyan-400' },
//                 { id: 3, symbol: '🧹', name: 'Aam Aadmi Party (AAP)', color: 'text-yellow-300' },
//                 { id: 4, symbol: '🐘', name: 'Bahujan Samaj Party (BSP)', color: 'text-blue-400' }
//               ].map((party) => (
//                 <div key={party.id} className="flex items-center bg-gray-800 p-2 rounded-md">
//                   <span className="font-bold text-lg w-8">{party.id}.</span>
//                   <span className="text-4xl w-16 text-center">{party.symbol}</span>
//                   <span className={`flex-grow font-semibold text-base sm:text-lg ${party.color}`}>
//                     {party.name}
//                   </span>
//                   <div className="flex items-center">
//                     <div className={`w-4 h-4 rounded-full mr-3 ${flashingParty === party.name ? 'flash' : 'bg-gray-700'}`}></div>
//                     <button 
//                       onClick={() => castVote(party.name)}
//                       disabled={isVoting}
//                       className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed py-2 px-6 rounded-lg font-bold transition-transform transform hover:scale-105"
//                     >
//                       VOTE
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Status Message */}
//             <p className="mt-4 text-center text-lg h-6 text-red-400">{statusText}</p>
//           </div>
//         ) : (
//           <div className="text-center bg-gray-900 p-10 rounded-lg shadow-2xl border-2 border-green-500">
//             <h2 className="text-4xl font-bold text-green-400 mb-4">Thank You For Voting!</h2>
//             <p className="text-lg text-gray-300">We appreciate your effort to take a step in our democratic initiative.</p>
//             <p className="text-sm mt-6 text-gray-500">This session will terminate automatically.</p>
//           </div>
//         )}

//       </main>

//       {/* Footer */}
//       <footer className="w-full text-center p-4 text-gray-500 text-sm">
//         Contact in case of emergency. Helpline: 1950 | ECI Main: 011-23052205
//       </footer>
//     </div>
//   );
// }

// export default VotingBooth;


import React from "react";

const PartyOption = ({ index, symbol, name, color, onVote, disabled }) => {
  return (
    <div className="flex items-center bg-gray-800 p-2 rounded-md">
      <span className="font-bold text-lg w-8">{index}.</span>
      <span className="text-4xl w-16 text-center">{symbol}</span>
      <span className={`flex-grow font-semibold text-base sm:text-lg ${color}`}>
        {name}
      </span>

      <div className="vote-area flex items-center">
        <div className="w-4 h-4 bg-gray-700 rounded-full mr-3"></div>
        <button
          onClick={onVote}
          disabled={disabled}
          className="bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-lg font-bold transition-transform transform hover:scale-105"
        >
          VOTE
        </button>
      </div>
    </div>
  );
};

export default PartyOption;