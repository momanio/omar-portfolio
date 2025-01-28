import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";
import { services } from "../../constants";
import { Section } from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";

export const About: React.FC = () => {
  return (
    <Section idName="about" className="relative  text-white">
      <motion.div variants={textVariant()} className="text-center mb-10">
        <h2 className="text-[#F8FAFC] font-extrabold md:text-[60px] sm:text-[48px] text-[36px]">
          About Me
        </h2>
        <div className="w-24 h-1 bg-white mx-auto rounded-md mt-2" />
      </motion.div>

      <motion.p
        variants={fadeIn("up", "tween", 0.1, 1)}
        className="text-center text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed px-6 sm:px-12"
      >
        Frontend Developer specializing in building responsive, modern web
        applications and Headless CMS using JavaScript frameworks React,
        Angular, With a focus on clean code and user-friendly design, I deliver
        efficient, scalable solutions tailored to client needs.
      </motion.p>

      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 sm:px-12"
      >
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </motion.div>
    </Section>
  );
};
