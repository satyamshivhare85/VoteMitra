import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Logo from "../../assets/Logo.png"
export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-white flex items-center">
              <img
                src={Logo}
                className="h-20 w-35 mr-3"
                alt="VoteMitra Logo"
              />
              <span>Voting Mitra</span>
            </h3>

            <p className="mt-4 text-gray-400">
              A revolutionary project to make voting more secure, accessible,
              and transparent for a stronger democracy.
            </p>

            <p className="mt-4 text-orange-400 font-semibold">
              🏆 Hackathon Winner – TechVrisha
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="about.html" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="registration.html"
                  className="text-gray-400 hover:text-white"
                >
                  Register to Vote
                </a>
              </li>
              <li>
                <a href="news.html" className="text-gray-400 hover:text-white">
                  Election News
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold text-white">
              Contact & Connect
            </h4>

            <ul className="mt-4 space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <MdEmail /> satyamshivhare229@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <FaPhone /> 7054054037
              </li>
            </ul>

            <div className="mt-4 space-y-2 text-sm">
              <a
                href="https://instagram.com/satyamshivhare85"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-pink-400"
              >
                <FaInstagram /> @satyamshivhare85
              </a>

              <a
                href="https://github.com/satyamshivhare85"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <FaGithub /> GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/satyam-shivhare-5573852b4"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-blue-400"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-500">
          <p>
            &copy; 2024 Voting Mitra | Built by Satyam Shivhare | Hackathon Winner
          </p>
        </div>
      </div>
    </footer>
  );
}