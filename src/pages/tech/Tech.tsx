import { motion } from "framer-motion";
import { textVariant, fadeIn } from "../../utils/motion";
import { technologies } from "@/constants";
import { IconType } from "react-icons";

interface Technology {
  name: string;
  icon: IconType;
}

export const Tech: React.FC = () => {
  return (
    <section className="padding-top max-w-7xl mx-auto relative z-0">
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="text-center"
      >
        <h2 className="text-timberWolf font-black md:text-[60px] sm:text-[48px] xs:text-[40px] text-[30px] font-poppins mb-8">
          Technologies
        </h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-10 mt-10">
        {technologies.map((technology: Technology, index: number) => (
          <motion.div
            key={technology.name}
            variants={fadeIn("up", "spring", 0.2 * index, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="w-28 h-28 flex items-center justify-center rounded-full bg-radial-[at_25%_25%] from-gray-500 to-zinc-950 to-75% shadow-lg hover:shadow-2xl transition-transform transform hover:scale-110"
          >
            {technology.icon && (
              <technology.icon size={60} className="text-white" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
