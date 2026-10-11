import manifest from "./image-manifest.json";

interface ImageEntry {
  hash: string;
  widths: number[];
}

const images: Record<string, ImageEntry> = manifest;

interface LoaderProps {
  src: string;
  width: number;
}

/**
 * next/image loader (next.config `loaderFile`): points every image at the WebP files built by
 * scripts/optimize-images.mjs in public/img, the smallest one at least as wide as asked (or the original size).
 * They are static and edge-cached, unlike the Worker's /_next/image, which resized on every request.
 * `src` is a static import's URL, `/_next/static/media/<name>.<hash>.<ext>`; an image the script hasn't seen yet
 * falls back to its original file.
 */
export default function imageLoader({ src, width }: LoaderProps): string {
  const name = src.split("/").pop()?.split(".")[0] ?? "";
  const entry = images[name];
  if (!entry) return src;

  const size = entry.widths.find((candidate) => candidate >= width) ?? entry.widths[entry.widths.length - 1];
  return `/img/${name}.${entry.hash}-${size}.webp`;
}
