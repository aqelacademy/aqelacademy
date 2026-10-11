"use client";

import { type ReactNode, useEffect, useRef } from "react";

interface IntroTimingProps {
  children: ReactNode;
  className?: string;
}

/**
 * The cover's entrance waits for the opening screen on a tab's first load (CSS, `html:not([data-splash=seen])`).
 * Arriving later through a link, the splash is long gone, so the entrance starts at once.
 */
export function IntroTiming({ children, className }: IntroTimingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element && Number(document.timeline.currentTime) > 1500) element.dataset.intro = "now";
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
