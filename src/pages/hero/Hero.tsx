import { useHeroStore } from "@/store/useHeroStore";
import { useHero } from "@/hooks/useHero";
import { motion } from "framer-motion";
import { RiScrollToBottomLine } from "react-icons/ri";
import { Spinner } from "@/components/Spinner";

export const Hero = () => {
  const { isLoading, error } = useHero();
  const hero = useHeroStore((state) => state.hero[0]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl text-red-500">
        Error loading projects
      </div>
    );
  }

  console.log("Hero: ", hero);

  const handleNavLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-blue-950 via-transparent to-black"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(7)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-4 h-4 bg-white rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["0%", "30%", "0%"],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="sm:px-16 px-6 relative max-w-7xl mx-auto flex flex-col items-center justify-center h-full text-center">
        <motion.h1
          className="text-5xl sm:text-7xl  font-extrabold leading-tight tracking-wide"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {hero.FirstName}{" "}
          <span className="text-gray-500">{hero.LastName}</span>
        </motion.h1>
        <motion.p
          className="mt-4 text-lg font-bold sm:text-xl max-w-3xl text-[#F8FAFC]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {hero.jobTitle}
        </motion.p>

        <motion.div
          className="mt-10 flex gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button
            onClick={() => handleNavLinkClick("projects")}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-lg transition transform hover:scale-105"
          >
            View Projects
          </button>
          <button
            onClick={() => handleNavLinkClick("about")}
            className="px-6 py-3 border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white font-bold rounded-full shadow-lg transition transform hover:scale-105"
          >
            About Me
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 w-full flex justify-center items-center">
        <motion.div
          className="absolute bottom-10 w-full flex justify-center items-center cursor-pointer"
          whileHover={{ y: 10 }}
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <RiScrollToBottomLine size={50} className="text-indigo-500" />
        </motion.div>
      </div>
    </section>
  );
};
