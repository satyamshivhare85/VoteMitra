import { Link } from "react-router-dom";
import mapImg from "../../assets/map.png"
import "./MapSection.css";

export default function MapSection() {
  return (
    <section id="map-section" className="py-20 bg-gray-900/70">

      {/* Heading */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-500">
          National Election Coverage
        </h2>

        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Explore real-time election data, party strongholds, and voting patterns across the country with our interactive map.
        </p>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 grid md:grid-cols-5 gap-8 items-center">

          {/* Left */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white">
              Live Data Monitoring
            </h3>

            <p className="mt-4 text-gray-400">
              Our system provides unprecedented coverage of the electoral process. The map visualizes the distribution of political parties and voter turnout across all major regions.
            </p>

            <ul className="mt-6 space-y-4">

              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-300">Precise measurements of voter turnout.</span>
              </li>

              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-300">Real-time tracking of party presence.</span>
              </li>

              <li className="flex items-start">
                <svg className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-300">Advanced analytics on demographic data.</span>
              </li>

            </ul>

            {/* BUTTON */}
            <Link
              to="/map"
              className="mt-8 inline-block px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-semibold"
            >
              View Live Map
            </Link>
          </div>

          {/* Right image */}
          <div className="md:col-span-3">
            <Link to="/map">
              <img
                src={mapImg}
                alt="Map of India"
                className="rounded-lg map-image w-full h-auto object-cover"
              />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}