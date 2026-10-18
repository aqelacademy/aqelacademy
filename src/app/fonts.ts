import { Cairo, Fraunces, Noto_Naskh_Arabic, Reem_Kufi } from "next/font/google";

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

/** The home page's display face in Arabic (`font-display`): a calm Fatimid-style Kufi. */
const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  subsets: ["arabic", "latin"],
});

/** The home page's display face in English (`font-display` under `lang="en"`); Arabic pages never load it. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  preload: false,
});

/** Classes for <html>: every font variable, shared by the site and dashboard root layouts. */
export const fontClassName = `${cairo.variable} ${naskh.variable} ${reemKufi.variable} ${fraunces.variable}`;
