import { order } from "@/components/profile/order";
import { cardClassName } from "@/components/ui/card";
import type { Degree, Licence } from "@/content/doctor-profile";

interface PortfolioCredentialsProps {
  education: { title: string; steps: Degree[] };
  licences: { title: string; numberLabel: string; items: Licence[] };
}

/** Degrees as a timeline, newest first, beside the licences as cards; each licence shows its number so it can be checked with the board. */
export function PortfolioCredentials({ education, licences }: PortfolioCredentialsProps) {
  const degrees = [...education.steps].reverse();

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <h3 className="text-xl font-bold text-ink">{education.title}</h3>
        <ol className="cv-stagger mt-8 space-y-10 border-s-2 border-gold/30 ps-8">
          {degrees.map((degree, index) => (
            <li key={degree.title} style={order(index)} className="relative">
              <span aria-hidden="true" className="absolute top-1.5 -start-[calc(2rem+7px)] size-3 rounded-full bg-gold ring-4 ring-gold-soft" />
              <p className="text-sm font-bold text-gold-dark tabular-nums">{degree.year}</p>
              <p className="mt-1 text-xl leading-snug font-bold text-ink">{degree.title}</p>
              <p className="mt-1">{degree.place}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="lg:col-span-7">
        <h3 className="text-xl font-bold text-ink">{licences.title}</h3>
        <ul className="cv-stagger mt-8 grid gap-4 sm:grid-cols-2">
          {licences.items.map((licence, index) => (
            <li key={licence.title} style={order(index)} className={`${cardClassName} flex flex-col p-6 transition-colors duration-300 hover:border-gold/50`}>
              <span className="self-start rounded-full bg-canvas px-3 py-1 text-xs font-bold text-gold-dark tabular-nums">{licence.year}</span>
              <p className="mt-4 text-lg leading-snug font-bold text-ink">{licence.title}</p>
              {licence.issuer && <p className="mt-2 text-sm leading-relaxed">{licence.issuer}</p>}
              {licence.number && (
                <p className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
                  <span>{licences.numberLabel}</span>
                  <span dir="ltr" className="font-bold text-ink tabular-nums">
                    {licence.number}
                  </span>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
