interface PortfolioExpertiseProps {
  /** The courses and diplomas he has taught. */
  taught: string[];
  /** The assessments and programmes he is trained in. */
  tools: { title: string; text: string; items: string[] };
}

/** On navy: what he teaches as outlined tags, then what he is trained in as filled ones. Tags light up gold on hover. */
export function PortfolioExpertise({ taught, tools }: PortfolioExpertiseProps) {
  return (
    <>
      <ul className="flex flex-wrap gap-2 sm:gap-2.5">
        {taught.map((item) => (
          <li key={item} className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-white/90 transition-colors duration-300 hover:border-gold hover:text-white sm:px-4 sm:py-2 sm:text-base">
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-12 border-t border-white/10 pt-10 sm:mt-16 sm:pt-12">
        <h3 className="text-xl font-bold text-white sm:text-2xl">{tools.title}</h3>
        <p className="mt-3 text-white/70">{tools.text}</p>
        <ul className="mt-8 flex flex-wrap gap-2 sm:gap-2.5">
          {tools.items.map((item) => (
            <li key={item} className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-white/85 transition-colors duration-300 hover:bg-gold hover:text-ink sm:px-4 sm:py-2 sm:text-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
