import { useMemo, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import type { TimelineEntry } from "@/types/timeline";
import { sortTimelineEntries, timelineYear } from "@/utils/timeline";
import { useTimelineAnimation } from "@/hooks/useTimelineAnimation";
import { TimelineCard } from "./TimelineCard";
import { TimelineNode } from "./TimelineNode";
import { TimelinePath } from "./TimelinePath";
import { TimelineProgress } from "./TimelineProgress";
import "./timeline.css";

const resumeUrl = "https://drive.google.com/file/d/15ng6CdAV2jQ32LIXfnUjJW_l1n-NYPyA/view?usp=drive_link";

export function Timeline({ entries, usingFallback, isLoading }: { entries: TimelineEntry[]; usingFallback: boolean; isLoading: boolean }) {
  const container = useRef<HTMLElement>(null);
  const sorted = useMemo(() => sortTimelineEntries(entries), [entries]);
  const [activeIndex, setActiveIndex] = useState(0);
  useTimelineAnimation(container, sorted, setActiveIndex);
  const currentIndex = Math.min(activeIndex, Math.max(0, sorted.length - 1));

  return (
    <section ref={container} id="experience" aria-labelledby="experience-heading" className="career-timeline relative isolate mx-auto max-w-7xl scroll-mt-24 px-6 py-16 text-slate-50 sm:px-16 sm:py-24">
      <div className="timeline-grid-clip pointer-events-none absolute inset-0 -z-10 overflow-clip" aria-hidden="true"><div data-timeline-grid className="timeline-grid absolute" /></div>
      <header className="relative mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <h2 id="experience-heading" className="max-w-2xl text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">A path in<br /><span className="text-slate-400">the making.</span></h2>
          <p className="mt-6 max-w-md text-base leading-7 text-slate-300">Education & experience. The places, people, and work along the way.</p>
        </div>
        <div className="flex items-center gap-6 text-xs text-slate-300 lg:pb-1">
          <span className="flex items-center gap-2"><span className="timeline-kind-mark" aria-hidden="true" />Work</span>
          <span className="flex items-center gap-2"><span className="timeline-kind-mark is-education" aria-hidden="true" />Education</span>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="timeline-link ml-auto inline-flex min-h-11 items-center gap-2 font-semibold text-slate-100 underline decoration-slate-500 underline-offset-4 lg:ml-2">
            Résumé<FiArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </header>
      <p className="sr-only" role="status">{isLoading ? "Loading career entries. Showing the saved timeline." : usingFallback ? "Showing the saved career timeline. Live entries are unavailable." : "Career timeline loaded."}</p>
      {usingFallback && !isLoading && <p className="mb-5 text-xs leading-6 text-slate-400">Showing the saved timeline while live entries are unavailable.</p>}
      {sorted.length > 0 ? (
        <>
          <TimelineProgress entries={sorted} activeIndex={currentIndex} />
          <div data-timeline-route className="timeline-route relative">
            <TimelinePath />
            <ol className="relative m-0 list-none p-0" aria-label="Career milestones, earliest first">
              {sorted.map((entry, index) => (
                <li key={entry.id} data-timeline-stop data-kind={entry.type ?? "unknown"} data-active={index === currentIndex} className="timeline-stop relative" aria-current={index === currentIndex ? "step" : undefined}>
                  <span data-timeline-year className="timeline-year pointer-events-none absolute select-none font-semibold leading-none tabular-nums" aria-hidden="true">{timelineYear(entry.startDate)}</span>
                  <TimelineNode type={entry.type} />
                  <TimelineCard entry={entry} />
                </li>
              ))}
            </ol>
          </div>
        </>
      ) : <p className="border-y border-slate-700 py-10 text-slate-300">TODO: Add your first career milestone in Sanity.</p>}
      <footer className="relative mt-4 flex flex-col justify-between gap-6 border-t border-slate-700 pt-7 sm:flex-row sm:items-center">
        <p className="text-sm text-slate-400">{sorted.some((entry) => entry.isCurrent) ? "The path continues." : "Every step, part of the story."}</p>
        <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="timeline-link inline-flex min-h-11 items-center gap-3 self-start text-sm font-semibold text-slate-50 underline decoration-slate-500 underline-offset-8">
          View my résumé<FiArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
        </a>
      </footer>
    </section>
  );
}
