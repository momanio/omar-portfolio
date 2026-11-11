import type { TimelineEntry } from "@/types/timeline";

export function TimelineNode({ type }: { type: TimelineEntry["type"] }) {
  return (
    <span data-timeline-anchor className="timeline-node absolute" aria-hidden="true">
      <svg className="absolute -top-4 -left-4 size-8 overflow-visible" viewBox="-16 -16 32 32" focusable="false">
        <circle data-node-ring r="14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0" />
        <g data-node-shape>
          {type === "education" ? (
            <path className="timeline-node-shell" d="M 0 -8 L 8 0 L 0 8 L -8 0 Z" stroke="currentColor" strokeWidth="1.5" />
          ) : (
            <circle className="timeline-node-shell" r="7" stroke="currentColor" strokeWidth="1.5" />
          )}
          <circle data-node-fill r="3" fill="currentColor" opacity="0" />
        </g>
      </svg>
    </span>
  );
}
