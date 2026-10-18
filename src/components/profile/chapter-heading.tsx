interface ChapterHeadingProps {
  /** 1-based; shown as "01". */
  index: number;
  kicker: string;
  title: string;
  text?: string;
  /** `dark` on navy sections. */
  tone?: "light" | "dark";
}

/** A numbered chapter title: the number and a short label over a gold rule, then the title in Naskh. */
export function ChapterHeading({ index, kicker, title, text, tone = "light" }: ChapterHeadingProps) {
  const dark = tone === "dark";

  return (
    <header className="mb-10 sm:mb-12 lg:mb-16">
      <p className={`flex items-center gap-4 text-sm font-bold ltr:tracking-wide ${dark ? "text-gold" : "text-gold-dark"}`}>
        <span className="text-base tabular-nums">{String(index).padStart(2, "0")}</span>
        <span aria-hidden="true" className="h-px w-12 bg-gold" />
        {kicker}
      </p>
      <h2 className={`mt-4 max-w-3xl text-[1.75rem] sm:mt-5 sm:text-3xl font-bold leading-snug md:text-[2.6rem] md:leading-snug ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {text && <p className={`mt-4 max-w-2xl leading-loose sm:mt-5 sm:text-lg ${dark ? "text-white/75" : ""}`}>{text}</p>}
    </header>
  );
}
