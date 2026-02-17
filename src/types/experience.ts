export interface Experience {
  _id: string;
  title: string;
  name: string;
  StartDate: string;
  EndDate: string;
  isCurrent: boolean;
  icon: string;
}

export interface ExperienceCardProps {
  experience: Experience;
}
