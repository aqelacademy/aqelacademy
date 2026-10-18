import { order } from "@/components/profile/order";
import { cardClassName } from "@/components/ui/card";
import type { Conference } from "@/content/doctor-profile";

interface PortfolioTalksProps {
  items: Conference[];
  /** "ورقة علمية" / "Paper". */
  paperLabel: string;
}

/** His conference papers as cards, newest first: the year large, the country, the event. */
export function PortfolioTalks({ items, paperLabel }: PortfolioTalksProps) {
  const talks = [...items].reverse();

  return (
    <ul className="cv-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {talks.map((talk, index) => (
        <li key={talk.title} style={order(index)} className={`${cardClassName} flex flex-col p-6 transition-colors duration-300 hover:border-gold/50`}>
          <div className="flex items-center justify-between gap-3">
            <span className="text-4xl leading-none font-bold text-ink tabular-nums">{talk.year}</span>
            <span className="rounded-full bg-canvas px-3 py-1 text-xs font-bold text-ink">{talk.country}</span>
          </div>
          <p className="mt-8 text-xs font-bold text-gold-dark">{paperLabel}</p>
          <p className="mt-1 leading-relaxed font-bold text-ink">{talk.title}</p>
        </li>
      ))}
    </ul>
  );
}
