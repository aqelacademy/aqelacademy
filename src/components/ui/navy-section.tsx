import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

interface NavySectionProps {
  children: ReactNode;
}

/** A navy band with the faint editorial columns behind it (home courses, courses, course fees); its content slides in once with Reveal. */
export function NavySection({ children }: NavySectionProps) {
  return (
    <section className="relative isolate bg-ink-dark py-20 text-white sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="container-site h-full">
          <div className="cv-columns h-full border-x border-white/[0.04]" />
        </div>
      </div>
      <Reveal className="container-site">{children}</Reveal>
    </section>
  );
}
