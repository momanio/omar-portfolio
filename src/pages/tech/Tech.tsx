import { motion } from "framer-motion";
import { textVariant, fadeIn } from "../../utils/motion";
import { technologies } from "@/constants";
import { IconType } from "react-icons";
import { Section } from "@/components/Section";

interface Technology {
  name: string;
  icon: IconType;
}

export const Tech: React.FC = () => {
  return (
    <Section idName="Tech" className="relative  text-white">
      <motion.div variants={textVariant()} className="text-center mb-10">
        <h2 className="text-[#F8FAFC] font-extrabold md:text-[60px] sm:text-[48px] text-[36px]">
          Technologies
        </h2>
        <div className="w-24 h-1 bg-white mx-auto rounded-md mt-2" />
      </motion.div>

      <div className="flex flex-wrap justify-center gap-10 mt-10">
        {technologies.map((technology: Technology, index: number) => (
          <motion.div
            key={technology.name}
            variants={fadeIn("up", "spring", 0.2 * index, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="w-24 h-24 flex items-center justify-center rounded-full bg-radial-[at_25%_25%] from-gray-500 to-zinc-950 to-75% shadow-lg hover:shadow-2xl transition-transform transform hover:scale-110"
          >
            {technology.icon && (
              <technology.icon size={60} className="text-white" />
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
