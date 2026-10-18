import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

interface PortfolioSectionProps {
  id: string;
  /** 1-based; shown as "01". */
  index: number;
  kicker: string;
  title: string;
  text?: string;
  /** The band's background: white, ivory or navy. */
  tone?: "white" | "ivory" | "navy";
  children: ReactNode;
}

const toneClasses = {
  white: "bg-white",
  ivory: "bg-gold-soft/60",
  navy: "bg-ink-dark text-white",
};

/** One portfolio section: an anchor for the section bar, the numbered heading, then its content, all sliding in once. */
export function PortfolioSection({ id, index, kicker, title, text, tone = "white", children }: PortfolioSectionProps) {
  const navy = tone === "navy";

  return (
    <section id={id} className={`scroll-mt-32 py-16 sm:py-28 ${toneClasses[tone]}`}>
      <Reveal className="container-site">
        <header className="mb-10 max-w-3xl sm:mb-16">
          <p className={`flex items-center gap-3 text-sm font-bold ${navy ? "text-white/70" : "text-body"}`}>
            <span className={`tabular-nums ${navy ? "text-gold" : "text-gold-dark"}`}>{String(index).padStart(2, "0")}</span>
            <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
            {kicker}
          </p>
          <h2 className={`mt-4 text-3xl leading-snug font-bold text-balance sm:text-5xl sm:leading-tight ${navy ? "text-white" : "text-ink"}`}>{title}</h2>
          {text && <p className={`mt-4 leading-loose sm:mt-5 sm:text-lg ${navy ? "text-white/75" : ""}`}>{text}</p>}
        </header>
        {children}
      </Reveal>
    </section>
  );
}
