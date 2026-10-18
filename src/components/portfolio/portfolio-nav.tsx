"use client";

import { useEffect, useRef, useState } from "react";

interface PortfolioNavProps {
  sections: { id: string; label: string }[];
  label: string;
}

/**
 * The portfolio's section bar, held under the site header: one pill per section, the one being read filled navy.
 * On phones it scrolls sideways and keeps the current pill in view.
 */
export function PortfolioNav({ sections, label }: PortfolioNavProps) {
  const [active, setActive] = useState(-1);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = -1;
      sections.forEach((section, index) => {
        const top = document.getElementById(section.id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) current = index;
      });
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);

  useEffect(() => {
    listRef.current?.querySelector("[aria-current]")?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [active]);

  return (
    <nav aria-label={label} className="sticky top-[4.1875rem] z-30 border-y border-line bg-white/95 backdrop-blur-sm">
      <ol ref={listRef} className="container-site flex gap-1.5 overflow-x-auto py-2.5 [scrollbar-width:none]">
        {sections.map((section, index) => (
          <li key={section.id} className="shrink-0">
            <a
              href={`#${section.id}`}
              aria-current={index === active ? "true" : undefined}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-body transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-brand aria-[current]:bg-ink aria-[current]:text-white"
            >
              <span className="text-xs text-gold-dark tabular-nums" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
