import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/profile/count-up";
import { IntroTiming } from "@/components/profile/intro-timing";
import { order } from "@/components/profile/order";
import { ScrollProgress } from "@/components/profile/scroll-progress";
import { ArrowLink } from "@/components/home/arrow-link";
import { SocialLinks } from "@/components/ui/social-links";
import type { HomeHeroContent } from "@/content/home";
import { siteText } from "@/content/site";
import { localeLink, type Locale } from "@/lib/i18n";
import type { ContentImage } from "@/types/content";

interface HomeFact {
  value: number;
  /** Shown after the number, like the "+" of "25+". */
  suffix?: string;
  label: string;
}

interface HomeHeroProps {
  locale: Locale;
  hero: HomeHeroContent;
  facts: HomeFact[];
  accreditations: { title: string; badges: ContentImage[] };
}

/**
 * The home page's opening, full bleed. On arrival the photo opens out of a small window on navy until it fills the
 * hero, settling from a slow zoom, while the academy's name rises line by line (IntroTiming waits for the opening
 * screen and the photo). Scrolling away closes the photo back into a rounded card and lets the words drift up
 * (`--progress` from ScrollProgress). In Arabic the photo is mirrored so the children sit opposite the text.
 * Everything falls back to the finished hero without script or with reduced motion.
 */
export function HomeHero({ locale, hero, facts, accreditations }: HomeHeroProps) {
  const { name, tagline, chrome } = siteText[locale];
  const primary = localeLink(locale, hero.primaryAction);

  return (
    <IntroTiming className="home-hero">
      <noscript>
        <style>{".home-hero .cv-intro { animation: none !important; }"}</style>
      </noscript>
      <ScrollProgress mode="exit" className="relative isolate overflow-hidden bg-ink-dark text-white">
        <div className="home-hero-frame absolute inset-0 -z-10">
          <div className="cv-intro home-hero-window absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 rtl:-scale-x-100">
              <Image src={hero.image.src} alt={hero.image.alt} fill preload sizes="100vw" className="home-hero-photo object-cover object-[58%_center]" />
            </div>
            <div aria-hidden="true" className="home-hero-shade absolute inset-0">
              <div className="absolute inset-0 from-ink-dark/90 via-ink-dark/40 to-transparent ltr:bg-gradient-to-r rtl:bg-gradient-to-l" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-dark/90 via-ink-dark/10 via-40% to-transparent" />
            </div>
          </div>
        </div>

        <div className="home-hero-text container-site flex min-h-[calc(100svh-4.1875rem)] flex-col justify-end pt-32 pb-8 lg:min-h-[46rem]">
          <div className="max-w-3xl">
            <p className="cv-intro home-rise flex items-center gap-3 text-sm font-medium text-white/80 ltr:tracking-wide" style={order(0)}>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
              {hero.eyebrow}
            </p>
            <h1 className="mt-6 font-display font-light">
              <span className="block overflow-hidden pb-2">
                <span className="cv-intro home-line block text-[2.75rem] leading-[1.2] text-balance sm:text-7xl sm:leading-[1.15] xl:text-[5.25rem]" style={order(1)}>
                  {name}
                </span>
              </span>{" "}
              <span className="block overflow-hidden pb-1">
                <span className="cv-intro home-line block text-xl leading-snug text-white/75 sm:text-3xl" style={order(2)}>
                  {tagline}
                </span>
              </span>
            </h1>
            <p className="cv-intro home-rise mt-7 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl sm:leading-relaxed" style={order(3)}>
              {hero.lead}
            </p>
            <div className="cv-intro home-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-5" style={order(4)}>
              <Link
                href={primary.href}
                className="group inline-flex items-center gap-4 rounded-full bg-white py-2 ps-7 pe-2 font-bold text-ink transition-colors duration-300 hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {primary.label}
                <span className="flex size-10 items-center justify-center rounded-full bg-ink text-white transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                  <ArrowLeft aria-hidden="true" className="size-4 transition-transform duration-500 ltr:rotate-180 rtl:group-hover:-rotate-45 ltr:group-hover:rotate-[225deg]" />
                </span>
              </Link>
              <ArrowLink link={localeLink(locale, hero.secondaryAction)} className="text-white" />
            </div>
          </div>

          <div className="cv-intro home-rise mt-16 grid gap-6 border-t border-white/20 pt-6 sm:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:items-center" style={order(5)}>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {facts.map((fact) => (
                <p key={fact.label} className="flex items-center gap-3">
                  <span className="font-display text-3xl leading-none font-light tabular-nums" dir="ltr">
                    <CountUp value={fact.value} />
                    {fact.suffix}
                  </span>
                  <span className="max-w-[8.5rem] text-xs leading-snug text-white/70">{fact.label}</span>
                </p>
              ))}
              <section aria-label={accreditations.title} className="flex items-center gap-4">
                {accreditations.badges.map((badge) => (
                  <Image key={badge.alt} src={badge.src} alt={badge.alt} sizes="128px" className="h-11 w-auto" />
                ))}
              </section>
            </div>
            <p className="flex items-center gap-3 text-xs text-white/60 max-lg:hidden">
              <span aria-hidden="true" className="relative h-8 w-px overflow-hidden bg-white/20">
                <span className="cv-cue absolute inset-x-0 top-0 h-1/2 bg-gold" />
              </span>
              {hero.scrollCue}
            </p>
            <div className="flex items-center gap-4 lg:justify-end">
              <p className="text-xs text-white/60">{chrome.followUs}</p>
              <SocialLinks locale={locale} />
            </div>
          </div>
        </div>
      </ScrollProgress>
    </IntroTiming>
  );
}
