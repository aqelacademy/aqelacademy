import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import type { NavLink } from "@/types/content";

interface HomeClosingProps {
  title: string;
  text: string;
  /** Both already carry the locale prefix. */
  primaryAction: NavLink;
  secondaryAction: NavLink;
}

/** The home page's last word, full width on navy, under three nested gold arches that echo the hero photo's frame. */
export function HomeClosing({ title, text, primaryAction, secondaryAction }: HomeClosingProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="container-site h-full">
          <div className="cv-columns h-full border-x border-white/[0.04]" />
        </div>
        {["w-[34rem] h-[26rem] border-gold/25", "w-[50rem] h-[38rem] border-gold/15", "w-[66rem] h-[50rem] border-gold/[0.08]"].map((arch) => (
          <div key={arch} className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 rounded-t-full border border-b-0 ${arch}`} />
        ))}
      </div>
      <div className="container-site py-24 text-center sm:py-32">
        <span aria-hidden="true" className="mx-auto block h-0.5 w-12 bg-gold" />
        <h2 className="mx-auto mt-8 max-w-3xl font-display text-4xl leading-tight font-semibold text-balance sm:text-6xl sm:leading-tight">{title}</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-loose text-white/75">{text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={primaryAction.href} variant="gold">
            {primaryAction.label}
            <ArrowLeft aria-hidden="true" className="size-4 transition-transform ltr:rotate-180 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
          </ButtonLink>
          <ButtonLink href={secondaryAction.href} variant="light">
            {secondaryAction.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
