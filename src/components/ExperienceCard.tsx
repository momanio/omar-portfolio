import { VerticalTimelineElement } from "react-vertical-timeline-component";

interface Experience {
  date: string;
  iconBg: string;
  icon: string;
  company_name: string;
  title: string;
}

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "linear-gradient(to right, #1f1f1f, #333333, #f4f4f6)",
      color: "#292929",
      borderRadius: "24px",
      boxShadow:
        "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    }}
    contentArrowStyle={{ borderRight: "7px solid  #232631" }}
    date={experience.date}
    iconStyle={{ background: experience.iconBg }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="w-[100%] h-[100%] object-contain"
        />
      </div>
    }
  >
    <div>
      <h3 className="text-black text-[26px] font-bold  tracking-[2px]">
        {experience.title}
      </h3>
      <p
        className="text-black text-[20px] font-semibold tracking-[1px]"
        style={{ margin: 0 }}
      >
        {experience.company_name}
      </p>
    </div>
  </VerticalTimelineElement>
);

export default ExperienceCard;
