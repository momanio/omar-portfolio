import type { TimelineEntry } from "@/types/timeline";
import { timelineYear } from "@/utils/timeline";

export function TimelineProgress({ entries, activeIndex }: { entries: TimelineEntry[]; activeIndex: number }) {
  const active = entries[activeIndex];
  const year = timelineYear(active.startDate);
  return (
    <div className="timeline-progress sticky z-10 flex items-center justify-between gap-4 border-y border-slate-700 bg-gray-900 px-4 py-3 text-xs text-slate-300 sm:px-6">
      {(year || active.type) && <p className="flex items-center gap-3">
        <span className="hidden sm:inline">Following the path</span>
        {year && <span className="font-semibold tabular-nums text-slate-50" data-progress-year>{year}</span>}
        {year && active.type && <span className="text-slate-400" aria-hidden="true">/</span>}
        {active.type && <span>{active.type}</span>}
      </p>}
      <p className="ml-auto shrink-0 tabular-nums"><span className="sr-only">Milestone </span><span className="font-semibold text-slate-50">{String(activeIndex + 1).padStart(2, "0")}</span><span aria-hidden="true"> / </span><span className="sr-only"> of </span>{String(entries.length).padStart(2, "0")}</p>
      <span className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-indigo-400 origin-left" data-progress-line aria-hidden="true" />
    </div>
  );
}
