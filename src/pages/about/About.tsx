import { useAbout } from "@/hooks/useAbout";
import { aboutFallback } from "@/data/profileFallback";
import { services } from "@/constants/services";
import { Section } from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";

export const About = () => {
  const { data, isError, refetch, isFetching } = useAbout();
  const about = data?.[0] ?? aboutFallback;
  return <Section idName="about" labelledBy="about-heading" className="text-white">
    <h2 id="about-heading" className="section-heading" dir="auto">{about.about || aboutFallback.about}</h2>
    <p className="about-copy" dir="auto">{about.body || aboutFallback.body}</p>
    {isError && <p className="content-notice" role="status">Showing saved background information. <button type="button" disabled={isFetching} onClick={() => void refetch()}>{isFetching ? "Retrying…" : "Retry live content"}</button></p>}
    <ul className="service-grid">{services.map((service) => <ServiceCard key={service.title} {...service} />)}</ul>
  </Section>;
};
