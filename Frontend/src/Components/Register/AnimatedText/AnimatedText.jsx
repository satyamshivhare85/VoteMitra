import React, { useState, useEffect } from 'react';

const phrases = [
  "A Step Towards Transparency.",
  "Empowering Every Citizen.",
  "Innovation in Democracy.",
  "Your Voice, Secured.",
  "Secure Your Vote."
];

function AnimatedText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsFlipping(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-4 px-4 bg-gray-900/50 overflow-hidden border-b border-gray-800">
      <div style={{ perspective: '200px' }}>
        <h3 
          className={`text-animated text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-green-400 ${isFlipping ? 'text-flip-out' : ''}`}
        >
          {phrases[phraseIndex]}
        </h3>
      </div>
    </div>
  );
}

export default AnimatedText;