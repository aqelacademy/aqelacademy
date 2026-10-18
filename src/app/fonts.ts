import { Cairo } from "next/font/google";

/** Every text on the site and the dashboard: headings differ only by size and weight (user, 2026-10-18). */
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

/** Classes for <html>, shared by the site and dashboard root layouts. */
export const fontClassName = cairo.variable;
