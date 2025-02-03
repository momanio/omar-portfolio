import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { experiences } from "../../constants";
import { Section } from "../../components/Section";
import { textVariant } from "../../utils/motion";
import ExperienceCard from "../../components/ExperienceCard";
import { IoMdCodeDownload } from "react-icons/io";

export const Experience: React.FC = () => (
  <Section idName="experience">
    <motion.div variants={textVariant()} className="text-center mb-10">
      <h2 className="text-[#F8FAFC] font-extrabold md:text-[60px] sm:text-[48px] text-[36px]">
        Education and Experience.
      </h2>
      <div className="w-24 h-1 bg-white mx-auto rounded-md mt-2" />
    </motion.div>

    <div className="mt-20 flex flex-col">
      <VerticalTimeline className="vertical-timeline-custom-line">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} />
        ))}

        <VerticalTimelineElement
          contentStyle={{
            background: "rgba(51, 51, 51, 0.8)",
            opacity: 0.9,
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
            <IoMdCodeDownload className="justify-center items-center w-full h-full" />
          }
        >
          <a
            href="https://drive.google.com/file/d/1oILy3Sca5uSM02N9Yz-5CXPIVJLwsTnD/view"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex justify-between 
              sm:text-[18px] text-[14px] text-timberWolf 
              font-bold  items-center py-5 pl-3 pr-3 
              whitespace-nowrap gap-1 sm:w-[148px] sm:h-[58px] 
              w-[125px] h-[46px] rounded-[10px] bg-jetLight 
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
