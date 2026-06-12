import { useEffect, useRef, useState } from "react";

export default function HomeSections() {
  const statsRef = useRef(null);

  // ---------------- STATS ----------------
  const statsData = [
    { label: "Registered Voters", target: 968000000, color: "text-cyan-400", bar: "bg-cyan-400" },
    { label: "Political Parties", target: 2600, color: "text-green-400", bar: "bg-green-400" },
    { label: "Polling Stations", target: 1050000, color: "text-purple-400", bar: "bg-purple-400" },
    { label: "Votes Cast (2024)", target: 642000000, color: "text-yellow-400", bar: "bg-yellow-400" },
  ];

  const [values, setValues] = useState(statsData.map(() => 0));

  const formatNumber = (num) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num;
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        statsData.forEach((item, index) => {
          let start = 0;
          const end = item.target;
          const duration = 2000;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = end / steps;

          const timer = setInterval(() => {
            start += increment;

            setValues((prev) => {
              const updated = [...prev];
              updated[index] = start >= end ? end : Math.floor(start);
              return updated;
            });

            if (start >= end) clearInterval(timer);
          }, stepTime);
        });

        observer.disconnect();
      }
    }, { threshold: 0.4 });

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ================= STATS ================= */}
      <section
        ref={statsRef}
        className="py-20 bg-gray-900/50 border-y border-gray-800"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">

            {statsData.map((item, index) => (
              <div key={index}>
                <h2 className={`text-5xl font-extrabold ${item.color}`}>
                  {formatNumber(values[index])}
                </h2>

                <p className="mt-2 text-lg text-gray-300">
                  {item.label}
                </p>

                <div className={`mt-3 h-1 w-20 mx-auto rounded ${item.bar}`} />
              </div>
            ))}

          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-500">
            Your Voice, Your Vote in 3 Easy Steps
          </h2>
          <p className="mt-4 text-gray-400">
            Engage with the democratic process seamlessly and securely.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-2 text-center">

            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600/20 mx-auto mb-6">
              <svg
                className="w-8 h-8 text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-6 9h6"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-white">
              1. Registration
            </h3>

            <p className="mt-4 text-gray-400">
              Quickly register as a voter using your Aadhar and a simple face scan to create your secure digital identity.
            </p>

            <a
              href="/registeration/index.html"
              className="mt-6 inline-block text-indigo-400 font-semibold hover:text-white"
            >
              Register Now →
            </a>

          </div>

          {/* Card 2 */}
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-2 text-center">

            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-600/20 mx-auto mb-6">
              <svg
                className="w-8 h-8 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-white">
              2. Cast Your Vote
            </h3>

            <p className="mt-4 text-gray-400">
              Log in on election day, verify your identity with a face scan, and cast your vote from anywhere securely.
            </p>

            <a
              href="/registeration/give-vote.html"
              className="mt-6 inline-block text-green-400 font-semibold hover:text-white"
            >
              Vote Now →
            </a>

          </div>

          {/* Card 3 */}
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all duration-300 transform hover:-translate-y-2 text-center">

            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-cyan-600/20 mx-auto mb-6">
              <svg
                className="w-8 h-8 text-cyan-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-white">
              3. See the Results
            </h3>

            <p className="mt-4 text-gray-400">
              Watch the results unfold in real-time with our transparent, live-updating dashboard as soon as they are announced.
            </p>

            <a
              href="#"
              className="mt-6 inline-block text-cyan-400 font-semibold hover:text-white"
            >
              View Results →
            </a>

          </div>

        </div>

      </div>
    </section>

      {/* ================= SERVICES ================= */}
      <section className="py-20 bg-gray-900/70 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-500">
              Our Services for a Smarter Democracy
            </h2>
            <p className="mt-4 text-gray-400">
              Secure, transparent, and accessible voting system.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-indigo-500">
              <h3 className="text-2xl font-bold text-white">Face Recognition</h3>
              <p className="mt-4 text-gray-400">
                Biometric verification ensures one person, one vote.
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-indigo-500">
              <h3 className="text-2xl font-bold text-white">Aadhar Verification</h3>
              <p className="mt-4 text-gray-400">
                Extra identity security using Aadhar linking.
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-indigo-500">
              <h3 className="text-2xl font-bold text-white">Secure Voting</h3>
              <p className="mt-4 text-gray-400">
                Immutable and tamper-proof voting system.
              </p>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}


