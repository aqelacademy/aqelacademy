"use client";

import { type ReactNode, useEffect, useRef } from "react";

/**
 * - `exit`: 0 while the box's top is at the viewport top, 1 once it has scrolled out (cover parallax).
 * - `track`: how far the box has passed a reading line at 60% of the viewport (timelines, word by word text).
 * - `pin`: a tall box with a sticky child: 0 when it reaches the top, 1 when its end does (horizontal tracks).
 */
type ProgressMode = "exit" | "track" | "pin";

function progressOf(mode: ProgressMode, top: number, height: number, viewport: number): number {
  if (mode === "exit") return -top / height;
  if (mode === "pin") return -top / Math.max(1, height - viewport);
  return (viewport * 0.6 - top) / height;
}

interface ScrollProgressProps {
  children: ReactNode;
  mode: ProgressMode;
  className?: string;
  id?: string;
}

/** Sets `--progress` (0–1) on its box while the page scrolls; CSS turns it into motion. Without script, styles fall back to the finished state. */
export function ScrollProgress({ children, mode, className, id }: ScrollProgressProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height } = element.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, progressOf(mode, top, height, window.innerHeight)));
      element.style.setProperty("--progress", progress.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [mode]);

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
}
