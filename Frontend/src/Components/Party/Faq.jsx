import { useEffect, useState } from "react";

export default function Faq() {
  const slides = [
    {
      year: "1951-52",
      text: "The first-ever general elections were held, a monumental exercise with over 173 million eligible voters, laying the foundation for India's democratic legacy.",
    },
    {
      year: "1962",
      text: "The iconic indelible ink, a mark of participation, was first used. It was developed by the Council of Scientific and Industrial Research (CSIR).",
    },
    {
      year: "1982",
      text: "Electronic Voting Machines (EVMs) were introduced for the first time in a by-election in Kerala, revolutionizing the speed and reliability of the voting process.",
    },
    {
      year: "1999",
      text: "The Election Commission of India launched its official website, embracing the digital age and increasing transparency.",
    },
    {
      year: "2019",
      text: "The general elections saw the highest-ever voter turnout at 67.11% and the highest participation of women voters in Indian history, marking a vibrant display of democracy.",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto slideshow effect (same behavior as typical JS slideshow)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); // change every 4 sec

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section
      id="historical-facts"
      className="py-20 bg-gray-900 border-y border-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-500">
            Glimpses of India's Electoral History
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            A journey through the milestones of the world's largest democracy.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg border border-gray-700 relative h-48 flex items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`fact-slide text-center absolute transition-opacity duration-700 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <h3 className="text-2xl font-bold text-indigo-400">
                {slide.year}
              </h3>
              <p className="mt-3 text-lg text-gray-300">{slide.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}