import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";
import { services } from "../../constants";
import { Section } from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";

export const About: React.FC = () => {
  return (
    <Section
      idName="about"
      className="flex flex-col  w-full h-screen items-center px-10 py-10"
    >
      <motion.div variants={textVariant()}>
        <h2 className="text-eerieBlack font-black md:text-[60px] sm:text-[48px] xs:text-[40px] text-[30px] font-poppins">
          About Me
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("up", "tween", 0.1, 1)}
        className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px]"
      >
        As a Freelance Frontend Developer with expertise in JavaScript,
        TypeScript, HTML5, CSS3, and frameworks like Angular and React, I am
        dedicated to crafting high-quality, responsive designs within tight
        deadlines. My collaborative nature and passion for staying updated with
        the latest web development trends ensure that I provide innovative and
        efficient solutions for each project I undertake.
      </motion.p>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </Section>
  );
};
