import { ProjectsList } from "@/components/ProjectsList";
import { Section } from "@/components/Section";
import { textVariant } from "@/utils/motion";
import { motion } from "framer-motion";

export const Projects = () => {
  return (
    <Section idName="projects" className="relative  text-white">
      <motion.div variants={textVariant()} className="text-center mb-10">
        <h2 className="text-[#F8FAFC] font-extrabold md:text-[60px] sm:text-[48px] text-[36px]">
          Projects
        </h2>
        <div className="w-24 h-1 bg-white mx-auto rounded-md mt-2" />
      </motion.div>
      <ProjectsList />
    </Section>
  );
};
