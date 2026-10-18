"use client";

import { useEffect, useState } from "react";

interface ChapterRailProps {
  chapters: { id: string; label: string }[];
  label: string;
}

/**
 * A slim numbered index fixed at the page's end edge on wide screens (only there is room beside the content).
 * It appears once the reader is past the cover, marks the chapter being read, and names each one on hover or focus.
 */
export function ChapterRail({ chapters, label }: ChapterRailProps) {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current = -1;
      chapters.forEach((chapter, index) => {
        const top = document.getElementById(chapter.id)?.getBoundingClientRect().top;
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
  }, [chapters]);

  return (
    <nav
      aria-label={label}
      className={`fixed top-1/2 end-5 z-30 hidden -translate-y-1/2 transition-opacity duration-500 min-[1440px]:block ${active < 0 ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <ol className="flex flex-col gap-1 rounded-full border border-line bg-white/90 px-1.5 py-3 shadow-card backdrop-blur-sm">
        {chapters.map((chapter, index) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              aria-current={index === active ? "true" : undefined}
              className="group relative flex size-9 items-center justify-center rounded-full text-xs font-bold text-body/70 tabular-nums transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-brand aria-[current]:bg-ink aria-[current]:text-gold"
            >
              {String(index + 1).padStart(2, "0")}{" "}
              <span className="pointer-events-none absolute end-full me-3 rounded-md bg-ink px-2.5 py-1 font-sans text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {chapter.label}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
