import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import type { TimelineEntry } from "@/types/timeline";
import { formatTimelineDate } from "@/utils/timeline";

export function TimelineCard({ entry }: { entry: TimelineEntry }) {
  const [failedLogo, setFailedLogo] = useState<string | null>(null);
  const description = entry.description?.trim();
  const highlight = entry.highlight?.trim();
  const logo = entry.logo && failedLogo !== entry.logo.src ? entry.logo : null;
  const hasDates = entry.startDate || entry.endDate || entry.isCurrent;
  const hasDetails = description || highlight || entry.techTags.length > 0 || entry.link;
  const headingId = `milestone-${entry.id}`;

  return (
    <article data-timeline-card className="timeline-card relative" aria-labelledby={entry.title || entry.organization ? headingId : undefined} aria-label={!entry.title && !entry.organization ? "Career milestone" : undefined}>
      {(entry.type || hasDates) && (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-slate-600 pt-5">
          {entry.type && (
            <span className="flex items-center gap-2.5 text-xs font-semibold tracking-widest uppercase text-slate-300">
              <span className={`timeline-kind-mark ${entry.type === "education" ? "is-education" : ""}`} aria-hidden="true" />
              {entry.type}
            </span>
          )}
          {hasDates && (
            <p className="ml-auto text-xs tabular-nums text-slate-300">
              {entry.startDate && <time dateTime={entry.startDate}>{formatTimelineDate(entry.startDate)}</time>}
              {entry.startDate && (entry.isCurrent || entry.endDate) && <><span aria-hidden="true"> — </span><span className="sr-only"> to </span></>}
              {entry.isCurrent ? <span>Present</span> : entry.endDate && <time dateTime={entry.endDate}>{formatTimelineDate(entry.endDate)}</time>}
            </p>
          )}
        </div>
      )}
      {(logo || entry.title || entry.organization) && (
        <div className="mt-6 flex items-start gap-4">
          {logo && (
            <div data-card-logo className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
              <img src={logo.src} alt={logo.alt} width="56" height="56" loading="lazy" decoding="async" className="size-14 object-contain p-1.5" onError={() => setFailedLogo(logo.src)} />
            </div>
          )}
          {(entry.title || entry.organization) && (
            <div data-card-title className="min-w-0 flex-1">
              {entry.title && <h3 id={headingId} className="text-xl leading-tight font-semibold tracking-tight text-balance text-slate-50 sm:text-2xl">{entry.title}</h3>}
              {entry.organization && <p id={!entry.title ? headingId : undefined} className={`${entry.title ? "mt-2 " : ""}text-sm leading-relaxed text-slate-300`} translate="no">{entry.organization}</p>}
            </div>
          )}
        </div>
      )}
      {hasDetails && (
        <div data-card-detail className="mt-4 flex min-w-0 flex-col gap-3">
          {highlight && <p className="truncate text-sm font-medium text-slate-100" title={highlight}>{highlight}</p>}
          {description && <p className="max-w-prose text-sm leading-7 text-slate-300">{description}</p>}
          {entry.techTags.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Technologies">
              {entry.techTags.map((tag) => <li key={tag} className="min-w-0 max-w-full rounded-full border border-slate-600 px-2.5 py-1 text-xs font-medium text-indigo-300" translate="no">{tag}</li>)}
            </ul>
          )}
          {entry.link && (
            <a href={entry.link} target="_blank" rel="noopener noreferrer" className="timeline-link inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-slate-100 underline decoration-slate-500 underline-offset-4">
              {entry.organization ? `Visit ${entry.organization}` : "Visit website"}<FiArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
}
