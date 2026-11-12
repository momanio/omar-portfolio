import type { AnchorHTMLAttributes } from "react";
import { Link } from "react-router";

export function SectionLink({ id, children, onMouseEnter, onFocus, ...props }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "id"> & { id: string }) {
  const prepare = () => { if (["about", "experience", "projects"].includes(id)) void import("@/utils/prefetchSection").then((module) => module.prefetchSection(id)).catch(() => undefined); };
  return <Link to={`/#${id}`} onMouseEnter={(event) => { prepare(); onMouseEnter?.(event); }} onFocus={(event) => { prepare(); onFocus?.(event); }} {...props}>{children}</Link>;
}
