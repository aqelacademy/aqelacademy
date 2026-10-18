import { order } from "@/components/profile/order";

interface HomePillarsProps {
  points: string[];
}

/** What the academy offers, as four numbered panels in a hairline grid. On hover a panel lightens and a gold rule draws across its top. */
export function HomePillars({ points }: HomePillarsProps) {
  return (
    <ol className="cv-stagger grid gap-px border border-gold/30 bg-gold/30 sm:grid-cols-2">
      {points.map((point, index) => (
        <li
          key={point}
          style={order(index)}
          className="relative flex min-h-48 flex-col justify-between gap-10 bg-gold-soft p-7 transition-colors duration-500 before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:origin-right before:scale-x-0 before:bg-gold before:transition-transform before:duration-500 hover:bg-white hover:before:scale-x-100 sm:min-h-56 sm:p-9 ltr:before:origin-left"
        >
          <span aria-hidden="true" className="font-display text-5xl leading-none text-gold tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="font-display text-xl leading-snug font-semibold text-ink sm:text-2xl sm:leading-snug">{point}</p>
        </li>
      ))}
    </ol>
  );
}
