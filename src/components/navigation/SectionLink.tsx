import type { AnchorHTMLAttributes } from "react";
import { Link } from "react-router";

export function SectionLink({ id, children, ...props }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "id"> & { id: string }) {
  return <Link to={`/#${id}`} {...props}>{children}</Link>;
}
