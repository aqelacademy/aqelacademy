import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/content/site";
import imageLoader from "@/lib/image-loader";

/** Runs before the first paint: a tab that already saw the opening screen skips it, however it navigates (full page loads, language switch, the dashboard). */
const skipIfSeen = `try{if(sessionStorage.getItem("splash")){document.documentElement.dataset.splash="seen"}else{sessionStorage.setItem("splash","1")}}catch(e){}`;

/** The emblem's own WebP (the one the <img> below loads at 2x), as the mask that keeps the light sweep on the gold and navy strokes. */
const sheenMask: CSSProperties = { maskImage: `url(${imageLoader({ src: site.brand.mark.src, width: 384 })})` };

/**
 * The opening screen, a short piece of logo motion on the logo's own ivory: the emblem opens out of a circle, the
 * name rises into place, the tagline's rule draws out from its star, a light sweeps across the gold, then the whole
 * screen lifts away like a curtain. Shown once per browser tab session; the timing lives in globals.css (`.splash`).
 */
export function Splash() {
  return (
    <>
      <div aria-hidden="true" className="splash pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-gold-soft">
        <div className="splash-stage flex flex-col items-center px-6">
          <div className="splash-mark relative">
            <Image src={site.brand.mark} alt="" preload sizes="192px" className="h-36 w-auto sm:h-48" />
            <span style={sheenMask} className="splash-sheen absolute inset-0 mask-contain mask-center mask-no-repeat" />
          </div>
          <span className="mt-8 block overflow-hidden pb-1">
            <Image src={site.brand.name} alt="" loading="eager" sizes="(min-width: 640px) 352px, 256px" className="splash-name h-auto w-64 sm:w-88" />
          </span>
          <Image src={site.brand.tagline} alt="" loading="eager" sizes="(min-width: 640px) 240px, 176px" className="splash-tagline mt-2 h-auto w-44 sm:w-60" />
        </div>
        <span className="absolute inset-x-0 bottom-0 h-px bg-gold" />
      </div>
      <script dangerouslySetInnerHTML={{ __html: skipIfSeen }} />
    </>
  );
}
