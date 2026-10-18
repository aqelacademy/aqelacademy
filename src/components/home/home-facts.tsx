import Image from "next/image";
import { CountUp } from "@/components/profile/count-up";
import type { ContentImage } from "@/types/content";

interface HomeFact {
  value: number;
  /** Shown after the number, like the "+" of "25+". */
  suffix?: string;
  label: string;
}

interface HomeFactsProps {
  facts: HomeFact[];
  accreditationsTitle: string;
  accreditations: ContentImage[];
}

/** The strip along the bottom of the home hero: the numbers that count up once, then the accreditation logos on white tiles. */
export function HomeFacts({ facts, accreditationsTitle, accreditations }: HomeFactsProps) {
  return (
    <div className="border-t border-white/10 bg-ink-dark/60">
      <div className="container-site grid grid-cols-2 gap-x-8 gap-y-8 py-8 lg:grid-cols-[auto_auto_1fr] lg:items-center lg:gap-x-12">
        {facts.map((fact) => (
          <p key={fact.label} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <span className="font-display text-5xl leading-none font-semibold text-gold tabular-nums" dir="ltr">
              <CountUp value={fact.value} />
              {fact.suffix}
            </span>
            <span className="max-w-[10rem] text-sm leading-snug text-white/75">{fact.label}</span>
          </p>
        ))}
        <section aria-label={accreditationsTitle} className="col-span-2 flex flex-wrap items-center gap-4 lg:col-span-1 lg:justify-end">
          <p className="text-xs font-bold text-white/55">{accreditationsTitle}</p>
          <ul className="flex gap-3">
            {accreditations.map((badge) => (
              <li key={badge.alt} className="flex h-16 items-center rounded-lg bg-white px-3">
                <Image src={badge.src} alt={badge.alt} sizes="128px" className="h-11 w-auto" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
