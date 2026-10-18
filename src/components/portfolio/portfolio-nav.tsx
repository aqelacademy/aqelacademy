"use client";

import { useEffect, useRef, useState } from "react";

interface PortfolioNavProps {
  sections: { id: string; label: string }[];
  label: string;
}

interface Indicator {
  left: number;
  width: number;
}

/**
 * The portfolio's section bar, held under the site header: one pill per section, centred on large screens. A navy
 * pill glides under the section being read; on phones the row scrolls sideways (its edges fade) and glides the
 * current pill to the middle.
 */
export function PortfolioNav({ sections, label }: PortfolioNavProps) {
  const [active, setActive] = useState(-1);
  const [indicator, setIndicator] = useState<Indicator | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      // At the very end of the page the last section counts as read even if it is short.
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = -1;
      sections.forEach((section, index) => {
        const top = document.getElementById(section.id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) current = index;
      });
      setActive(atEnd && current >= 0 ? sections.length - 1 : current);
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

  // Moves the gliding pill under the current link, and brings that link to the middle of the row when it scrolls.
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>("[aria-current]");
    if (!list || !link) {
      setIndicator(null);
      return;
    }

    // The link's list item is positioned (so the link paints above the pill); its offsets are relative to the list.
    const item = link.parentElement ?? link;
    const place = () => setIndicator({ left: item.offsetLeft, width: item.offsetWidth });
    place();
    const listBox = list.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    const offset = linkBox.left + linkBox.width / 2 - (listBox.left + listBox.width / 2);
    if (list.scrollWidth > list.clientWidth) list.scrollBy({ left: offset, behavior: "smooth" });

    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  return (
    <nav aria-label={label} className="sticky top-[4.1875rem] z-30 border-y border-line bg-white/95 backdrop-blur-sm">
      <div className="container-site max-lg:px-0">
        <ol
          ref={listRef}
          className="relative flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] max-lg:px-4 max-lg:[mask-image:linear-gradient(to_right,transparent,black_1.25rem,black_calc(100%-1.25rem),transparent)] lg:justify-center"
        >
          <span
            aria-hidden="true"
            className={`absolute top-2.5 bottom-2.5 rounded-full bg-ink transition-[left,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${indicator ? "opacity-100" : "opacity-0"}`}
            style={indicator ? { left: indicator.left, width: indicator.width } : undefined}
          />
          {sections.map((section, index) => (
            <li key={section.id} className="relative shrink-0">
              <a
                href={`#${section.id}`}
                aria-current={index === active ? "true" : undefined}
                className="group flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-bold whitespace-nowrap text-body transition-colors duration-300 hover:text-ink focus-visible:outline-2 focus-visible:outline-brand aria-[current]:text-white sm:gap-2 sm:px-4"
              >
                <span aria-hidden="true" className="text-[0.7rem] text-gold-dark tabular-nums transition-colors duration-300 group-aria-[current]:text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
