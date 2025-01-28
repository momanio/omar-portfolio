import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-bold tracking-wide">Omar Momani</h2>
            <p className="text-gray-400 text-sm">Frontend Developer</p>
          </div>

          <nav className="mb-6 md:mb-0">
            <ul className="flex flex-col md:flex-row gap-4 text-gray-300 text-sm">
              <li>
                <Link
                  to="/projects"
                  className="hover:text-indigo-400 transition"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-indigo-400 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex gap-4">
            <a
              href="https://github.com/yourgithub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/yourlinkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="mailto:youremail@example.com"
              className="text-gray-400 hover:text-indigo-400 transition"
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 my-6"></div>

        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Omar Momani. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
