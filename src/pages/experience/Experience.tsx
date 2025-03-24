import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { Section } from "../../components/Section";
import { textVariant } from "../../utils/motion";
import { FaRegFilePdf } from "react-icons/fa";
import { Spinner } from "@/components/Spinner";
import { useExperience } from "@/hooks/useExperience";
import { useExperienceStore } from "@/store/useExperienceStore";
import { ExperienceCard } from "@/components/ExperienceCard";

export const Experience: React.FC = () => {
  const { isLoading, error } = useExperience();
  const experience = useExperienceStore((state) => state.experince);

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

  console.log("Experience: ", experience);
  return (
    <Section idName="experience">
      <motion.div variants={textVariant()} className="text-center mb-10">
        <h2 className="text-[#F8FAFC] font-extrabold md:text-[60px] sm:text-[48px] text-[36px]">
          Education and Experience.
        </h2>
        <div className="w-24 h-1 bg-white mx-auto rounded-md mt-2" />
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline className="vertical-timeline-custom-line">
          {experience.map((itm) => (
            <ExperienceCard
              key={itm._id}
              title={itm.title}
              name={itm.name}
              startDate={itm.StartDate}
              endDate={itm.EndDate}
              icon={itm.icon}
            />
          ))}

          <VerticalTimelineElement
            contentStyle={{
              background:
                "linear-gradient(to right, #1f1f1f, #333333, #f4f4f6)",
              color: "#292929",
              borderRadius: "24px",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            contentArrowStyle={{ borderRight: "7px solid  #232631" }}
            iconStyle={{ background: "#333333" }}
            icon={
              <FaRegFilePdf className="justify-center items-center w-full h-full fill-white" />
            }
          >
            <a
              href="https://drive.google.com/file/d/1oILy3Sca5uSM02N9Yz-5CXPIVJLwsTnD/view"
              target="_blank"
              rel="noopener noreferrer"
              className="
            flex justify-between 
            text-white
            sm:text-[18px] text-[14px] 
            font-bold  items-center py-5 pl-3 pr-3 
            whitespace-nowrap gap-1 sm:w-[148px] sm:h-[58px] 
            w-[125px] h-[46px] rounded-[10px] 
            sm:mt-[22px] mt-[16px]  
            hover:text-eerieBlack transition duration-[0.2s] 
            ease-in-out
          "
            >
              MY RESUME
            </a>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </Section>
  );
};
