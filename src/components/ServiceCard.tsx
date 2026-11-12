import type { IconType } from "react-icons";

interface ServiceCardProps { title: string; icon: IconType }
const ServiceCard = ({ title, icon: Icon }: ServiceCardProps) => <li className="service-card"><Icon aria-hidden="true" /><h3>{title}</h3></li>;
export default ServiceCard;
