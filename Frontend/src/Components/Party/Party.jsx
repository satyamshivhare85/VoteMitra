import { Link } from "react-router-dom";

export default function Party() {
  return (
    <section
      id="know-your-party"
      className="relative py-24 bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('party.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">

          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-500">
            Know Your Parties
          </h2>

          <p className="mt-4 text-gray-300 text-lg">
            Explore detailed profiles of each political party, their history,
            key leaders, and election manifestos to make an informed decision.
            An educated vote is a powerful vote.
          </p>

          {/* React Router Navigation */}
          <Link
            to="/party"
            className="mt-8 inline-block px-10 py-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-transform hover:scale-105 font-semibold text-lg shadow-lg"
          >
            Discover Parties →
          </Link>

        </div>
      </div>
    </section>
  );
}