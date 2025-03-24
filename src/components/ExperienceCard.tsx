import { VerticalTimelineElement } from "react-vertical-timeline-component";

interface ExperienceProps {
  title: string;
  name: string;
  startDate: string;
  endDate: string;
  icon: string;
}

export const ExperienceCard: React.FC<ExperienceProps> = ({
  title,
  name,
  startDate,
  endDate,
  icon,
}) => {
  return (
    <VerticalTimelineElement
      contentStyle={timelineStyles.content}
      contentArrowStyle={timelineStyles.arrow}
      date={`${startDate} - ${endDate}`}
      iconStyle={timelineStyles.icon}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img src={icon} alt={name} className="w-full h-full object-contain" />
        </div>
      }
    >
      <div>
        <h3 className="text-black text-[26px] font-bold tracking-[2px]">
          {title}
        </h3>
        <p
          className="text-black text-[20px] font-semibold tracking-[1px]"
          style={{ margin: 0 }}
        >
          {name}
        </p>
      </div>
    </VerticalTimelineElement>
  );
};

const timelineStyles = {
  content: {
    background: "linear-gradient(to bottom, #1f1f1f, #333333, #f4f4f6)",
    color: "white",
    borderRadius: "24px",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },
  arrow: { borderRight: "7px solid  #232631" },
  icon: { background: "#333333" },
};
