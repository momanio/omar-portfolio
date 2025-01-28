import { useState, useEffect } from "react";
import { navLinks } from "../constants";
import logo from "../assets/logo/logo-black.webp";
import { motion } from "framer-motion";
import { IoIosClose, IoMdMenu } from "react-icons/io";

export const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavLinkClick = (id: string) => {
    setActive(id);
    setToggle(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 z-30 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-zinc-300 opacity-75 shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="flex justify-between items-center px-6 sm:px-16 max-w-7xl mx-auto">
        <motion.a
          href="#"
          className="flex items-center"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
          whileHover={{ scale: 1.1 }}
          aria-label="Home"
        >
          <img
            src={logo}
            alt="Logo"
            className={`transition-all duration-300 ${
              isScrolled ? "w-[4rem] h-[4rem]" : "w-[7rem] h-[7rem]"
            } object-contain`}
          />
        </motion.a>

        <ul className="hidden sm:flex items-center gap-8">
          {navLinks.map((nav) => (
            <motion.li
              key={nav.id}
              className={`text-sm sm:text-base font-medium uppercase tracking-wide ${
                active === nav.id
                  ? "text-gray-950 border-b-2 border-gray-text-gray-300"
                  : "text-zinc-400 hover:text-gray-950"
              } cursor-pointer transition duration-300`}
              onClick={() => handleNavLinkClick(nav.id)}
              whileHover={{ scale: 1.5 }}
            >
              {nav.title}
            </motion.li>
          ))}
        </ul>

        <div className="sm:hidden">
          <button
            onClick={() => setToggle(!toggle)}
            className="text-gray-800 text-2xl"
            aria-label="Toggle Menu"
          >
            {toggle ? <IoIosClose /> : <IoMdMenu />}
          </button>
        </div>
      </div>

      {toggle && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-zinc-400 z-20 flex flex-col items-center justify-center"
        >
          <button
            onClick={() => setToggle(false)}
            className="absolute top-4 right-4 text-gray-800 text-2xl"
            aria-label="Close Menu"
          >
            <IoIosClose />
          </button>

          <ul className="flex flex-col gap-6 items-center">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`text-lg font-semibold uppercase ${
                  active === nav.id
                    ? "text-gray-600 border-b-2 border-gray-600"
                    : "text-gray-900 hover:text-gray-600"
                } cursor-pointer transition duration-300`}
                onClick={() => handleNavLinkClick(nav.id)}
              >
                {nav.title}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </nav>
  );
};
