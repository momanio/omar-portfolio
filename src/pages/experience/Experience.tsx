import { Timeline } from "@/components/timeline/Timeline";
import { timelineFallback } from "@/data/timelineFallback";
import { useExperience } from "@/hooks/useExperience";

export const Experience = () => {
  const { data, isLoading, isError } = useExperience();
  return <Timeline entries={data ?? timelineFallback} usingFallback={isError || !data} isLoading={isLoading} />;
};
