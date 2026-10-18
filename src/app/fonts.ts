import { Cairo, IBM_Plex_Sans_Arabic, Noto_Naskh_Arabic } from "next/font/google";

/** UI text. */
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

/** Display headings on public pages (`font-heading`). */
const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic", "latin"],
});

/** The home page's display face (`font-display`) in both languages: calm and familiar, set light at large sizes. */
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600"],
});

/** Classes for <html>: every font variable, shared by the site and dashboard root layouts. */
export const fontClassName = `${cairo.variable} ${naskh.variable} ${plexArabic.variable}`;
