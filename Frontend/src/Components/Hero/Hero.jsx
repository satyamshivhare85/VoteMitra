import { useEffect } from "react";
import "./Hero.css";
import videoBg from "../../assets/background2.mp4"

export default function Hero() {

  useEffect(() => {
    const sloganElement = document.getElementById("flipping-slogan");

    const slogans = [
      "with a Face Scan!",
      "Secure Your Say.",
      "Democracy Delivered.",
      "One Scan, One Vote."
    ];

    let index = 0;

    const interval = setInterval(() => {
      if (!sloganElement) return;

      index = (index + 1) % slogans.length;

      sloganElement.classList.add("slogan-out");

      setTimeout(() => {
        sloganElement.innerText = slogans[index];
        sloganElement.classList.remove("slogan-out");
      }, 600);

    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="hero-bg relative overflow-hidden">

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      {/* Content */}
      <div className="container mx-auto flex flex-col items-start justify-center px-4 sm:px-6 lg:px-8 h-screen pt-16 relative z-20">

        <div className="text-left slogan-container">

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black !leading-tight tracking-tight h-48 sm:h-56 md:h-64">

            <span className="text-orange-500">
              Vote the Future -
            </span>

            <br />

            <span
              id="flipping-slogan"
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-green-500"
            >
              with a Face Scan!
            </span>

          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-xl">
            Be the Change, Vote Smartly. Log In. Look In. Lead On.
          </p>

          <a
            href="/register"
            className="mt-8 inline-block px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition font-semibold text-lg"
          >
            Get Started
          </a>

        </div>
      </div>
    </main>
  );
}