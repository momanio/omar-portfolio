import { useState } from "react";
import { navLinks } from "../constants";
import logo from "../assets/logo/logo-black.webp";
import { motion } from "framer-motion";
import { IoIosClose, IoMdMenu } from "react-icons/io";

const NAV_LINK_STYLES =
  "hover:text-taupe text-[21px] font-medium font-mova uppercase tracking-[3px] cursor-pointer";
const MOBILE_MENU_STYLES =
  "text-[24px] font-bold font-arenq uppercase tracking-[1px] cursor-pointer";

export const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleNavLinkClick = (id: string) => {
    setActive(id);
    setToggle(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sm:px-16 px-6 w-full flex items-center py-2 fixed top-0 z-20 bg-flashWhite sm:opacity-[0.9] xxs:h-[12vh]">
      <div className="w-full flex justify-between items-center max-w-full mx-auto">
        <motion.a
          href="#"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
          whileHover={{ scale: 1.5 }}
        >
          <img
            src={logo}
            alt="logo"
            className="sm:w-[80px] sm:h-[80px]  object-contain"
          />
        </motion.a>

        <ul className="list-none hidden sm:flex flex-row gap-14 mt-2">
          {navLinks.map((nav) => (
            <motion.li
              key={nav.id}
              className={`${
                active === nav.id ? "text-french" : "text-eerieBlack"
              } ${NAV_LINK_STYLES}`}
              onClick={() => handleNavLinkClick(nav.id)}
              whileHover={{ scale: 1.1 }}
            >
              {nav.title}
            </motion.li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 w-screen justify-end items-center">
          <button onClick={() => setToggle(!toggle)}>
            {toggle ? <IoIosClose /> : <IoMdMenu />}
          </button>

          {toggle && (
            <div className="p-6 bg-flashWhite opacity-[0.98] absolute top-0 left-0 w-screen h-[100vh] z-10">
              <button
                className="absolute top-4 right-4"
                onClick={() => setToggle(false)}
              >
                <IoIosClose />
              </button>

              <ul className="list-none flex flex-col gap-[1rem] items-start justify-end mt-[10rem] ml-[35px]">
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`${
                      active === nav.id ? "text-french" : "text-eerieBlack"
                    } ${MOBILE_MENU_STYLES}`}
                    onClick={() => handleNavLinkClick(nav.id)}
                  >
                    {nav.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
