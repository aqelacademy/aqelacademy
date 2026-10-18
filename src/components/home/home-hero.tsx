import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/profile/count-up";
import { IntroTiming } from "@/components/profile/intro-timing";
import { order } from "@/components/profile/order";
import { ScrollProgress } from "@/components/profile/scroll-progress";
import { ArrowLink } from "@/components/ui/arrow-link";
import { PillArrow } from "@/components/ui/pill-arrow";
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
 * The home page's opening: a full-bleed photo filling the first screen, the academy's name rising line by line
 * once the opening screen lifts (IntroTiming waits for it and the photo). Scrolling away lets the photo drift slower
 * than the page and the words lift and fade (`--progress` from ScrollProgress). In Arabic the photo is mirrored so
 * the children sit opposite the text. On phones the words sit on the photo, shaded as before, the photo
 * ends in a clean cut, and the two actions and the facts follow below it. Everything falls back to the finished
 * hero without script or with reduced motion.
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
        {/* Large screens: the photo fills the hero behind the words. Phones get it in the flow below (same sizes, so the same file). */}
        <div className="absolute inset-0 -z-10 max-lg:hidden">
          <div className="home-hero-window absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 rtl:-scale-x-100">
              <Image src={hero.image.src} alt={hero.image.alt} fill preload sizes="100vw" className="object-cover object-[58%_center]" />
            </div>
            <div aria-hidden="true" className="absolute inset-0">
              <div className="absolute inset-0 from-ink-dark/90 via-ink-dark/40 to-transparent ltr:bg-gradient-to-r rtl:bg-gradient-to-l" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-dark/90 via-ink-dark/10 via-40% to-transparent" />
            </div>
          </div>
        </div>

        <div className="home-hero-text container-site flex flex-col pb-6 lg:min-h-[calc(100svh-4.1875rem)] lg:pt-20 lg:pb-20">
          <div className="flex max-w-3xl flex-1 flex-col justify-end">
            {/* Phones: the words sit on the photo, shaded as before, and the photo ends in a clean cut above the actions. */}
            <div className="relative isolate -mx-4 flex min-h-[36rem] flex-col justify-end px-4 pt-40 pb-8 sm:min-h-[40rem] lg:contents">
              <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden lg:hidden">
                <div className="absolute inset-0 rtl:-scale-x-100">
                  <Image src={hero.image.src} alt="" loading="eager" fill sizes="100vw" className="object-cover object-[62%_center]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-dark/90 via-ink-dark/50 via-45% to-transparent" />
              </div>
              <p className="cv-intro home-rise flex items-center gap-3 text-xs font-medium text-white/80 sm:text-sm ltr:tracking-wide" style={order(0)}>
                <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
                {hero.eyebrow}
              </p>
              <h1 className="mt-5 font-bold sm:mt-6">
                <span className="block overflow-hidden pb-2">
                  <span className="cv-intro home-line block text-[2.5rem] leading-[1.25] text-balance sm:text-6xl sm:leading-[1.2] xl:text-7xl xl:leading-[1.2]" style={order(1)}>
                    {name}
                  </span>
                </span>{" "}
                <span className="block overflow-hidden pb-1">
                  <span className="cv-intro home-line block text-lg leading-snug font-normal text-white/75 sm:text-2xl" style={order(2)}>
                    {tagline}
                  </span>
                </span>
              </h1>
              <p className="cv-intro home-rise mt-5 max-w-xl leading-relaxed text-white/85 sm:mt-7 sm:text-xl sm:leading-relaxed" style={order(3)}>
                {hero.lead}
              </p>
            </div>
            <div className="cv-intro home-rise mt-8 flex flex-wrap items-center gap-x-8 gap-y-5 sm:mt-10" style={order(4)}>
              <Link
                href={primary.href}
                className="group inline-flex items-center gap-4 rounded-full bg-white py-2 ps-7 pe-2 font-bold text-ink transition-colors duration-300 hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {primary.label}
                <PillArrow className="size-10 bg-ink text-white group-hover:bg-gold group-hover:text-ink" />
              </Link>
              <ArrowLink link={localeLink(locale, hero.secondaryAction)} className="text-white" />
            </div>
          </div>

          <div className="cv-intro home-rise mt-12 grid gap-6 border-t border-white/20 pt-6 lg:mt-14 lg:grid-cols-[auto_1fr_auto] lg:items-center" style={order(5)}>
            <div className="grid grid-cols-2 items-center gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:gap-x-8">
              {facts.map((fact) => (
                <p key={fact.label} className="flex items-center gap-3">
                  <span className="text-3xl leading-none font-bold tabular-nums" dir="ltr">
                    <CountUp value={fact.value} />
                    {fact.suffix}
                  </span>
                  <span className="max-w-[8.5rem] text-xs leading-snug text-white/70">{fact.label}</span>
                </p>
              ))}
              <section aria-label={accreditations.title} className="col-span-2 flex items-center gap-4">
                {accreditations.badges.map((badge) => (
                  <Image key={badge.alt} src={badge.src} alt={badge.alt} sizes="128px" className="h-11 w-auto" />
                ))}
              </section>
            </div>
            <p className="flex items-center gap-3 justify-self-center text-xs text-white/60 max-lg:hidden">
              <span aria-hidden="true" className="relative h-8 w-px overflow-hidden bg-white/20">
                <span className="cv-cue absolute inset-x-0 top-0 h-1/2 bg-gold" />
              </span>
              {hero.scrollCue}
            </p>
            <div className="flex items-center gap-4 lg:justify-end">
              <p className="text-xs text-white/60 max-sm:hidden">{chrome.followUs}</p>
              <SocialLinks locale={locale} />
            </div>
          </div>
        </div>
      </ScrollProgress>
    </IntroTiming>
  );
}
