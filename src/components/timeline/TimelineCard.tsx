import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import type { TimelineEntry } from "@/types/timeline";
import { formatTimelineDate } from "@/utils/timeline";

export function TimelineCard({ entry }: { entry: TimelineEntry }) {
  const [failedLogo, setFailedLogo] = useState<string | null>(null);
  return (
    <article data-timeline-card className="timeline-card relative" aria-labelledby={`milestone-${entry.id}`}>
      <div className="flex items-center justify-between gap-4 border-t border-slate-600 pt-5">
        <span className="flex items-center gap-2.5 text-xs font-semibold tracking-widest uppercase text-slate-300">
          <span className={`timeline-kind-mark ${entry.type === "education" ? "is-education" : ""}`} aria-hidden="true" />
          {entry.type ?? "TODO: entry type"}
        </span>
        <p className="text-xs tabular-nums text-slate-300">
          {entry.startDate ? <time dateTime={entry.startDate}>{formatTimelineDate(entry.startDate)}</time> : "TODO: start date"}
          <span aria-hidden="true"> — </span><span className="sr-only"> to </span>
          {entry.isCurrent ? <span>Present</span> : entry.endDate ? <time dateTime={entry.endDate}>{formatTimelineDate(entry.endDate)}</time> : "TODO: end date"}
        </p>
      </div>
      <div className="mt-6 flex items-start gap-4">
        <div data-card-logo className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
          {entry.logo && failedLogo !== entry.logo.src ? (
            <img src={entry.logo.src} alt={entry.logo.alt} width="56" height="56" loading="lazy" decoding="async" className="size-14 object-contain p-1.5" onError={() => setFailedLogo(entry.logo?.src ?? null)} />
          ) : (
            <span className="px-1 text-center text-[10px] font-semibold text-slate-800">TODO: logo</span>
          )}
        </div>
        <div data-card-title className="min-w-0 flex-1">
          <h3 id={`milestone-${entry.id}`} className="text-xl leading-tight font-semibold tracking-tight text-balance text-slate-50 sm:text-2xl">{entry.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300" translate="no">{entry.organization}</p>
        </div>
      </div>
      <div data-card-detail className="mt-6">
        <p className={`max-w-prose text-sm leading-7 ${entry.description ? "text-slate-300" : "text-slate-400"}`}>
          {entry.description ?? "TODO: Add a description in Sanity."}
        </p>
        {entry.techTags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2" aria-label="Technologies">
            {entry.techTags.map((tag) => <li key={tag} className="min-w-0 text-xs font-semibold text-indigo-300" translate="no">{tag}</li>)}
          </ul>
        )}
        {entry.link && (
          <a href={entry.link} target="_blank" rel="noopener noreferrer" className="timeline-link mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-100 underline decoration-slate-500 underline-offset-4">
            Visit {entry.organization}<FiArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}
