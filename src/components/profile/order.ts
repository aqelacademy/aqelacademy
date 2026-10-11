import type { CSSProperties } from "react";

/** An item's place in a staggered entrance (`--i`); the CSS turns it into a delay. */
export function order(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
}
