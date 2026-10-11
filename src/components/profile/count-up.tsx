"use client";

import { useEffect, useRef } from "react";
import { afterSplash } from "@/lib/splash";

interface CountUpProps {
  value: number;
  durationMs?: number;
}

/** Counts from 0 to `value` the first time it scrolls into view, never behind the opening screen. The server renders the final number, and screen readers only ever get that. */
export function CountUp({ value, durationMs = 1600 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        // Ease out, so the last numbers land slowly.
        element.textContent = String(Math.round(value * (1 - (1 - t) ** 4)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    element.textContent = "0";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.6 },
    );
    const cancelSplash = afterSplash(() => observer.observe(element));
    return () => {
      cancelSplash();
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
