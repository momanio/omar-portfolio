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
      variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
      className="xs:w-[250px] w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black p-[1px] rounded-[20px] shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="bg-jetLight rounded-[20px] py-8 px-6 min-h-[280px] flex flex-col justify-center items-center">
        <Icon className="w-16 h-16 text-indigo-500 mb-4" />

        <h3 className="text-taupe text-[18px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
