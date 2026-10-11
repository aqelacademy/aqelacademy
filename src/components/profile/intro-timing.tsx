"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { afterSplash } from "@/lib/splash";

/** On a slow connection the entrance doesn't wait for the photo longer than this. */
const IMAGE_WAIT_MS = 2500;

interface IntroTimingProps {
  children: ReactNode;
  className?: string;
}

/**
 * Starts the cover's entrance (`data-intro="play"`) once the opening screen starts fading and the portrait has
 * loaded, so the reader sees the whole sequence and the photo never unveils an empty frame. CSS holds the items
 * hidden meanwhile, for a few seconds at most; if that hold has already run out (very slow script), the cover is
 * showing and is left alone rather than flashed.
 */
export function IntroTiming({ children, className }: IntroTimingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const holding = () => element.querySelector(".cv-intro")?.getAnimations()[0]?.playState === "running";
    const image = element.querySelector("img");
    const imageReady = new Promise<void>((resolve) => {
      if (!image || image.complete) return resolve();
      image.addEventListener("load", () => resolve(), { once: true });
      image.addEventListener("error", () => resolve(), { once: true });
      window.setTimeout(resolve, IMAGE_WAIT_MS);
    });

    let cancelled = false;
    const cancelSplash = afterSplash(() => {
      imageReady.then(() => {
        if (!cancelled && holding()) element.dataset.intro = "play";
      });
    });
    return () => {
      cancelled = true;
      cancelSplash();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
