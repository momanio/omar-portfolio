import { useState } from "react";
import type { ProjectImage as ProjectImageType } from "@/types/project";
import { projectImageSrcSet, projectImageUrl } from "@/utils/projectImage";

export function ProjectImage({ image, className = "", sizes = "(min-width: 1024px) 60vw, 100vw" }: { image: ProjectImageType; className?: string; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div role="img" aria-label={`${image.alt}. Image unavailable.`} className={`project-image-unavailable ${className}`} style={{ aspectRatio: `${image.width} / ${image.height}`, minHeight: 0 }}>Screenshot unavailable</div>;
  return <img src={projectImageUrl(image, 1440)} srcSet={projectImageSrcSet(image)} sizes={sizes} width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={className} style={image.lqip ? { backgroundImage: `url("${image.lqip}")`, backgroundSize: "cover" } : undefined} />;
}
