import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import type { ContentImage, NavLink } from "@/types/content";

interface CtaBandProps {
  title: string;
  text: string;
  primaryAction: NavLink;
  secondaryAction: NavLink;
  /** A round portrait sitting half above the panel. */
  image?: ContentImage;
}

/** The closing call to action: a navy panel with a thin gold inner frame. */
export function CtaBand({ title, text, primaryAction, secondaryAction, image }: CtaBandProps) {
  return (
    <section className={`container-site pb-20 ${image ? "pt-20 sm:pt-24" : ""}`}>
      <div className={`relative rounded-xl bg-ink px-6 py-14 text-center sm:px-12 sm:py-16 ${image ? "pt-24 sm:pt-28" : ""}`}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-2.5 rounded-lg border border-gold/40 sm:inset-3" />
        {image && (
          <div className="absolute top-0 left-1/2 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-pop sm:size-44">
            <div className="relative size-full overflow-hidden rounded-full ring-2 ring-gold">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 11rem, 9rem" className="object-cover" />
            </div>
          </div>
        )}
        <span aria-hidden="true" className="mx-auto block h-0.5 w-12 bg-gold" />
        <h2 className="mt-6 text-2xl font-bold leading-snug text-white md:text-3xl md:leading-snug">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl leading-loose text-white/80">{text}</p>
        <div className="relative mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href={primaryAction.href} variant="gold">
            {primaryAction.label}
          </ButtonLink>
          <ButtonLink href={secondaryAction.href} variant="light">
            {secondaryAction.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
