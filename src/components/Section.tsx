import { motion } from "framer-motion";
import { staggerContainer } from "../utils/motion";

interface SectionProps {
  idName: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  idName,
  children,
  className,
}) => {
  const staggerVariants = staggerContainer();

  return (
    <motion.section
      id={idName}
      variants={staggerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0 ${className}`}
    >
      <span className="hash-span" id={idName}>
        &nbsp;
      </span>
      {children}
    </motion.section>
  );
};
