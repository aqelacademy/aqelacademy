import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ContentImage } from "@/types/content";

interface DoctorProfileLinkProps {
  /** Already carries the locale prefix. */
  href: string;
  label: string;
  caption: string;
  image: ContentImage;
}

/** The way into the doctor's CV: his photo, a name line and a short caption, with a navy arrow that nudges forward on hover. */
export function DoctorProfileLink({ href, label, caption, image }: DoctorProfileLinkProps) {
  return (
    <Link
      href={href}
      className="group flex max-w-md items-center gap-4 rounded-xl border border-line bg-white p-3 pe-4 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-gold/60 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:gap-5 sm:pe-5"
    >
      <span className="relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/60 ring-offset-2 sm:size-16">
        <Image src={image.src} alt="" fill sizes="64px" className="object-cover object-[50%_20%]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-heading text-lg font-bold leading-snug text-ink">{label}</span>
        <span className="mt-0.5 block text-sm leading-relaxed">{caption}</span>
      </span>
      <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-gold transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
        <ArrowLeft className="size-5 ltr:rotate-180" />
      </span>
    </Link>
  );
}
