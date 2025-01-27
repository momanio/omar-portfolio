import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { fadeIn } from "../utils/motion";

interface ServiceCardProps {
  index: number;
  title: string;
  icon: IconType;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  index,
  title,
  icon: Icon,
}) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.3 * index, 0.75)}
      className="group relative w-full rounded-xl bg-gradient-to-br from-gray-900 to-black p-[2px] shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex flex-col items-center justify-center h-full w-full rounded-xl bg-gray-800 py-10 px-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-700 group-hover:bg-gray-600 transition duration-300">
          <Icon className="text-white text-3xl" />
        </div>
        <h3 className="text-center text-xl font-semibold text-white mt-4 group-hover:text-gray-300">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
