import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png"

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
<header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={Logo} className="h-14" alt="logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-white font-medium">
          {[
            ["Home", "/"],
            ["About", "/about"],
            ["Registration", "/register"],
            ["Give Vote", "/vote"],
            ["Map", "/map"],
            ["News", "/news"],
            ["Complaint", "/complaint"],
            ["Chatbot", "/chat"],
          ].map(([name, path]) => (
            <Link
              key={name}
              to={path}
              className="hover:text-indigo-400 transition"
            >
              {name}
            </Link>
          ))}
        </div>

        {/* Login Button */}
        <Link
          to="/login"
          className="hidden md:block px-5 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition text-white font-semibold"
        >
          Login
        </Link>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mx-4 mt-2 bg-gray-800/90 rounded-lg p-4 space-y-2 text-white">
          {[
            ["Home", "/"],
            ["About", "/about"],
            ["Registration", "/register"],
            ["Give Vote", "/vote"],
            ["Map", "/map"],
            ["News", "/news"],
            ["Complaint", "/complaint"],
            ["Chatbot", "/chatbot"],
          ].map(([name, path]) => (
            <Link
              key={name}
              to={path}
              className="block text-center py-2 rounded hover:bg-gray-700"
            >
              {name}
            </Link>
          ))}

          <Link
            to="/login"
            className="block text-center py-2 bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}