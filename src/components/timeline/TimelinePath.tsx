export function TimelinePath() {
  return (
    <svg className="timeline-path pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden="true" focusable="false">
      <path data-route-track fill="none" stroke="currentColor" strokeWidth="1" />
      <path data-route-draw fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength="1" />
    </svg>
  );
}
