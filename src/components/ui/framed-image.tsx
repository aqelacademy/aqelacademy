import Image from "next/image";
import type { ContentImage } from "@/types/content";

const shapeClasses = {
  landscape: "aspect-[3/2]",
  portrait: "aspect-[9/10]",
};

interface FramedImageProps {
  image: ContentImage;
  sizes: string;
  shape?: keyof typeof shapeClasses;
  /** For the page's main image. */
  preload?: boolean;
}

/** A photo with large rounded corners, the site's picture frame since the 2026-10-18 redesign. */
export function FramedImage({ image, sizes, shape = "landscape", preload = false }: FramedImageProps) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] bg-surface ${shapeClasses[shape]}`}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} preload={preload} className="object-cover" />
    </div>
  );
}
