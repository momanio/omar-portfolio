import type { Project } from "@/types/project";

export function ProjectFacts({ project }: { project: Project }) {
  const facts = [
    ["Problem", project.problem],
    ["What I built", project.summary],
    ["My role", project.role],
    ["Result", project.result],
  ];
  return (
    <dl className="project-facts">
      {facts.map(([label, value]) => value && <div key={label}><dt>{label}</dt><dd dir="auto">{value}</dd></div>)}
    </dl>
  );
}
