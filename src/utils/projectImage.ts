import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/sanity/client";
import type { ProjectImage } from "@/types/project";

const builder = createImageUrlBuilder(client);

export function projectImageUrl(image: ProjectImage, width: number): string {
  if (!image.assetId) return image.url;
  return builder.image(image.assetId).width(Math.min(width, image.width)).fit("max").auto("format").quality(82).url();
}

export function projectImageSrcSet(image: ProjectImage): string | undefined {
  if (!image.assetId) return undefined;
  return [...new Set([480, 768, 1024, 1440, 1920].map((width) => Math.min(width, image.width)))]
    .map((width) => `${projectImageUrl(image, width)} ${width}w`).join(", ");
}
