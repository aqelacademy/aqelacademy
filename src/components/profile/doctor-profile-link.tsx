import Image from "next/image";
import Link from "next/link";
import { PillArrow } from "@/components/ui/pill-arrow";
import type { ContentImage } from "@/types/content";

interface DoctorProfileLinkProps {
  /** Already carries the locale prefix. */
  href: string;
  label: string;
  caption: string;
  image: ContentImage;
}

/** The way into the doctor's CV, as a pill: his photo, a name line and a short caption, and the round arrow that turns on hover. */
export function DoctorProfileLink({ href, label, caption, image }: DoctorProfileLinkProps) {
  return (
    <Link
      href={href}
      className="group flex max-w-md items-center gap-4 rounded-full border border-line bg-white p-2 pe-2 shadow-card transition-colors duration-300 hover:border-gold/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:gap-5"
    >
      <span className="relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/60 ring-offset-2 sm:size-16">
        <Image src={image.src} alt="" fill sizes="64px" className="object-cover object-[50%_20%]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-bold leading-snug text-ink">{label}</span>
        <span className="mt-0.5 block text-sm leading-relaxed">{caption}</span>
      </span>
      <span aria-hidden="true">
        <PillArrow className="size-11 bg-ink text-white group-hover:bg-gold group-hover:text-ink" />
      </span>
    </Link>
  );
}
