import { useHero } from "@/hooks/useHero";
import { heroFallback } from "@/data/profileFallback";
import { HeroContent } from "./HeroContent";

export const Hero = () => {
  const { data, isError } = useHero();
  const row = data?.[0];
  const hero = { ...heroFallback, ...row, FirstName: row?.FirstName || heroFallback.FirstName, LastName: row?.LastName || heroFallback.LastName, jobTitle: row?.jobTitle || heroFallback.jobTitle };
  return <HeroContent hero={hero} status={isError ? "Showing the saved profile while live content is unavailable." : ""} />;
};
