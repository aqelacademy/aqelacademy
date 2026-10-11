import type { CSSProperties } from "react";
import { ScrollProgress } from "@/components/profile/scroll-progress";

interface ScrollWordsProps {
  text: string;
}

/** A large statement whose words darken one after another as it scrolls past the reading line. */
export function ScrollWords({ text }: ScrollWordsProps) {
  const words = text.split(" ");

  return (
    <ScrollProgress mode="track" className="py-6">
      <p className="max-w-5xl font-heading text-2xl font-bold leading-[1.85] text-ink sm:text-3xl sm:leading-[1.85] lg:text-[2.5rem] lg:leading-[1.8]">
        {words.map((word, index) => (
          // Words repeat, so the index is part of the key; the text never reorders.
          <span key={`${index}-${word}`}>
            <span className="cv-word" style={{ "--w": ((index / words.length) * 0.8).toFixed(3) } as CSSProperties}>
              {word}
            </span>{" "}
          </span>
        ))}
      </p>
    </ScrollProgress>
  );
}
